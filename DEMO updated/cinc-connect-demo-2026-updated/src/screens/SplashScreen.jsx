import { useEffect } from 'react'
import splashBg from '../images/splash-bg.png'
import './SplashScreen.css'

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <div className="splash-screen">
      <img src={splashBg} alt="" className="splash-bg" />
    </div>
  )
}
