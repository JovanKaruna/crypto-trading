export interface PriceChangesResponseBody {
  code: string
  message: string
  payload: PriceChangesItem[]
}

export interface PriceChangesItem {
  pair: string
  latestPrice: string
  day: string
  week: string
  month: string
  year: string
}

export interface HistoricalDataResponseBody {
  Response: string
  Message: string
  HasWarning: boolean
  Type: number
  RateLimit: {}
  Data: HistoricalDataPayload
}

interface HistoricalDataPayload {
  Aggregated: boolean
  TimeFrom: number
  TimeTo: number
  Data: HistoricalDataTime[]
}

export interface HistoricalDataTime {
  time: number
  high: number
  low: number
  open: number
  volumefrom: number
  volumeto: number
  close: number
  conversionType: string
  conversionSymbol: string
}

export interface Series {
  data: number[][]
}

export interface SupportedCurrenciesResponseBody {
  code: string
  message: string
  payload: Currency[]
}

export interface Currency {
  currencyGroup: string
  color: string
  currencySymbol: string
  name: string
  logo: string
  decimal_point: number
  listingDate: string
  wallets: Wallet[]
}

export interface Wallet {
  currencyGroup: string
  tokenSymbol: string
  decimal_point: number
  tokenType: string
  blockchain: string
  explorer: string
  listingDate: string
  blockchainName: string
  logo: string
}

export interface MarketTableData {
  logo: string
  currencySymbol: string
  name: string
  latestPrice: string
  day: string
  week: string
  month: string
  year: string
}

export interface DropdownOption {
  key: string
  text: string
  value: number | string
}

export enum HistoricalDataType {
  DAILY = 'daily',
  HOUR = 'hour',
  MINUTE = 'minute'
}
