import { getCharacterById } from '@/entities/rick-and-morty/api/get-by-id'
import { getAllCharacter } from '@/entities/rick-and-morty/api/get-collection'
import { ICharacter } from '@/entities/rick-and-morty/ui/rick-and-morty'
import Card from '@/shared/ui/rick-and-morty/card'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export const getStaticPaths = async () => {
  const response = await getAllCharacter()

  const paths = response.map((character: ICharacter) => {
    return {
      params: {
        id: character.id.toString(),
      },
    }
  })
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const response = await getCharacterById(id)

  return { props: { character: response } }
}

export default function Character({ character }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const goBack = () => router.push('/pracric1')
  return (
    <div className='flex flex-col items-center justify-center mt-[15%] bg-[#efefef]'>
      <button onClick={goBack}>Назад</button>
      <Card>
        <img src={character.image} alt={character.name} />
        <h3>{character.name}</h3>
        <p>{character.status}</p>
      </Card>
    </div>
  )
}
