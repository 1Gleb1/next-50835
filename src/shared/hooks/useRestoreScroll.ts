import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useRestoreScroll = () => {
  const router = useRouter()

  // устанавливает восстановление прокрутки вручную
  useEffect(() => {
    if ('scrollRestoration' in history && history.scrollRestoration !== 'manual') {
      history.scrollRestoration = 'manual'
    }
  }, [])

  // обрабатывает и сохраняет положение прокрутки
  useEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => router.events.off('routeChangeStart', handleRouteChange)
  }, [router.events])

  // восстановляет положение прокрутки
  useEffect(() => {
    if ('scrollPosition' in sessionStorage) {
      window.scrollTo(0, Number(sessionStorage.getItem('scrollPosition')))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [])
}
