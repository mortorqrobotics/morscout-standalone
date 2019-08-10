/* eslint-disable */
import { Component } from 'react'

import matchMediaMock from './matchMediaMock'
import resolveStyles from './resolveStyles'

if (!global.matchMedia) {
  global.matchMedia = matchMediaMock;
}

export { default as animate } from './animate'
export { default as matchMediaMock } from './matchMediaMock'

export default component => {
  // Handle stateless functional components
  const ComposedComponent = (component.render || component.prototype.render) ?
    component :
    class extends Component {
      static propTypes = component.propTypes;
      static defaultProps = component.defaultProps;

      render() {
        return component(this.props)
      }
    }

  class Uranium extends ComposedComponent {
    componentWillUnmount() {
      if (super.componentWillUnmount) super.componentWillUnmount()
      this._unmounted = true
    }
    _protectedForceUpdate = () => !this._unmounted && this.forceUpdate()

    render() {
      return resolveStyles(super.render(), this._protectedForceUpdate)
    }
  }

  /* eslint-disable prefer-template */
  Uranium.displayName =
    'Uranium(' +
    (ComposedComponent.displayName || ComposedComponent.name || 'Component') +
    ')'
  /* eslint-enable prefer-template */

  return Uranium
}
