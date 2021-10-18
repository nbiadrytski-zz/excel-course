// Pure functions
export function capitalize(str) {
  if (typeof str !== 'string') {
    return ''
  }
  // slice -> deletes fist char of str
  return str.charAt(0).toUpperCase() + str.slice(1)
}
