import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default function three(canvas: HTMLCanvasElement) {
  /**
   * Controllers
   */
  let frame: number

  const cursor = {
    x: 0,
    y: 0,
  }

  const mouseHandler = (e: MouseEvent) => {
    cursor.x = e.clientX / canvas.width - 0.5
    cursor.y = e.clientY / canvas.height - 0.5
  }

  window.addEventListener('mousemove', mouseHandler)

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
  // controls.target.y = 2
  controls.enableDamping = true

  function animate(elapsedTime: number) {
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.lookAt(mesh.position)
    // mesh.rotation.y = elapsedTime
    controls.update()
  }

  function tick() {
    console.log('tick 6')

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    animate(clock.getElapsedTime())
    frame = requestAnimationFrame(tick)
  }

  function clear() {
    window.removeEventListener('mousemove', mouseHandler)
    cancelAnimationFrame(frame)
  }

  return {
    tick,
    clear,
  }
}
