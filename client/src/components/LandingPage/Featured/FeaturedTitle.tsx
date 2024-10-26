import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

function FeaturedTitle() {
  return (
    <div className='pt-[6rem] lg:pt-[8rem]'>
      {/* <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      /> */}
      <div className=' p-2 md:p-1 relative z-10 w-full text-pretty'>
         <h1 className={cn(
        "text-4xl md:text-5xl font-bold text-center md:text-balance dark:text-white max-w-lg mx-auto leading-relaxed"
      )}>Be more productive in work , life and productivity for meeting summary. </h1>
        <p className='mt-5 text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed '>
          Our meeting Summary tool is your key to being more productive,  Whether at work or in your personal life. it helps you stay organized and efficient . ensuring you never forget important details , tasks or deadlines.
        </p>
        
      </div>
    </div>
  )
}

export default FeaturedTitle
