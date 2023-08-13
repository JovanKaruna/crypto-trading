import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Market Page',
  description: 'Market Page with List of Crypto'
}

export default function MarketLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
