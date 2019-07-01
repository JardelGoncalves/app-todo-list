const prepareData = (data, key, rules = {}) => {
  let result = {}
  Object.keys(rules).map(method => {
    if (rules[method].indexOf(key) > -1) {
      result[`${key}.${method}`] = data[key]
    }
  })
  return result
}

export {
  prepareData
}
