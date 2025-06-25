export interface Variant {
  navn: string
  aktiv: boolean
  parametre: {
    parameternavn: string
    parametervaerdi: string
  }[]
}
