'use client'
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three'

import useFrame from '@/lib/useFrame'

export default function Three() {
  const { canvas } = useFrame(({ scene }) => {
    // Mesh -> combination of a geometry (the shape) and material (how it looks)
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 'red' })
    )

    scene.add(mesh)
  })

  return <canvas ref={canvas} />
}
