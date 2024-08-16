export type addressItem = {
  id?: string | number
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  fullLocation?: string
  address: string
  isDefault: 1 | 0
}
