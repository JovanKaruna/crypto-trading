import axios from '../axios'
import { type PriceChangesResponseBody } from '../../types'

const getPriceChanges = async (): Promise<PriceChangesResponseBody> => {
  const response = await axios.get<PriceChangesResponseBody>(
    'pintu-app.vercel.app/v2/trade/price-changes'
  )
  return response.data
}

const TradeService = {
  getPriceChanges
}

export default TradeService
