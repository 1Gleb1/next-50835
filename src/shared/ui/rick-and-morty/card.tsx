import { ICard } from '@/entities/rick-and-morty/ui/rick-and-morty'
import React from 'react'

const Card = ({ children }: ICard) => {
  return (
    <div className='flex flex-col px-4 py-2 shadow-xl rounded-sm w-64 hover:shadow-2xl hover:shadow-green-500 hover:cursor-pointer no-underline text-black'>
      {children}
    </div>
  )
}

export default Card
