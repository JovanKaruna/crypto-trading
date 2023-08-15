'use client'

import { formatNumber, formatPrice } from '@/utils/utils'
import React from 'react'

interface OrderBookTableProps {
  bids: number[][]
  asks: number[][]
}

const OrderBookTable: React.FC<OrderBookTableProps> = ({
  bids,
  asks
}): JSX.Element => {
  const getSpreadAmount = (bids: number[][], asks: number[][]): number => {
    const highestBid = Math.max.apply(
      Math,
      bids.map((bid) => bid[0])
    )
    const lowestAsk = Math.min.apply(
      Math,
      asks.map((ask) => ask[0])
    )
    return Math.abs(lowestAsk - highestBid)
  }
  const sortPrices = (prices: number[][], isBid: boolean): number[][] => {
    const sortedByPrice: number[][] = [...prices].sort(
      (currentPrice: number[], nextPrice: number[]): number => {
        if (isBid) {
          return nextPrice[0] - currentPrice[0]
        } else {
          return currentPrice[0] - nextPrice[0]
        }
      }
    )
    return sortedByPrice
  }

  return (
    <div className="grid grid-cols-3 w-full gap-2">
      <div className="font-bold flex justify-center">Price (USD)</div>
      <div className="font-bold flex justify-center">Size</div>
      <div className="font-bold flex justify-center">Total</div>

      {sortPrices(asks, false)
        .reverse()
        .map((ask, index) => (
          <div className="col-span-3 grid grid-cols-3 w-full" key={index}>
            <div className="text-red-error flex justify-center">
              {formatPrice(ask[0])}
            </div>
            <div className="flex justify-center">{formatNumber(ask[1])}</div>
            <div className="flex justify-center">{formatNumber(ask[2])}</div>
          </div>
        ))}
      <div className="col-span-3 flex justify-center">
        Spread : {getSpreadAmount(bids, asks)}
      </div>
      {sortPrices(bids, true).map((bid, index) => (
        <div className="col-span-3 grid grid-cols-3 w-full gap-2" key={index}>
          <div className="text-green flex justify-center">
            {formatPrice(bid[0])}
          </div>
          <div className="flex justify-center">{formatNumber(bid[1])}</div>
          <div className="flex justify-center">{formatNumber(bid[2])}</div>
        </div>
      ))}
    </div>
  )
}

export default OrderBookTable
