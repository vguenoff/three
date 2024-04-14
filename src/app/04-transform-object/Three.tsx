'use client'
import { BoxGeometry, MeshBasicMaterial, Mesh, Group, AxesHelper } from 'three'
import useFrame from '@/lib/useFrame'

export default function Three() {
  const { canvas } = useFrame(({ scene, camera }) => {
    const group = new Group()
    group.scale.y = 1.5
    // group.rotation.reorder('YXZ')
    // group.rotation.x = 0.15 * Math.PI
    group.rotation.y = -0.05 * Math.PI

    const cube1 = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xff0000 })
    )
    cube1.position.x = -1.5
    group.add(cube1)

    const cube2 = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x00ff00 })
    )
    group.add(cube2)

    const cube3 = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x0000ff })
    )
    cube3.position.x = 1.5
    group.add(cube3)

    scene.add(new AxesHelper(2.5))
    scene.add(group)

    camera.position.z = 3.9
    camera.position.x = 0.9
    camera.lookAt(group.position)
  })

  return <canvas ref={canvas} />
}
