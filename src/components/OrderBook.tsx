'use client'

import { GROUP_SIZE_DROPDOWN_OPTIONS, MAXIMUM_ORDER } from '@/constant'
import {
  addTotalSize,
  groupBySize,
  priceExists,
  removePriceLevel,
  updateCurrentPrice
} from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import OrderBookTable from './tables/OrderBookTable'
import { BidAskResponse } from '@/types'

let currentBids: number[][] = []
let currentAsks: number[][] = []

const OrderBook: React.FC = (): JSX.Element => {
  const [bids, setBids] = useState<number[][]>([])
  const [asks, setAsks] = useState<number[][]>([])
  const [groupSize, setGroupSize] = useState(0.5)

  const updateNewPrice = (
    currentPrices: number[][],
    newPrices: number[][]
  ): number[][] => {
    let updatedPrices: number[][] = currentPrices

    newPrices.forEach((price) => {
      const newPrice = price[0]
      const size = price[1]

      if (size === 0) {
        updatedPrices = removePriceLevel(newPrice, updatedPrices)
      } else {
        if (priceExists(newPrice, updatedPrices)) {
          updatedPrices = updateCurrentPrice(price, updatedPrices)
        } else {
          updatedPrices = [...updatedPrices, price]
        }
      }
    })

    return updatedPrices
  }
  const addBids = (listOfBids: number[][]): void => {
    const updatedRawBids: number[][] = updateNewPrice(currentBids, listOfBids)
    const updatedBids: number[][] = removePricesShown(
      addTotalSize(groupBySize(updatedRawBids, groupSize), true),
      MAXIMUM_ORDER,
      true
    )
    currentBids = updatedRawBids
    setBids(updatedBids)
  }

  const addAsks = (listOfAsks: number[][]): void => {
    const updatedRawAsks: number[][] = updateNewPrice(currentAsks, listOfAsks)
    const updatedAsks: number[][] = removePricesShown(
      addTotalSize(groupBySize(updatedRawAsks, groupSize), true),
      MAXIMUM_ORDER,
      false
    )
    currentAsks = updatedRawAsks
    setAsks(updatedAsks)
  }

  const removePricesShown = (
    prices: number[][],
    maximumOrderShown: number,
    isBid: boolean
  ): number[][] => {
    return prices
      .sort((a: number[], b: number[]) => (isBid ? b[0] - a[0] : a[0] - b[0]))
      .slice(0, maximumOrderShown - 1)
  }

  const addFirstMessage = (payload: any) => {
    const rawBids: number[][] = payload.bids
    const rawAsks: number[][] = payload.asks
    const bids: number[][] = removePricesShown(
      addTotalSize(groupBySize(rawBids, groupSize), true),
      MAXIMUM_ORDER,
      true
    )
    const asks: number[][] = removePricesShown(
      addTotalSize(groupBySize(rawAsks, groupSize), false),
      MAXIMUM_ORDER,
      false
    )
    currentBids = rawBids
    currentAsks = rawAsks
    setBids(bids)
    setAsks(asks)
  }

  const processNextMessage = (data: BidAskResponse) => {
    if (data?.bids?.length > 0) {
      addBids(data.bids)
    }
    if (data?.asks?.length >= 0) {
      addAsks(data.asks)
    }
  }

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data)
    if (response.numLevels) {
      addFirstMessage(response)
    } else {
      processNextMessage(response)
    }
  }

  useEffect(() => {
    const subscribeMessage = {
      event: 'subscribe',
      feed: 'book_ui_1',
      product_ids: ['PI_XBTUSD']
    }
    const ws = new WebSocket('wss://www.cryptofacilities.com/ws/v1')

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribeMessage))
    }
    ws.onmessage = (event) => {
      processMessages(event)
    }
    ws.onclose = () => {
      ws.close()
    }

    return () => {
      ws.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupSize])

  return (
    <div className="container">
      <div className="lg:max-w-sm dark:text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4">
          <div className="grid grid-cols-2 items-center mb-5">
            <div className="text-lg font-bold">Order Book</div>
            <select
              className="w-36 bg-white border border-grey text-black text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-grey-dark dark:border-grey dark:text-white"
              value={groupSize}
              onChange={(e) => setGroupSize(parseFloat(e.target.value))}
            >
              {GROUP_SIZE_DROPDOWN_OPTIONS.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
          {bids.length > 0 && asks.length > 0 ? (
            <OrderBookTable bids={bids} asks={asks} />
          ) : (
            <div className="flex justify-center">
              <div className="loader w-10 h-10"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderBook
