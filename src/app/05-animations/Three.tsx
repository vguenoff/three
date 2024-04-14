'use client'
import { BoxGeometry, MeshBasicMaterial, Mesh, Clock } from 'three'
import useFrame from '@/lib/useFrame'

export default function Three() {
  const { canvas, frame } = useFrame(({ scene, camera }) => {
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 'red' })
    )

    scene.add(mesh)
    camera.position.z = 2

    const clock = new Clock()

    return () => {
      mesh.rotation.y = clock.getElapsedTime()
      mesh.position.x = Math.cos(clock.getElapsedTime())
      mesh.position.y = Math.sin(clock.getElapsedTime())

      camera.lookAt(mesh.position)
    }
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
