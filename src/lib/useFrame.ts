import { useEffect, useRef } from 'react'

import { Scene, PerspectiveCamera, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

type RendererSceneAndCamera = {
  renderer: WebGLRenderer
  scene: Scene
  camera: PerspectiveCamera
}

/**
 * @param view possibly animate callback
 * @returns
 */
export default function useFrame(
  view: (arg0: RendererSceneAndCamera) => (() => void) | void
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

    // Custom animate if we have returned callback from the view
    const animate = view({ renderer, scene, camera })

    // Loop
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

    // Unmount
    return () => {
      cancelAnimationFrame(frame.current)

      window.removeEventListener('resize', resizeHandler)
      window.removeEventListener('dblclick', dblclickHandler)
    }
  }, [])

  return { canvas, frame }
}
