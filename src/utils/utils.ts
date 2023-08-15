export const formatRupiah = (number: string): string => {
  const remainder = number.length % 3
  let rupiah = number.substring(0, remainder)
  const thousands = number.substring(remainder).match(/\d{3}/g)

  if (thousands != null) {
    const separator = remainder !== 0 ? '.' : ''
    rupiah += separator + thousands.join('.')
    rupiah = 'Rp ' + rupiah
  }
  return rupiah
}

export const formatNumber = (arg: number): string => {
  return new Intl.NumberFormat('en-US').format(arg)
}

export const formatPrice = (arg: number): string => {
  return arg.toLocaleString('en', {
    useGrouping: true,
    minimumFractionDigits: 2
  })
}

export const isMinus = (number: string): boolean => {
  return number.substring(0, 1) === '-'
}

export const roundValue = (value: number, size: number) => {
  return Math.floor(value / size) * size
}

export const groupByPrice = (prices: number[][]): number[][] => {
  const sortedPrice = prices.sort((a: number[], b: number[]) => a[0] - b[0])
  const groupedPrice: number[][] = []
  for (let i = 0; i < sortedPrice.length; i++) {
    if (groupedPrice.length == 0) {
      groupedPrice.push(sortedPrice[i])
    } else {
      if (groupedPrice[groupedPrice.length - 1][0] == sortedPrice[i][0]) {
        groupedPrice[groupedPrice.length - 1] = [
          sortedPrice[i][0],
          groupedPrice[groupedPrice.length - 1][1] + sortedPrice[i][1]
        ]
      } else {
        groupedPrice.push(sortedPrice[i])
      }
    }
  }
  return groupedPrice
}

export const groupBySize = (
  prices: number[][],
  groupSize: number
): number[][] => {
  return groupByPrice(
    prices.map((price) => [roundValue(price[0], groupSize), price[1]])
  )
}

export const addTotalSize = (
  orders: number[][],
  isBid: boolean
): number[][] => {
  let totalSize = 0
  const sortedOrders = orders.sort((a: number[], b: number[]) =>
    isBid ? b[0] - a[0] : a[0] - b[0]
  )

  return sortedOrders.map((order: number[], idx) => {
    const size: number = order[1]
    if (typeof order[2] !== 'undefined') {
      return order
    } else {
      const updatedOrder = [...order]
      const newTotalSize: number = idx === 0 ? size : size + totalSize
      updatedOrder[2] = newTotalSize
      totalSize = newTotalSize
      return updatedOrder
    }
  })
}

export const removePriceLevel = (
  price: number,
  orders: number[][]
): number[][] => orders.filter((order) => order[0] !== price)

export const updateCurrentPrice = (
  updatedPrice: number[],
  prices: number[][]
): number[][] => {
  return prices.map((price) => {
    if (price[0] === updatedPrice[0]) {
      price = updatedPrice
    }
    return price
  })
}

export const priceExists = (
  price: number,
  currentPrices: number[][]
): boolean => currentPrices.some((currentPrice) => currentPrice[0] === price)

export const convertTimestampSecondToMillis = (second: number): number => {
  return parseInt(second.toString().concat('000'))
}
