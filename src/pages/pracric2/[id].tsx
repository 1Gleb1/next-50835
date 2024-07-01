import { getLocationById } from '@/entities/rick-and-morty/api/get-by-id'
import { getAllLocation } from '@/entities/rick-and-morty/api/get-collection'
import { ILocation } from '@/entities/rick-and-morty/ui/rick-and-morty'
import Card from '@/shared/ui/rick-and-morty/card'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

export const getStaticPaths = async () => {
  const response = await getAllLocation()

  const paths = response.map((location: ILocation) => {
    return {
      params: {
        id: location.id.toString(),
      },
    }
  })
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const response = await getLocationById(id)

  return { props: { location: response } }
}

export default function Character({ location }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const goBack = () => router.push('/pracric2')
  return (
    <div className='flex flex-col items-center justify-center mt-[15%] bg-[#efefef]'>
      <button onClick={goBack}>Назад</button>
      <Card>
        <h3>{location.name}</h3>
        <p>{location.type}</p>
      </Card>
    </div>
  )
}
