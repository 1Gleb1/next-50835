import { FC } from 'react'
import { Versioner } from '@/features/versioner'

export const HomePage: FC = () => {
  return (
    <section className='container flex flex-col min-w-[1440px] mt-[100px] pb-[50px]'>
      <h2 className='text-center mb-base'>EXAMPLE</h2>
      <Versioner />
    </section>
  )
}
