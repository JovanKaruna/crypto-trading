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
  image: ImageOption
}

interface ImageOption {
  avatar: boolean
  src: string
}
