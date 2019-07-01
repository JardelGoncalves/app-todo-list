export default class Validators {
  constructor (datas = {}, messages = {}) {
    this.errors = {}
    this._run(datas, messages)
  }

  required (variable, key, message) {
    if (variable === undefined || variable === null || variable.trim() === '') {
      this._pushMessageErrorArray(key, message, 'This field is required!')
    }
  }

  email (variable, key, message) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(String(variable).toLowerCase())) {
      this._pushMessageErrorArray(key, message, 'Email invalid!')
    }
  }

  integer (variable, key, message) {
    if (!Number.isInteger(parseInt(variable))) {
      this._pushMessageErrorArray(key, message, 'The value you entered is invalid!')
    }
  }

  float (variable, key, message) {
    const re = /^-?\d*(\.\d+)?$/
    if (variable === undefined || variable === null ||
         variable.trim() === '' || !re.test(variable)) {
      this._pushMessageErrorArray(key, message, 'The value you entered is invalid!')
    }
  }

  number (variable, key, message) {
    if (isNaN(variable)) {
      this._pushMessageErrorArray(key, message, 'The value you entered is invalid!')
    }
  }

  boolean (variable, key, message) {
    if (variable !== false && variable !== true) {
      this._pushMessageErrorArray(key, message, 'Invalid Boolean value. Enter or true or false for this field!')
    }
  }

  eql (variable, key, message) {
    if (typeof variable !== 'object' || variable === null || variable === undefined) {
      throw new Error('value reported to the eql() method is different from an object')
    }
    if (!(variable.possibles.indexOf(variable.value) > -1)) {
      this._pushMessageErrorArray(key, message, 'The value reported does not belong to the values ​​that can be accepted!')
    }
  }

  date (variable, key, message) {
    const re = /^(([0-2]?[0-9]|3[0-1])\/([0]?[1-9]|1[0-2])\/[1-2]\d{3}) (20|21|22|23|[0-1]?\d{1}):([0-5]?\d{1})$/
    if (!re.test(variable)) {
      this._pushMessageErrorArray(key, message, 'format or date is invalid. Usage: dd/MM/yyyy hh:mm')
    }
  }

  escape (string) {
    return string
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  hasError () {
    return Object.keys(this.errors).length > 0
  }

  hasKeyError (key) {
    return Object.keys(this.errors[key]).length > 0
  }

  firstKeyError (key) {
    return this.errors[key][0]
  }

  lastKeyError (key) {
    const len = Object.keys(this.errors[key]).length
    return this.errors[key][len - 1]
  }

  _pushMessageErrorArray (key, message, defaultMessage) {
    const [nameKey] = this._explode('.', key)
    if (!Array.isArray(this.errors[nameKey])) {
      this.errors[nameKey] = []
    }
    this.errors[nameKey].push(message[key] || defaultMessage)
  }

  _getMessageCorrect (messages = {}, key) {
    try {
      return messages[key]
    } catch (error) {
      throw new Error('key not found!')
    }
  }

  _explode (separator = ' ', value) {
    return value.split(separator)
  }

  _run (datas = {}, messages = {}) {
    Object.keys(datas).map(key => {
      const [, method] = this._explode('.', key)
      this._getMessageCorrect(messages, key)
      this[method](datas[key], key, messages)
    })
  }
}
