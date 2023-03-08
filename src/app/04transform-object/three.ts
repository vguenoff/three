import * as THREE from 'three'

export default function three(canvas: HTMLCanvasElement) {
  // Axis helper
  const axisHelper = new THREE.AxesHelper(2.5)

  // Group of cubes
  const group = new THREE.Group()
  group.scale.y = 1.5
  // group.rotation.reorder('YXZ')
  // group.rotation.x = 0.15 * Math.PI
  group.rotation.y = -0.05 * Math.PI

  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
  )
  cube1.position.x = -1.5
  group.add(cube1)

  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  )
  group.add(cube2)

  const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
  )
  cube3.position.x = 1.5
  group.add(cube3)

  // Scene
  const scene = new THREE.Scene()
  scene.add(axisHelper)
  scene.add(group)

  /**
   * Camera
   * @param fieldOfView {number} 75
   * @param aspectRatio {number} window.innerWidth/window.innerHeight
   */
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight
  )
  camera.position.z = 3.9
  camera.position.x = 0.9
  camera.lookAt(group.position)

  // Transforms
  // mesh.position.set(-1, 0.5, -1)
  // mesh.scale.set(0.5, 1, 0.5)
  // mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0)

  // camera.lookAt(mesh.position)

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

  let frame: number

  function tick() {
    console.log('tick 4')

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
