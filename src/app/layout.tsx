import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Three',
  description: 'Three.js Journey',
}

const nav = [
  { href: '/03basic-scene', title: 'Basic Scene' },
  { href: '/04transform-object', title: 'Transform Object' },
  { href: '/05animations', title: 'Animations' },
  { href: '/06cameras', title: 'Cameras' },
  { href: '/07resize-fullscreen', title: 'Resize and fullscreen' },
  { href: '/08geometries', title: 'Geometries' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Link href="/">
          <h1>Three.js</h1>
        </Link>
        <ul>
          {nav.map(({ href, title }) => (
            <li key={href}>
              <Link {...{ href }}>{title}</Link>
            </li>
          ))}
        </ul>
        {children}
      </body>
    </html>
  )
}
