import {$} from '../../core/dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)
    // empty array if no components are defined
    this.components = options.components || []
  }

  // returns root node for excel
  getRoot() {
    const $root = $.create('div', 'excel')

    this.components = this.components.map((Component) => {
      // div is a root element for each component
      // adding class 'excel__[component]' to root element of each component
      // by accessing static className = 'excel__[component-name]'
      const $el = $.create('div', Component.className)

      const component = new Component($el)
      // DEBUG
      // if (component.name) {
      //   window['comp' + component.name] = component
      // }
      $el.html(component.toHtml())
      // add components to root
      $root.append($el)
      return component
    })
    return $root
  }

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach((component) => {
      component.init()
    })
  }
}
