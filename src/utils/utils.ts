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

export const isMinus = (number: string): boolean => {
  return number.substring(0, 1) === '-'
}
