import axios from '../axios'
import {
  SupportedCurrenciesResponseBody,
  type PriceChangesResponseBody
} from '../../types'

const getPriceChanges = async (): Promise<PriceChangesResponseBody> => {
  const response = await axios.get<PriceChangesResponseBody>(
    '/v2/trade/price-changes'
  )
  return response.data
}

const getSupportedCurrencies =
  async (): Promise<SupportedCurrenciesResponseBody> => {
    const response = await axios.get<SupportedCurrenciesResponseBody>(
      '/v2/wallet/supportedCurrencies'
    )
    return response.data
  }

const MarketService = {
  getPriceChanges,
  getSupportedCurrencies
}

export default MarketService
