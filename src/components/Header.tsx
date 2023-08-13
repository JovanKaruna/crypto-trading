'use client'

import React from 'react'
import Image from 'next/image'
import ToggleThemeButton from './buttons/ToggleThemeButton'

const Header: React.FC = (): JSX.Element => {
  return (
    <div className="min-h-10vh flex justify-between items-center">
      <a className="hover:cursor-pointer" href="https://pintu.co.id/">
        <Image src="/animation.gif" alt="Pintu Logo" width={100} height={45} />
      </a>
      <ToggleThemeButton />
    </div>
  )
}

export default Header
