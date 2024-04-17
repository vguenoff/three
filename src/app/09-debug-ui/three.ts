import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as lil from 'lil-gui'
import gsap from 'gsap'

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
  camera.position.z = 3

  // Renderer
  const renderer = new T.WebGLRenderer({ antialias: true, canvas })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(innerWidth, innerHeight)

  // Controls & Resize
  new OrbitControls(camera, renderer.domElement)
  resize(camera, renderer)

  // View
  const p = { color: 0xff0000 }
  const g = new T.BoxGeometry(1, 1, 1)
  const m = new T.MeshBasicMaterial(p)
  const cube = new T.Mesh(g, m)
  scene.add(cube)

  // Debug UI
  const gui = new lil.GUI()
  gui.domElement.id = 'gui'
  gui.addColor(p, 'color').onChange(() => m.color.set(p.color))
  gui.add(cube.position, 'y').min(-3).max(3).step(0.01).name('elevation')
  gui.add(cube, 'visible')
  gui.add(cube.material, 'wireframe')
  gui.add(
    {
      spin() {
        gsap.to(cube.rotation, { y: cube.rotation.y + Math.PI, duration: 2 })
      },
    },
    'spin'
  )

  // Loop
  function loop() {
    renderer.render(scene, camera)
    frame = requestAnimationFrame(loop)

    console.log('loop 9')
  }

  return {
    loop,
    clear: () => cancelAnimationFrame(frame),
  }
}
