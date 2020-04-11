export interface ILangListAPIResponse {
  dirs: string[]
  langs: object
}

export interface IDetectAPIResponse {
  code: number
  lang: string
}

export interface ITranslateAPIResponse {
  text: string
}

export interface IAPIResponseError {
  code: number
  message: string
}

export interface ILangListDict {
  [ind: string]: ILangListAPIResponse
}

export interface ILangDetectDict {
  [ind: string]: IDetectAPIResponse
}

export interface ITranslatedDict {
  [ind: string]: ITranslateAPIResponse
}

export type LangListAPIResponse = ILangListAPIResponse | IAPIResponseError
export type DetectAPIResponse = IDetectAPIResponse | IAPIResponseError
export type TranslateAPIResponse = ITranslateAPIResponse | IAPIResponseError
