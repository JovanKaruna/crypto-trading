import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import ThemeProvider from './contexts/themeContext'
import Layout from '@/components/Layout'

const poppins = Poppins({ subsets: ['latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Crypto Trading',
  description: 'Crypto Trading Exchange Website'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
