import React, { useContext } from 'react'
import Image from 'next/image'
import { ThemeContext } from '../../app/contexts/themeContext'

export const ToggleThemeButton = (): JSX.Element => {
  const themeContext = useContext(ThemeContext)

  const isDark = (): boolean => {
    return themeContext?.theme === 'dark'
  }

  return (
    <button
      className="focus:outline-none text-black-light dark:text-grey hover:bg-grey-light dark:hover:bg-grey-dark circle p-2"
      onClick={() => {
        themeContext?.setTheme(isDark() ? 'light' : 'dark')
      }}
    >
      {isDark() ? (
        <Image src="/light-mode.svg" alt="light mode" width={25} height={25} />
      ) : (
        <Image src="/dark-mode.svg" alt="dark mode" width={25} height={25} />
      )}
    </button>
  )
}

export default ToggleThemeButton
