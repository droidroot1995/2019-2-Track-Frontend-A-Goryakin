'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this
        }),
      g
    )
    function verb(n) {
      return function(v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.')
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t)) op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return { value: op[1], done: false }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
                _ = 0
                continue
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return { value: op[0] ? op[1] : void 0, done: true }
    }
  }
exports.__esModule = true
var constants_1 = require('./constants')
var fetch = require('node-fetch')
var langLst = {}
var langDet = {}
var transD = {}
function getLangList(api_url, ui) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [
        2 /*return*/,
        fetch(api_url, { method: 'POST' })
          .then(function(response) {
            return response.json()
          })
          .then(function(data) {
            langLst[ui] = data
            return data
          })
          ['catch'](function(err) {
            return err
          }),
      ]
    })
  })
}
function langDetect(api_url, text) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [
        2 /*return*/,
        fetch(api_url, { method: 'POST' })
          .then(function(response) {
            return response.json()
          })
          .then(function(data) {
            langDet[text] = data
            return data
          })
          ['catch'](function(err) {
            return err
          }),
      ]
    })
  })
}
function textTranslate(api_url, text, lang) {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      return [
        2 /*return*/,
        fetch(api_url, { method: 'POST' })
          .then(function(response) {
            return response.json()
          })
          .then(function(data) {
            transD[text + '_' + lang] = data
            return data
          })
          ['catch'](function(err) {
            return err
          }),
      ]
    })
  })
}
function getSupportedLangList(ui) {
  return __awaiter(this, void 0, void 0, function() {
    var error, api_url, result
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          error = {
            code: 401,
            message: 'Network problem',
          }
          if (langLst[ui]) {
            return [2 /*return*/, langLst[ui]]
          }
          api_url = constants_1.API + '/getLangs?key=' + constants_1.API_KEY + '&ui=' + ui
          return [4 /*yield*/, getLangList(api_url, ui)]
        case 1:
          result = _a.sent()
          return [2 /*return*/, result]
      }
    })
  })
}
exports.getSupportedLangList = getSupportedLangList
function languageDetect(text, hint) {
  return __awaiter(this, void 0, void 0, function() {
    var api_url, result
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (langDet[text]) {
            return [2 /*return*/, langDet[text]]
          }
          api_url = constants_1.API + '/detect?key=' + constants_1.API_KEY + '&text=' + text
          if (hint) {
            api_url =
              constants_1.API + '/detect?key=' + constants_1.API_KEY + '&text=' + text + '&hint=' + hint.join(',')
          }
          return [4 /*yield*/, langDetect(api_url, text)]
        case 1:
          result = _a.sent()
          return [2 /*return*/, result]
      }
    })
  })
}
exports.languageDetect = languageDetect
function translate(text, lang, format) {
  return __awaiter(this, void 0, void 0, function() {
    var api_url, result
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          if (transD[text + '_' + lang]) {
            return [2 /*return*/, transD[text + '_' + lang]]
          }
          api_url = constants_1.API + '/translate?key=' + constants_1.API_KEY + '&text=' + text + '&lang=' + lang
          if (format) {
            api_url =
              constants_1.API +
              '/translate?key=' +
              constants_1.API_KEY +
              '&text=' +
              text +
              '&lang=' +
              lang +
              '&format=' +
              format
          }
          return [4 /*yield*/, textTranslate(api_url, text, lang)]
        case 1:
          result = _a.sent()
          return [2 /*return*/, result]
      }
    })
  })
}
exports.translate = translate
