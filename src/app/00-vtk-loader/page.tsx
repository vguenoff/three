'use client'
import {
  Mesh,
  MeshLambertMaterial,
  HemisphereLight,
  DirectionalLight,
  Clock,
} from 'three'
// @ts-ignore
import { VTKLoader } from 'three/addons/loaders/VTKLoader.js'

import useFrame from '@/lib/useFrame'

function Scene3d() {
  const { canvas } = useFrame(({ scene, camera }) => {
    const loader = new VTKLoader()

    const hemiLight = new HemisphereLight(0xffffff, 0x000000, 3)
    scene.add(hemiLight)

    const dirLight = new DirectionalLight(0xffffff, 1.5)
    dirLight.position.set(2, 2, 2)
    scene.add(dirLight)

    let mesh: Mesh

    // ts-ignore
    loader.load('models/Aston_300.vtk', (geometry: any) => {
      geometry.center()
      geometry.computeVertexNormals()

      const material = new MeshLambertMaterial({ color: 0xffffff })
      mesh = new Mesh(geometry, material)
      mesh.scale.multiplyScalar(0.5)
      scene.add(mesh)
    })

    const clock = new Clock()

    return () => {
      if (mesh) {
        mesh.rotation.y = clock.getElapsedTime() * 0.5

        camera.lookAt(mesh.position)
      }
    }
  })

  return <canvas ref={canvas} />
}

export default function Page() {
  return <Scene3d />
}
