import React from 'react'
import Image from 'next/image'

const Footer: React.FC = (): JSX.Element => {
  return (
    <div className="min-h-10vh flex items-center justify-center dark:text-white gap-5">
      Jovan Karuna Cahyadi
      <a
        className="hover:cursor-pointer"
        href="https://www.linkedin.com/in/jovan-karuna-cahyadi/"
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/github.svg" alt="github" width={25} height={25} />
      </a>
      <a
        className="hover:cursor-pointer circle dark:bg-white"
        href="https://github.com/JovanKaruna"
        target="_blank"
        rel="noreferrer"
      >
        <Image src="/linkedin.svg" alt="linkedin" width={30} height={30} />
      </a>
    </div>
  )
}

export default Footer
