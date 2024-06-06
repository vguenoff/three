import { useEffect, useRef } from 'react'

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type RendererSceneAndCamera = {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
}

/**
 * @param getView The custom hook works by passing a callback
 * witch gets the instances we're setting below of renderer, scene and/or camera
 * and have optional animation callback itself (see animate)
 * @returns { canvas, frame }
 */
export default function useFrame(
  getView: (arg0: RendererSceneAndCamera) => (() => void) | void
) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const frame = useRef(0)

  useEffect(() => {
    const cc = canvas.current as HTMLCanvasElement
    const renderer = new WebGLRenderer({ antialias: true, canvas: cc })
    const scene = new Scene()
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )

    camera.position.z = 2

    const controls = new OrbitControls(camera, cc)
    controls.enableDamping = true

    // Optionally the elements we want to animate will be returned in this callback
    const animate = getView({ renderer, scene, camera })

    // Rerender loop
    ;(function tick() {
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
      frame.current = requestAnimationFrame(tick)
      animate?.()
      controls.update()
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

    // Clearing the animation loop and the event listeners
    return () => {
      cancelAnimationFrame(frame.current)

      window.removeEventListener('resize', resizeHandler)
      window.removeEventListener('dblclick', dblclickHandler)
    }
  }, [])

  return { canvas, frame }
}
