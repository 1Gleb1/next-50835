import { useState, useEffect } from 'react'
import { MOBILE_BREAK_POINT, TABLET_BREAK_POINT } from '../config'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  const isMobile = width < MOBILE_BREAK_POINT
  const isTablet = width < TABLET_BREAK_POINT
  return {
    width,
    height,
    isMobile,
    isTablet,
  }
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
    isMobile: true,
    isTablet: true,
  })

  useEffect(() => {
    setWindowDimensions(getWindowDimensions())
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
