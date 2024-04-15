import { useEffect, useRef } from 'react'

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'

type RendererSceneAndCamera = {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
}

/**
 *
 * @param callback possibly animate callback
 * @returns
 */
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
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )

    // Custom animate if we have returned callback from the callback
    const animate = callback({ renderer, scene, camera })

    // Loop
    ;(function tick() {
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
      frame.current = requestAnimationFrame(tick)
      animate?.()
      // console.log(frame.current)
    })()

    // Event handlers
    function resizeHandler() {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    function dblclickHandler() {
      const fullscreenElement = document.fullscreenElement
      const cc = canvas.current as HTMLCanvasElement

      if (!fullscreenElement) {
        if (cc.requestFullscreen) cc.requestFullscreen()
      } else {
        if (document.exitFullscreen) document.exitFullscreen()
      }
    }

    window.addEventListener('resize', resizeHandler)
    window.addEventListener('dblclick', dblclickHandler)

    resizeHandler()

    return () => {
      cancelAnimationFrame(frame.current)

      window.removeEventListener('resize', resizeHandler)
      window.removeEventListener('dblclick', dblclickHandler)
    }
  }, [])

  return { canvas, frame }
}
