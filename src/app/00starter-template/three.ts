import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const resize = (camera: T.PerspectiveCamera, renderer: T.Renderer) =>
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth, innerHeight)
  })

export default function three(canvas: HTMLCanvasElement) {
  let frame: number

  // Scene
  const scene = new T.Scene()
  const camera = new T.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100)
  const clock = new T.Clock()
  camera.position.z = 3

  // Renderer
  const renderer = new T.WebGLRenderer({ antialias: true, canvas })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(innerWidth, innerHeight)

  // Resize & Controls
  new OrbitControls(camera, renderer.domElement)
  resize(camera, renderer)

  // View
  const cube = new T.Mesh(
    new T.BoxGeometry(1, 1, 1),
    new T.MeshBasicMaterial({ color: 0xff0000 })
  )
  scene.add(cube)

  // Animate
  function animate(elapsedTime: number) {
    cube.rotation.x = elapsedTime
    cube.rotation.y = elapsedTime
  }

  // Loop
  function loop() {
    animate(clock.getElapsedTime())
    renderer.render(scene, camera)
    frame = requestAnimationFrame(loop)

    console.log('loop 9')
  }

  return {
    loop,
    clear: () => cancelAnimationFrame(frame),
  }
}
