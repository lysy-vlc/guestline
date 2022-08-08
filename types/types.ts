export type Filters = {
  rate: number,
  childrenCount: number,
  adultsCount: number
}

export type Filter = {
  [FilterTypes: string]: number
}