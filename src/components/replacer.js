/* eslint-disable no-else-return */

const replaceString = (str, match, fn) => {
  RegExp.escape = (s) => {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  let curCharStart = 0
  let curCharLen = 0

  if (str === '') {
    return str
  } else if (!str || typeof str !== 'string') {
    throw new TypeError('First argument must be a string')
  }

  let re = match

  if (!(re instanceof RegExp)) {
    re = new RegExp(`(${RegExp.escape(re)})`, 'gi')
  }

  const result = str.split(re)

  // Apply fn to all odd elements
  for (let i = 1, { length } = result; i < length; i += 2) {
    curCharLen = result[i].length
    curCharStart += result[i - 1].length
    result[i] = fn(result[i], i, curCharStart)
    curCharStart += curCharLen
  }

  return result
}

export const stringReplacer = (source, match, fn) => {
  let strSource = source
  if (!Array.isArray(source)) strSource = [source]

  return [].concat(
    strSource.map((x) => {
      return typeof x === 'string' ? replaceString(x, match, fn) : x
    }),
  )
}
