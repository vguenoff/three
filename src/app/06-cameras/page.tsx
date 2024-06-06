'use client'
import { useEffect, useRef } from 'react'
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

import useFrame from '@/lib/useFrame'

function Scene3d() {
  const { canvas } = useFrame(({ scene, camera }) => {
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1, 5, 5, 5),
      new MeshBasicMaterial({ color: 0xff0000 })
    )

    camera.position.set(0, 0, 2)

    scene.add(mesh)

    // return () => {}
  })

  const cursor = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const c = canvas.current as HTMLCanvasElement

    const mouseHandler = (e: MouseEvent) => {
      cursor.current.x = e.clientX / c.width - 0.5
      cursor.current.y = e.clientY / c.height - 0.5
    }

    window.addEventListener('mousemove', mouseHandler)

    return () => window.removeEventListener('mousemove', mouseHandler)
  }, [])

  return <canvas ref={canvas} />
}

export default function Page() {
  return <Scene3d />
}
