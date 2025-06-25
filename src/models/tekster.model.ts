export interface TekstData {
  tekster: Tekster
}

export interface Tekster {
  [key: string]: Tekster | Tekster[] | string | string[]
}
