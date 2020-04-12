export interface ILangListAPIResponse {
  dirs: string[]
  langs: object
}

export interface IDetectAPIResponse {
  code: number
  lang: string
}

export interface ITranslateAPIResponse {
  code: number
  lang: string
  text: string[]
}

export interface IAPIResponseError {
  code: number
  message: string
}

export interface ICacheDict {
  [ind: string]: ICacheItem
}

export type ICacheItem = ILangListAPIResponse | IDetectAPIResponse | ITranslateAPIResponse

export type LangListAPIResponse = ILangListAPIResponse | IAPIResponseError
export type DetectAPIResponse = IDetectAPIResponse | IAPIResponseError
export type TranslateAPIResponse = ITranslateAPIResponse | IAPIResponseError
