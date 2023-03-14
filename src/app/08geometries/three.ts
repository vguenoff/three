import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function three(canvas: HTMLCanvasElement) {
  /**
   * Controllers
   */
  let frame: number
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
  const clock = new THREE.Clock()

  function resizeHandler() {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    const { width, height } = sizes

    camera.aspect = width / height
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  window.addEventListener('resize', resizeHandler)

  /**
   * Views
   */
  const scene = new THREE.Scene()
  // const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
  // const geometry = new THREE.SphereGeometry(1, 32, 32)
  const geometry = new THREE.BufferGeometry()
  // 450 values = 50 triangles (50 * 3 * 3) * 75
  const count = 450 * 75
  const positionArray = new Float32Array(count).map(
    () => (Math.random() - 0.5) * 4
  )
  const positionsAttribute = new THREE.BufferAttribute(positionArray, 3)
  geometry.setAttribute('position', positionsAttribute)

  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  )
  camera.position.z = 3
  scene.add(camera)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  function animate(elapsedTime: number) {
    controls.update()
  }

  function tick() {
    console.log('tick 8')
    animate(clock.getElapsedTime())
    renderer.render(scene, camera)
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
