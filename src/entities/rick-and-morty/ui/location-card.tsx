import React from 'react'
import Card from '@/shared/ui/rick-and-morty/card'
import { ILocation } from '@/entities/rick-and-morty/ui/rick-and-morty'
import Link from 'next/link'

const LocationCard = ({ location }: ILocation) => {
  return (
    <Link href={'pracric2/' + location.id}>
      <a>
        <Card>
          <h3>{location.name}</h3>
          <p>{location.dimension}</p>
        </Card>
      </a>
    </Link>
  )
}

export default LocationCard
