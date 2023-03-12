import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function three(canvas: HTMLCanvasElement) {
  /**
   * Controllers
   */
  let frame: number

  function resizeHandler() {
    const width = window.innerWidth
    const height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  window.addEventListener('resize', resizeHandler)

  window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement

    if (!fullscreenElement) {
      if (canvas.requestFullscreen) {
        canvas.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  })

  /**
   * Views
   */
  const scene = new THREE.Scene()
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  )
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.width / canvas.height,
    0.1,
    100
  )
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
  const clock = new THREE.Clock()

  camera.position.set(0, 0, 2)
  scene.add(mesh)
  scene.add(camera)
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  function animate(elapsedTime: number) {
    controls.update()
  }

  function tick() {
    console.log('tick 7')

    camera.updateProjectionMatrix()
    renderer.render(scene, camera)

    animate(clock.getElapsedTime())
    frame = requestAnimationFrame(tick)
  }

  function clear() {
    cancelAnimationFrame(frame)
  }

  resizeHandler()

  return {
    tick,
    clear,
  }
}
