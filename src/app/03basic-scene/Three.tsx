'use client'
import {
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three'
import { useEffect, useRef } from 'react'

function three(canvas: HTMLCanvasElement) {
  // Mesh -> combination of a geometry (the shape) and material (how it looks)
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 'red' })
  const mesh = new Mesh(geometry, material) // red cube

  // Scene
  const scene = new Scene()
  scene.add(mesh)

  /**
   * Camera
   * @param fieldOfView {number} 75
   * @param aspectRatio {number} window.innerWidth/window.innerHeight
   */
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  )
  camera.position.z = 2

  // Renderer
  const renderer = new WebGLRenderer({ antialias: true, canvas })

  let frame: number

  function tick() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    frame = requestAnimationFrame(tick)
  }

  function clear() {
    cancelAnimationFrame(frame)
  }

  return {
    tick,
    clear,
  }
}

export default function Three() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const t = three(canvas.current as HTMLCanvasElement)
    t.tick()

    return () => t.clear()
  }, [])

  return <canvas ref={canvas} />
}
