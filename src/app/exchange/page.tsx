'use client'

import OrderBook from '@/components/OrderBook'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const Exchange = () => {
  return (
    <main>
      <div className="text-2xl md:text-3xl font-bold text-black dark:text-white sm:pb-0 pb-5">
        Halaman Crypto Trading Exchange
      </div>
      <div className="my-5 dark:text-white">
        <Link href="/market">List harga crypto</Link>
      </div>
      <OrderBook />
    </main>
  )
}

export default Exchange
