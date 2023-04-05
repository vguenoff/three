'use client'
import { useEffect, useRef } from 'react'
import three from './three'

function Page() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const t = three(canvas.current as HTMLCanvasElement)
    t.loop()

    return () => t.clear()
  }, [])

  return <canvas ref={canvas} />
}

export default Page
