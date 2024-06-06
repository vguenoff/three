'use client'
import { MeshBasicMaterial, Mesh, BufferGeometry, BufferAttribute } from 'three'

import useFrame from '@/lib/useFrame'

function Scene3d() {
  const { canvas } = useFrame(({ scene }) => {
    const positionsAttribute = new BufferAttribute(
      new Float32Array(100).map(() => (Math.random() - 0.5) * 2),
      3
    )

    const mesh = new Mesh(
      new BufferGeometry().setAttribute('position', positionsAttribute),
      new MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      })
    )

    scene.add(mesh)

    // return () => {}
  })

  return <canvas ref={canvas} />
}

export default function Page() {
  return <Scene3d />
}
