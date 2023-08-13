import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exchange Page',
  description: 'Crypto Exchange Trading page'
}

export default function ExhcangeLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
