'use client'

import React, { useEffect, useState } from 'react'
import MarketService from '../services/MarketService'
import MarketTable from '@/components/tables/MarketTable'
import {
  type PriceChangesItem,
  type Currency,
  type MarketTableData
} from '../../types'

const Market = (): JSX.Element => {
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [isLoadingSupportedCurrencies, setIsLoadingSupportedCurrencies] =
    useState<boolean>(false)
  const [isLoadingPrice, setIsLoadingPrice] = useState<boolean>(false)
  const [prices, setPrices] = useState<PriceChangesItem[]>([])
  const [data, setData] = useState<MarketTableData[]>([])

  const fetchCurrencies = async () => {
    setIsLoadingSupportedCurrencies(true)
    const data = await MarketService.getSupportedCurrencies()
    setCurrencies(data.payload)
    setIsLoadingSupportedCurrencies(false)
  }

  const fetchPrice = async () => {
    setIsLoadingPrice(true)
    const data = await MarketService.getPriceChanges()
    setPrices(data.payload)
    setIsLoadingPrice(false)
  }

  const createMarketTableData = (
    currencies: Currency[],
    prices: PriceChangesItem[]
  ): MarketTableData[] => {
    const data: MarketTableData[] = []
    currencies.forEach((currency) => {
      const price = prices.find(
        (price) =>
          currency.currencySymbol.toUpperCase() ===
          price.pair.split('/')[0].toUpperCase()
      )
      if (price !== undefined) {
        data.push({
          logo: currency.logo,
          currencySymbol: currency.currencySymbol,
          name: currency.name,
          latestPrice: price.latestPrice,
          day: price.day,
          week: price.month,
          month: price.month,
          year: price.year
        })
      }
    })
    return data
  }

  useEffect(() => {
    fetchCurrencies()
    fetchPrice()
  }, [])

  useEffect(() => {
    if (currencies.length > 0 && prices.length > 0) {
      setData(createMarketTableData(currencies, prices))
    }
  }, [currencies, prices])

  return (
    <main>
      <div className="block sm:flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-bold text-black dark:text-white sm:pb-0 pb-5">
          Harga Crypto dalam Rupiah Hari Ini
        </div>
      </div>
      {isLoadingSupportedCurrencies || isLoadingPrice ? (
        <div className="min-h-60vh flex justify-center items-center">
          <div className="loader w-10 h-10"></div>
        </div>
      ) : (
        <MarketTable data={data} />
      )}
    </main>
  )
}

export default Market
