'use client'
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import useFrame from '@/lib/useFrame'

export default function Three() {
  const { canvas, frame } = useFrame(({ scene, camera }) => {
    // Mesh -> combination of a geometry (the shape) and material (how it looks)
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 'red' })
    )

    scene.add(mesh)
    camera.position.z = 2
  })

  return (
    <>
      <button onClick={() => cancelAnimationFrame(frame.current)}>
        cancelAnimationFrame
      </button>
      <canvas ref={canvas} />
    </>
  )
}
