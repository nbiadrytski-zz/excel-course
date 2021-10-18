class Dom {
  constructor(selector) {
    // if string - get dom node by document.querySelector(selector) first
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      // required for chaining, e.g. $('div').html('<h1>test</h1>').clear()
      return this
    }
    // outerHTML returns element with descendants
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  // node is Element (native JS class)
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    // if append method exists in Element base class
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

// static method for $ function which creates element
// and (optionally) adds classes to the element
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
