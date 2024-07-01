import { ICard } from '@/entities/rick-and-morty/ui/rick-and-morty'
import React from 'react'

const Catalog = ({ children }: ICard) => {
  return <div className='grid grid-cols-4 mx-auto gap-4'>{children}</div>
}

export default Catalog
