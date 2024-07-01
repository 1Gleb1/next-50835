import { HomePage } from '@/views/home-view'
import { NextPageWithLayout } from '@/shared/@types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/pracric1')
  }, [])
  return (
    <div>
      <HomePage />
    </div>
  )
}

export default Home
