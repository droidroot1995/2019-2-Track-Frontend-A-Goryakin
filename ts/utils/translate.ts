import { API, API_KEY } from './constants'
import * as T from './types'

const langLst: T.ILangListDict = {}
const langDet: T.ILangDetectDict = {}
const transD: T.ITranslatedDict = {}

export function getSupportedLangList(ui: string): T.LangListAPIResponse {
  let langs: T.ILangListAPIResponse = {
    dirs: [],
    langs: {},
  }

  let error: T.IAPIResponseError = {
    code: 401,
    message: '',
  }

  if (langLst[ui]) {
    return langLst[ui]
  }

  let api_url = `${API}/getLangs?key=${API_KEY}&ui=${ui}`

  fetch(api_url, { method: 'POST' })
    .then((response) => response.json())
    .then((data: T.ILangListAPIResponse) => {
      langs = data
      langLst[ui] = data
      console.log(data)
    })
    .catch((err: T.IAPIResponseError) => {
      error = err
      console.log(err)
    })

  return langs.dirs !== [] && langs.langs !== {} ? langs : error
}

export function languageDetect(text: string, hint?: string[]): T.DetectAPIResponse {
  let lang: T.IDetectAPIResponse = {
    code: 0,
    lang: '',
  }

  let error: T.IAPIResponseError = {
    code: 401,
    message: '',
  }

  if (langDet[text]) {
    return langDet[text]
  }

  let api_url = `${API}/getLangs?key=${API_KEY}`

  if (hint) {
    api_url = `${API}/getLangs?key=${API_KEY}&hint=${hint.join(',')}`
  }

  fetch(api_url, { method: 'POST' })
    .then((response) => response.json())
    .then((data: T.IDetectAPIResponse) => {
      lang = data
      langDet[text] = data
      console.log(data)
    })
    .catch((err: T.IAPIResponseError) => {
      error = err
      console.log(err)
    })

  return lang.code !== 0 && lang.lang !== '' ? lang : error
}

export function translate(text: string, lang: string, format?: string): T.TranslateAPIResponse {
  let translated: T.ITranslateAPIResponse = {
    text: '',
  }

  let error: T.IAPIResponseError = {
    code: 401,
    message: '',
  }

  if (transD[text]) {
    return transD[text]
  }

  let api_url = `${API}/translate?key=${API_KEY}&text=${text}&lang=${lang}`

  if (format) {
    api_url = `${API}/translate?key=${API_KEY}&text=${text}&lang=${lang}&format=${format}`
  }

  fetch(api_url, { method: 'POST' })
    .then((response) => response.json())
    .then((data: T.ITranslateAPIResponse) => {
      translated = data
      transD[text] = data
      console.log(data)
    })
    .catch((err: T.IAPIResponseError) => {
      error = err
      console.log(err)
    })

  return translated.text === '' ? translated : error
}
