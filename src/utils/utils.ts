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
  return prices
    .map((price, idx) => {
      const nextPrice = prices[idx + 1]
      const prevPrice = prices[idx - 1]

      if (nextPrice && price[0] === nextPrice[0]) {
        return [price[0], price[1] + nextPrice[1]]
      } else if (prevPrice && price[0] === prevPrice[0]) {
        return []
      } else {
        return price
      }
    })
    .filter((level) => level.length > 0)
}

export const groupBySize = (
  levels: number[][],
  groupSize: number
): number[][] => {
  return groupByPrice(
    levels.map((level) => [roundValue(level[0], groupSize), level[1]])
  )
}

export const convertTimestampSecondToMillis = (second: number): number => {
  return parseInt(second.toString().concat('000'))
}
