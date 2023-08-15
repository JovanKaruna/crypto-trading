'use client'

import dynamic from 'next/dynamic'

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false })
import ExchangeService from '@/app/services/ExchangeService'
import { HISTORICAL_TYPE_DROPDOWN_OPTIONS } from '@/constant'
import { HistoricalDataTime, HistoricalDataType, Series } from '@/types'
import React, { useEffect, useState } from 'react'
import { ApexOptions } from 'apexcharts'
import { convertTimestampSecondToMillis } from '@/utils/utils'

const CandleStickChart: React.FC = (): JSX.Element => {
  const [historicalType, setHistoricalType] = useState<HistoricalDataType>(
    HistoricalDataType.MINUTE
  )
  const [rawHistoricalData, setRawHistoricalData] = useState<
    HistoricalDataTime[]
  >([])
  const [series, setSeries] = useState<Series[]>([])

  const fetchHistoricalData = async (
    historicalDataType: HistoricalDataType
  ) => {
    const data = await ExchangeService.getHistoricalData(historicalDataType)
    setRawHistoricalData(data.Data.Data)
  }

  const convertHistoricalDataToSeries = (
    historicalData: HistoricalDataTime[]
  ): Series[] => {
    const timeData: number[][] = historicalData.map((data) => [
      convertTimestampSecondToMillis(data.time),
      data.open,
      data.high,
      data.low,
      data.close
    ])
    return [{ data: timeData }]
  }

  useEffect(() => {
    fetchHistoricalData(historicalType)
  }, [historicalType])

  useEffect(() => {
    setSeries(convertHistoricalDataToSeries(rawHistoricalData))
  }, [rawHistoricalData])

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 500
    },
    title: {
      text: 'CandleStick Chart',
      align: 'center'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  }
  return (
    <div className="container">
      <div className="w-full dark:text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 items-center mb-5">
            <div className="text-lg font-bold">Harga BTC (USD)</div>
            <select
              className="w-36 bg-white border border-grey text-black text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-grey-dark dark:border-grey dark:text-white"
              value={historicalType}
              onChange={(e) =>
                setHistoricalType(e.target.value as HistoricalDataType)
              }
            >
              {HISTORICAL_TYPE_DROPDOWN_OPTIONS.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        {series.length > 0 ? (
          <div className="dark:text-black">
            <ReactApexChart
              options={options}
              series={series}
              type="candlestick"
              height={500}
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="loader w-10 h-10"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandleStickChart
