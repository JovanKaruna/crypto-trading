import Link from 'next/link'
const Exchange = () => {
  return (
    <main>
      <h2 className="dark:text-white">Exchange Page</h2>
      <Link href="/market">List harga crypto</Link>
    </main>
  )
}

export default Exchange
