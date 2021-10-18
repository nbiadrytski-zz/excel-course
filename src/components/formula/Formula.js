import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    // $root is an instance of Dom class
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    });
  }

  toHtml() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    console.log(this.$root) // $el: div.excel__formula
    console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick(event) {
    console.log('Formula: onClick', event)
  }
}
