import { useEffect, useRef } from 'react'

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

type RendererSceneAndCamera = {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
}

export default function useFrame(
  callback: (arg0: RendererSceneAndCamera) => (() => void) | void
) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const frame = useRef(0)

  useEffect(() => {
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas.current as HTMLCanvasElement,
    })
    const scene = new Scene()
    const camera = new PerspectiveCamera(
      75, // fieldOfView
      window.innerWidth / window.innerHeight // aspectRatio
    )

    // animate if we have returned callback from the callback
    const animate = callback({ renderer, scene, camera })

    ;(function tick() {
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)

      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()

      animate?.()

      frame.current = requestAnimationFrame(tick)
      console.log(frame.current)
    })()

    return () => cancelAnimationFrame(frame.current)
  }, [])

  return { canvas, frame }
}
