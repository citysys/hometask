// API response interfaces
export interface ApiResponse<T> {
  help: string;
  success: boolean;
  result: T;
}

export interface CityApiResult {
  fields: Array<{ id: string; type: string; info?: Record<string, unknown> }>;
  include_total: boolean;
  limit: number;
  records: CityRecord[];
  records_format: string;
  resource_id: string;
  total: number;
  total_estimation_threshold: null | number;
  total_was_estimated: boolean;
  _links: Record<string, string>;
}

export interface StreetApiResult {
  fields: Array<{ id: string; type: string; info?: Record<string, unknown> }>;
  include_total: boolean;
  limit: number;
  records: StreetRecord[];
  records_format: string;
  resource_id: string;
  total: number;
  total_estimation_threshold: null | number;
  total_was_estimated: boolean;
  _links: Record<string, string>;
}

// Type definitions for city and street records from API
// Comes as hebrew (???) 🤷‍♂️
export interface CityRecord {
  _id: number;
  סמל_ישוב: string;
  שם_ישוב: string;
  שם_ישוב_לועזי: string;
  סמל_נפה: number;
  שם_נפה: string;
  סמל_לשכת_מנא: number;
  לשכה: string;
  סמל_מועצה_איזורית: number;
  שם_מועצה: string | null;
}

export interface StreetRecord {
  _id: number;
  סמל_ישוב: number;
  שם_ישוב: string;
  סמל_רחוב: number;
  שם_רחוב: string;
  rank: number;
}

// Form values interface
export interface FormValues {
  fullName: string;
  idNumber: string;
  birthDate: Date;
  email: string;
  city: string;
  street: string;
  houseNumber: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  termsAgreement: boolean;
}

// API resource IDs from the data.gov.il API.
// Cities: https://data.gov.il/dataset/citiesandsettelments/resource/5c78e9fa-c2e2-4771-93ff-7f400a12f7ba
// Streets: https://data.gov.il/dataset/321/resource/9ad3862c-8391-4b2f-84a4-2d4c68625f4b
export const API_RESOURCES = {
  CITIES: "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba",
  STREETS: "9ad3862c-8391-4b2f-84a4-2d4c68625f4b",
};
