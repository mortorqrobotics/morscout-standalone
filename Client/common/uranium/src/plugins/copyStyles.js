import React from "react";

import makeClassName from "../utils/makeClassName";
import { expandStyle, createCSSDeclarations } from "../utils/expandCSS";
import isWeb, { isWebVoidElement } from "../utils/isWeb";

export const URANIUM_CLASSNAME = "ur";

// This plugin assumes its the first plugin run, and makes the
// style tag the rest of the plugins will use
export default element => {
  const { props } = element;
  const { css, style } = props;

  // If we're on a native platform, copy css to style and be done
  // with it
  if (!isWeb() || isWebVoidElement(element)) {
    let newStyle = Object.keys(css).reduce((styleAccumulator, property) => {
      if (property.match(/@media/)) return styleAccumulator;
      return {
        ...styleAccumulator,
        [property]: css[property]
      };
    }, {});
    // Override css props with style prop
    newStyle = { ...newStyle, ...(style || {}) };
    return React.cloneElement(element, { ...props, style: newStyle });
  }

  // If on web

  // Get animated values so we can pass them to the `style` prop instead of
  // trying to put them in the <style> tag
  const animatedValues = Object.keys(css).reduce((prev, curr) => {
    if (typeof css[curr] !== "object" || !css[curr].__getValue) return prev;
    return { ...prev, [curr]: css[curr] };
  }, {});

  // Copy the css into a stylesheet
  const className = makeClassName(css);

  // Weed out properties that were explicitly set to null
  const cssWithoutNullValues = !style
    ? css
    : Object.keys(css).reduce((accumulator, property) => {
        if (style[property] === null) return accumulator;
        return { ...accumulator, [property]: css[property] };
      }, {});

  const cssDeclarations = createCSSDeclarations(
    expandStyle(cssWithoutNullValues)
  );

  let newChildren = React.createElement(
    "style",
    { key: className },
    `.${URANIUM_CLASSNAME}.${className}{${cssDeclarations}}`
  );

  if (typeof props.children === "function") {
    newChildren = [newChildren, props.children()];
  } else if (!Array.isArray(props.children)) {
    newChildren = [newChildren, props.children];
  } else {
    newChildren = props.children.concat([newChildren]);
  }

  const newProps = {
    ...props,
    className: props.className
      ? [
          ...new Set(
            props.className.split(" ").concat([URANIUM_CLASSNAME, className])
          )
        ].join(" ")
      : `${URANIUM_CLASSNAME} ${className}`,
    style: { ...props.style, ...animatedValues },
    children: newChildren
  };
  return React.cloneElement(element, newProps);
};
