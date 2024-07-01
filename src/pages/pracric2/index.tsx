import { getAllLocation } from '@/entities/rick-and-morty/api/get-collection'
import LocationCard from '@/entities/rick-and-morty/ui/location-card'
import { ILocation } from '@/entities/rick-and-morty/ui/rick-and-morty'
import Catalog from '@/shared/ui/rick-and-morty/catalog'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const response = await getAllLocation()
  return { props: { location: response } }
}

export default function Characters({ location }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className=' max-w-[1200px] w-full mx-auto mb-20'>
      <h1 className='text-4xl font-bold text-center my-12'>Locations</h1>
      <Catalog>
        {location?.map((location: ILocation) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </Catalog>
    </div>
  )
}
