import {capitalize} from './utils';

export class DomListener {
  // корневой элемент $root для каждого компонента, на который вешаются листнеры
  constructor($root, listeners = [], name) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener`)
    }
    this.$root = $root
    this.listeners = listeners
    this.name = name
  }

  initDomListeners() {
    console.log(this.listeners, this.$root)
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      // 'this' will be instance of component class, e.g. Formula
      // 'method' example could be onInput
      // so Formula[onInput] will call onInput method of Formula class
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      // bind(this) привязать насильно контекст, чтобы работал
      // this.$root из класса Formula
      // bind(this) создает новую функцию, которая передается в метод on()
      this[method] = this[method].bind(this)
      // this[method] всегда будет с контекстом this
      this.$root.on(listener, this[method])
    })
  }

  removeDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
