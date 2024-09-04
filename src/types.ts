export interface City {
  _id: number
  שם_ישוב: string
  טבלה: string
  לשכה: string
  סמל_ישוב: number
  סמל_לשכת_מנא: number
  סמל_מועצה_אזורית: number
  סמל_נפה: number
  שם_ישוב_לועזי: string
  שם_מועצה: string
  שם_נפה: string
}

export interface Street {
  _id: number
  street_name: string
  city_name: string
  city_code: number
  official_code: number
  rank: number
  region_code: number
  region_name: string
  street_code: number
  street_name_status: string
}
