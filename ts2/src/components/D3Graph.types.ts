export interface IProps {
  filename: string
  filterField: string
  filterValue: any
  width: number
  height: number
}

export interface ICsvObj {
  [key: string]: any
}

export interface IState {
  data: csvList
  filtered: boolean
}

export interface IMargin {
  [key: string]: number
}

export type csvList = ICsvObj[]
