import { useEffect, useRef, useState } from 'react'

// Animates a money string like "$650.41" (or "$2,368.00") from $0 up to its value.
// Re-runs whenever the value changes, so switching units counts to the new total.
export default function CountUp({ value, duration = 900 }) {
  const match = String(value).match(/^([^\d-]*)(-?[\d,]+(?:\.(\d+))?)(.*)$/)
  const target = match ? parseFloat(match[2].replace(/,/g, '')) : NaN
  const decimals = match?.[3]?.length ?? 0
  const [shown, setShown] = useState(target)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!match || Number.isNaN(target) || target === 0) { setShown(target); return }
    const start = performance.now()
    const tick = now => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setShown(target * eased)
      if (t < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  if (!match || Number.isNaN(target)) return value
  const num = shown.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
  return `${match[1]}${num}${match[4]}`
}
