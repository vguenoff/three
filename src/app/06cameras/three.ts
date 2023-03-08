import * as THREE from 'three'

// Cursor
const cursor = {
  x: 0,
  y: 0,
}

export default function three(canvas: HTMLCanvasElement) {
  /**
   * Mesh
   * combination of a geometry (the shape) and material (how it looks)
   */
  console.dir(canvas)

  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 'red' })
  const mesh = new THREE.Mesh(geometry, material) // red cube

  /**
   * Scene
   */
  const scene = new THREE.Scene()
  scene.add(mesh)

  /**
   * Camera
   * @param fieldOfView {number} 75
   * @param aspectRatio {number} window.innerWidth/window.innerHeight
   */
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  )
  camera.position.z = 2

  /**
   * Animate
   * @param {number} elapsedTime
   */
  function animate(elapsedTime: number) {
    mesh.rotation.y = elapsedTime
    // mesh.position.x = Math.cos(elapsedTime)
    // mesh.position.y = Math.sin(elapsedTime)

    camera.lookAt(mesh.position)
  }

  /**
   * createScene
   * @param {HTMLCanvasElement} canvas
   */
  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
  const clock = new THREE.Clock()
  // gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })
  // gsap has a built-in requestAnimationFrame, so you don't need to update the animation by yourself, but still, if you want to see the cube moving, you need to keep doing the renders of your scene on each frame.

  // Interactions
  const mouseHandler = (e: MouseEvent) => {
    cursor.x = e.clientX
    cursor.y = e.clientY

    console.log(cursor.x, cursor.y)
  }

  window.addEventListener('mousemove', mouseHandler)

  // Rerender
  let frame: number

  function tick() {
    // console.log('tick 6')
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
