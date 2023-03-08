import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <div>
        <h2>What will you learn?</h2>
        <div>
          <p>
            The course is complete, yet accessible for beginners. We will start by discovering what{' '}
            <strong>WebGL</strong> is and why using the <strong>Three.js</strong> library is a must. We will then
            discover the various components of Three.js and once the <strong>basics</strong> are acquired, we will move
            on to more <strong>advanced techniques</strong> to display millions of particles, add physics, add
            interactions, create a galaxy, animate a raging sea, etc.
          </p>
          <p>
            At the end of the course, you will have a deep understanding of Three.js and enough experience to{' '}
            <strong>start your own projects</strong>.
          </p>
          <p>
            As a bonus, we will also learn how to use the 3D software <strong>Blender</strong> to be able to create our
            own models.
          </p>
        </div>
      </div>
    </main>
  )
}
