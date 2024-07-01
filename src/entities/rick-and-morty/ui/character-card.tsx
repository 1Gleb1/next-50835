import React from 'react'
import Card from '@/shared/ui/rick-and-morty/card'
import { ICharacter } from '@/entities/rick-and-morty/ui/rick-and-morty'
import Link from 'next/link'

const CharacterCard = ({ character }: ICharacter) => {
  return (
    <Link href={'pracric1/' + character.id}>
      <a>
        <Card>
          <img src={character.image} alt={character.name} />
          <h3>{character.name}</h3>
          <p>{character.status}</p>
        </Card>
      </a>
    </Link>
  )
}

export default CharacterCard
