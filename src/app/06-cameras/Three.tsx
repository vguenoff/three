'use client'
import { useEffect, useRef } from 'react'
import { BoxGeometry, MeshBasicMaterial, Mesh, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import useFrame from '@/lib/useFrame'

export default function Three() {
  const { canvas, frame } = useFrame(({ scene, camera }) => {
    const cc = canvas.current as HTMLCanvasElement
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1, 5, 5, 5),
      new MeshBasicMaterial({ color: 0xff0000 })
    )

    camera.position.set(0, 0, 2)
    scene.add(mesh)
    scene.add(camera)

    const controls = new OrbitControls(camera, cc)
    controls.enableDamping = true

    return () => {
      controls.update()
    }
  }, new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100))

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

  return (
    <>
      <button onClick={() => cancelAnimationFrame(frame.current)}>
        cancelAnimationFrame
      </button>
      <canvas ref={canvas} />
    </>
  )
}
