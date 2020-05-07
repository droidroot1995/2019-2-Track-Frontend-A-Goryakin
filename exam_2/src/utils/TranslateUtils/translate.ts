import { API, API_KEY } from './constants'
import * as T from './types'

const fetch = require('node-fetch')

const langLst: T.ICacheDict = {}
const langDet: T.ICacheDict = {}
const transD: T.ICacheDict = {}

async function getLangList(api_url: string, ui: string): Promise<T.LangListAPIResponse> {
  return fetch(api_url, { method: 'POST' })
    .then((response: any) => response.json())
    .then((data: T.ILangListAPIResponse) => {
      langLst[ui] = data
      return data
    })
    .catch((err: T.IAPIResponseError) => {
      return err
    })
}

async function langDetect(api_url: string, text: string): Promise<T.DetectAPIResponse> {
  return fetch(api_url, { method: 'POST' })
    .then((response: any) => response.json())
    .then((data: T.IDetectAPIResponse) => {
      langDet[text] = data
      return data
    })
    .catch((err: T.IAPIResponseError) => {
      return err
    })
}

async function textTranslate(api_url: string, text: string, lang: string): Promise<T.TranslateAPIResponse> {
  return fetch(api_url, { method: 'POST' })
    .then((response: any) => response.json())
    .then((data: T.ITranslateAPIResponse) => {
      transD[`${text}_${lang}`] = data
      return data
    })
    .catch((err: T.IAPIResponseError) => {
      return err
    })
}

export async function getSupportedLangList(ui: string): Promise<T.LangListAPIResponse> {
  let error: T.IAPIResponseError = {
    code: 401,
    message: 'Network problem',
  }

  if (langLst[ui]) {
    return langLst[ui] as T.ILangListAPIResponse
  }

  let api_url = `${API}/getLangs?key=${API_KEY}&ui=${ui}`

  return getLangList(api_url, ui)
}

export async function languageDetect(text: string, hint?: string[]): Promise<T.DetectAPIResponse> {
  if (langDet[text]) {
    return langDet[text] as T.IDetectAPIResponse
  }

  let api_url = `${API}/detect?key=${API_KEY}&text=${text}`

  if (hint) {
    api_url = `${API}/detect?key=${API_KEY}&text=${text}&hint=${hint.join(',')}`
  }

  return langDetect(api_url, text)
}

export async function translate(text: string, lang: string, format?: string): Promise<T.TranslateAPIResponse> {
  if (transD[`${text}_${lang}`]) {
    return transD[`${text}_${lang}`] as T.ITranslateAPIResponse
  }

  let api_url = `${API}/translate?key=${API_KEY}&text=${text}&lang=${lang}`

  if (format) {
    api_url = `${API}/translate?key=${API_KEY}&text=${text}&lang=${lang}&format=${format}`
  }

  return textTranslate(api_url, text, lang)
}
