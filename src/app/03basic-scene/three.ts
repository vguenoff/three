import * as THREE from 'three'

export default function three(canvas: HTMLCanvasElement) {
  // Mesh -> combination of a geometry (the shape) and material (how it looks)
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ color: 'red' })
  const mesh = new THREE.Mesh(geometry, material) // red cube

  // Scene
  const scene = new THREE.Scene()
  scene.add(mesh)

  /**
   * Camera
   * @param fieldOfView {number} 75
   * @param aspectRatio {number} window.innerWidth/window.innerHeight
   */
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  camera.position.z = 2

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

  let frame: number

  function tick() {
    console.log('tick 3')
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    frame = requestAnimationFrame(tick)
  }

  function clear() {
    cancelAnimationFrame(frame)
  }

  return {
    tick,
    clear,
  }
}
