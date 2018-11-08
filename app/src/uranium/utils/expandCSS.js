/* eslint-disable */
// Copied from necolas/react-native-web

import decamelize from 'decamelize'

/* eslint-disable max-len, no-param-reassign */
const unitlessNumbers = {
  boxFlex: true,
  boxFlexGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  fontWeight: true,
  lineClamp: true,
  opacity: true,
  order: true,
  orphans: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related
  fillOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true,
}

const normalizeValue = (property, value) => {
  if (!unitlessNumbers[property] && typeof value === 'number') {
    value = `${value}px`
  }
  return value
}

const styleShortHands = {
  borderColor: ['borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor'],
  borderRadius: ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'],
  borderStyle: ['borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'],
  borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'],
  margin: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
  marginHorizontal: ['marginRight', 'marginLeft'],
  marginVertical: ['marginTop', 'marginBottom'],
  overflow: ['overflowX', 'overflowY'],
  padding: ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'],
  paddingHorizontal: ['paddingRight', 'paddingLeft'],
  paddingVertical: ['paddingTop', 'paddingBottom'],
  textDecorationLine: ['textDecoration'],
  writingDirection: ['direction'],
}

/**
 * Alpha-sort properties, apart from shorthands – they must appear before the
 * longhand properties that they expand into. This lets more specific styles
 * override less specific styles, whatever the order in which they were
 * originally declared.
 */
const sortProps = (propsArray) => propsArray.sort((a, b) => {
  const expandedA = styleShortHands[a]
  const expandedB = styleShortHands[b]
  if (expandedA && expandedA.indexOf(b) > -1) {
    return -1
  } else if (expandedB && expandedB.indexOf(a) > -1) {
    return 1
  }
  return a < b ? -1 : a > b ? 1 : 0 // eslint-disable-line no-nested-ternary
})

const removeUraniumSpecificProps = propsArray =>
  propsArray.filter(prop => !prop.match(/@media/))

const evaluateIfAnimatedValue = (key, value) => {
  if (typeof value !== 'object' || !value.__getValue) return value
  return value.__getValue()
}

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
export const expandStyle = style => {
  const propsArray = Object.keys(style)
  const cleanProps = removeUraniumSpecificProps(propsArray)
  const sortedProps = sortProps(cleanProps)

  return sortedProps.reduce((resolvedStyle, key) => {
    const expandedProps = styleShortHands[key]
    // Evaluate animated values to get a good starting value
    // AnimatedValues are picked out and applied to the styles object anyways
    // But a good starting value gets this working with SSR
    const evaluatedAnimatedValue = evaluateIfAnimatedValue(key, style[key])
    const value = normalizeValue(key, evaluatedAnimatedValue)

    // React Native treats `flex:1` like `flex:1 1 auto`
    if (key === 'flex') {
      resolvedStyle.flexGrow = value
      resolvedStyle.flexShrink = 1
      resolvedStyle.flexBasis = 'auto'
    } else if (key === 'textAlignVertical') {
      resolvedStyle.verticalAlign = (value === 'center' ? 'middle' : value)
    } else if (expandedProps) {
      expandedProps.forEach((prop, i) => {
        resolvedStyle[expandedProps[i]] = value
      })
    } else {
      resolvedStyle[key] = value
    }
    return resolvedStyle
  }, {})
}

export const createCSSDeclarations = (style) =>
  Object.keys(style).map((prop) => {
    const property = decamelize(prop, '-')
    const value = style[prop]
    return `${property}:${value};`
  }).sort().join('')
