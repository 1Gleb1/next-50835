import { getAllCharacter } from '@/entities/rick-and-morty/api/get-collection'
import CharacterCard from '@/entities/rick-and-morty/ui/character-card'
import { ICharacter } from '@/entities/rick-and-morty/ui/rick-and-morty'
import Catalog from '@/shared/ui/rick-and-morty/catalog'
import { InferGetStaticPropsType } from 'next'

export const getStaticProps = async () => {
  const response = await getAllCharacter()
  return { props: { characters: response } }
}

export default function Characters({ characters }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className=' max-w-[1200px] w-full mx-auto mb-20'>
      <h1 className='text-4xl font-bold text-center my-12'>Characters</h1>
      <Catalog>
        {characters?.map((character: ICharacter) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </Catalog>
    </div>
  )
}
