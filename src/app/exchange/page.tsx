'use client'

import OrderBook from '@/components/OrderBook'
import Link from 'next/link'
import CandleStickChart from '@/components/CandleStickChart'
import DescriptionBox from '@/components/DescriptionBox'

const Exchange = (): JSX.Element => {
  return (
    <main>
      <div className="text-2xl md:text-3xl font-bold text-black dark:text-white sm:pb-0 pb-5">
        Halaman Crypto Trading Exchange BTC
      </div>
      <div className="my-5 dark:text-white">
        <Link href="/market">List harga crypto</Link>
      </div>
      <div className="lg:flex gap-4">
        <div className="w-full grow">
          <CandleStickChart />
          <DescriptionBox />
        </div>
        <div className="flex-none mt-10 lg:mt-0">
          <OrderBook />
        </div>
      </div>
    </main>
  )
}

export default Exchange
