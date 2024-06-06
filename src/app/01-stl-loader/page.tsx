'use client'
import {
  Mesh,
  HemisphereLight,
  Clock,
  MeshPhongMaterial,
  DirectionalLight,
} from 'three'
// @ts-ignore
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

import useFrame from '@/lib/useFrame'

function Scene3d() {
  const { canvas } = useFrame(({ scene, camera }) => {
    const loader = new STLLoader()

    scene.add(new HemisphereLight(0x8d7c7c, 0x494966, 3))
    const hemiLight = new HemisphereLight(0xffffff, 0x000000, 3)
    scene.add(hemiLight)

    const dirLight = new DirectionalLight(0xffffff, 1.5)
    dirLight.position.set(2, 2, 2)
    scene.add(dirLight)

    let mesh: Mesh

    loader.load('./models/Aston.stl', (geometry: any) => {
      const material = new MeshPhongMaterial({
        color: 0xff9c7c,
        specular: 0x494949,
        shininess: 200,
      })

      mesh = new Mesh(geometry, material)

      mesh.position.set(0, -0.25, 0)
      mesh.rotation.set(Math.PI / 2, Math.PI, 0)
      mesh.scale.multiplyScalar(0.3)

      mesh.castShadow = true
      mesh.receiveShadow = true

      scene.add(mesh)
    })

    const clock = new Clock()

    return () => {
      if (mesh) {
        mesh.rotation.z = clock.getElapsedTime() * 0.5

        camera.lookAt(mesh.position)
      }
    }
  })

  return <canvas ref={canvas} />
}

export default function Page() {
  return <Scene3d />
}
