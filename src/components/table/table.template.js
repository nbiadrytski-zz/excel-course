const CODES = {
  A: 65, // 'A'.charCodeAt() will return 65
  Z: 90
}

function toCell() {
  return `
    <div class="cell" contenteditable></div>
  `
}

function toColumn(column) {
  return `
    <div class="column">${column}</div>
  `
}

function createRow(index, content) {
  return `
    <div class="row">
      <div class="row-info">${index ? index : ''}</div>
      <div class="row-data">${content}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const columnsCount = CODES.Z - CODES.A + 1 // + 1 is needed for Z
  const rows = []

  const columns = new Array(columnsCount)
  /*
      1. Создаем новый массив от кол-ва колонок
      2. Заполняем пустой строкой
      3. Преобразовываем к символу
      4. Добавляем колонки
      5. Соединяем в 1 строку
  */
      .fill('')
      /*
      .map(toChar) is the same as
      .map((el, index) => {
        return String.fromCharCode(CODES.A + index)
      })
      */
      .map(toChar)
      // .map(toColumn) is the same as .map(el => toColumn(el)) same
      .map(toColumn)
      .join('')

  /*
  columns =
  '<div class="column">A</div>
  <div class="column">B</div>
  <div class="column">C</div>
  <div class="column">etc.</div>'
  */
  rows.push(createRow(null, columns))
  for (let i = 0; i < rowsCount; i++) {
    // creating cells in loop is for generation of unique id for each cell
    const cells = new Array(columnsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
