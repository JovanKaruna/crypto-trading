import React from 'react'
import Footer from './Footer'
import Header from './Header'

const Layout: React.FC<{ children: React.ReactNode }> = ({
  children
}): JSX.Element => {
  return (
    <div className="h-full">
      <div className="mx-auto container px-4 xl:px-32">
        <Header />
        <div className="min-h-80vh w-full">{children}</div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
