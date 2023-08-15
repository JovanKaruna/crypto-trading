'use client'

import { GROUP_SIZE_DROPDOWN_OPTIONS } from '@/constant'
import { groupBySize } from '@/utils/utils'
import React, { useEffect, useState } from 'react'
import OrderBookTable from './tables/OrderBookTable'

interface Delta {
  bids: number[][]
  asks: number[][]
}
let currentBids: number[][] = []
let currentAsks: number[][] = []

const OrderBook: React.FC = (): JSX.Element => {
  const [rawBids, setRawBids] = useState<number[][]>([])
  const [rawAsks, setRawAsks] = useState<number[][]>([])
  const [bids, setBids] = useState<number[][]>([])
  const [asks, setAsks] = useState<number[][]>([])
  const [groupSize, setGroupSize] = useState(0.5)

  const removePriceLevel = (price: number, levels: number[][]): number[][] =>
    levels.filter((level) => level[0] !== price)

  const updatePriceLevel = (
    updatedLevel: number[],
    levels: number[][]
  ): number[][] => {
    return levels.map((level) => {
      if (level[0] === updatedLevel[0]) {
        level = updatedLevel
      }
      return level
    })
  }

  const levelExists = (
    deltaLevelPrice: number,
    currentLevels: number[][]
  ): boolean => currentLevels.some((level) => level[0] === deltaLevelPrice)

  const addPriceLevel = (
    deltaLevel: number[],
    levels: number[][]
  ): number[][] => {
    return [...levels, deltaLevel]
  }
  const applyDeltas = (
    currentLevels: number[][],
    orders: number[][]
  ): number[][] => {
    let updatedLevels: number[][] = currentLevels

    orders.forEach((deltaLevel) => {
      const deltaLevelPrice = deltaLevel[0]
      const deltaLevelSize = deltaLevel[1]

      // If new size is zero - delete the price level
      if (deltaLevelSize === 0 && updatedLevels.length > 25) {
        updatedLevels = removePriceLevel(deltaLevelPrice, updatedLevels)
      } else {
        // If the price level exists and the size is not zero, update it
        if (levelExists(deltaLevelPrice, currentLevels)) {
          updatedLevels = updatePriceLevel(deltaLevel, updatedLevels)
        } else {
          // If the price level doesn't exist in the orderbook and there are less than 25 levels, add it
          if (updatedLevels.length < 25) {
            updatedLevels = addPriceLevel(deltaLevel, updatedLevels)
          }
        }
      }
    })

    return updatedLevels
  }
  const addBids = (listOfBids: number[][]): void => {
    const groupedCurrentBids: number[][] = groupBySize(listOfBids, groupSize)
    const updatedBids: number[][] = addTotalSize(
      applyDeltas(groupBySize(rawBids, groupSize), groupedCurrentBids)
    )

    setBids(updatedBids)
  }
  const addAsks = (listOfAsks: number[][]): void => {
    const groupedCurrentAsks: number[][] = groupBySize(listOfAsks, groupSize)
    const updatedAsks: number[][] = addTotalSize(
      applyDeltas(groupBySize(rawAsks, groupSize), groupedCurrentAsks)
    )

    setAsks(updatedAsks)
  }

  const addTotalSize = (orders: number[][]): number[][] => {
    const totalSize: number[] = []

    return orders.map((order: number[], idx) => {
      const size: number = order[1]
      if (typeof order[2] !== 'undefined') {
        return order
      } else {
        const updatedLevel = [...order]
        const totalSum: number = idx === 0 ? size : size + totalSize[idx - 1]
        updatedLevel[2] = totalSum
        totalSize.push(totalSum)
        return updatedLevel
      }
    })
  }

  const addFirstMessage = (payload: any) => {
    const rawBids: number[][] = payload.bids
    const rawAsks: number[][] = payload.asks
    const bids: number[][] = addTotalSize(groupBySize(rawBids, groupSize))
    const asks: number[][] = addTotalSize(groupBySize(rawAsks, groupSize))
    setRawBids(rawBids)
    setRawAsks(rawAsks)
    setBids(bids)
    setAsks(asks)
  }

  const process = (data: Delta) => {
    if (data?.bids?.length > 0) {
      currentBids = [...currentBids, ...data.bids]

      if (currentBids.length > 25) {
        addBids(currentBids)
        currentBids = []
        currentBids.length = 0
      }
    }
    if (data?.asks?.length >= 0) {
      currentAsks = [...currentAsks, ...data.asks]

      if (currentAsks.length > 25) {
        addAsks(currentAsks)
        currentAsks = []
        currentAsks.length = 0
      }
    }
  }

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data)

    if (response.numLevels) {
      addFirstMessage(response)
    } else {
      process(response)
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
  }, [])

  return (
    <div className="container">
      <div className="lg:max-w-sm dark:text-white rounded-3xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-5">
            <div className="text-lg font-bold">Order Book</div>
            <select
              className="w-32 bg-white border border-grey text-black text-sm rounded-lg focus:ring-blue focus:border-blue block w-full p-2.5 dark:bg-grey-dark dark:border-grey dark:text-white"
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
