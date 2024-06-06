'use client'
import { MeshBasicMaterial, Mesh, BoxGeometry } from 'three'
import gsap from 'gsap'
import * as lil from 'lil-gui'

import useFrame from '@/lib/useFrame'

function Scene3d() {
  const { canvas } = useFrame(({ scene }) => {
    const p = { color: 0xff0000 }
    const g = new BoxGeometry(1, 1, 1)
    const m = new MeshBasicMaterial(p)
    const cube = new Mesh(g, m)
    scene.add(cube)

    scene.add(cube)

    // Debug UI
    const gui = new lil.GUI()
    gui.domElement.id = 'gui'
    gui.addColor(p, 'color').onChange(() => m.color.set(p.color))
    gui.add(cube.position, 'y').min(-3).max(3).step(0.01).name('elevation')
    gui.add(cube, 'visible')
    gui.add(cube.material, 'wireframe')
    gui.add(
      {
        spin() {
          gsap.to(cube.rotation, { y: cube.rotation.y + Math.PI, duration: 2 })
        },
      },
      'spin'
    )

    // return () => {}
  })

  return <canvas ref={canvas} />
}

export default function Page() {
  return <Scene3d />
}
