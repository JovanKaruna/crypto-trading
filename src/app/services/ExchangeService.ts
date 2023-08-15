import axios from '../axios'
import { HistoricalDataType, HistoricalDataResponseBody } from '../../types'

const getHistoricalData = async (
  req: HistoricalDataType
): Promise<HistoricalDataResponseBody> => {
  const response = await axios.get<HistoricalDataResponseBody>(
    'https://pintu-app.vercel.app/v2/exchange/historicalData/' + req
  )
  return response.data
}

const ExchangeService = {
  getHistoricalData
}

export default ExchangeService
