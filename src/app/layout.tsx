import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Three',
  description: 'Three.js Journey',
}

const nav = [
  { href: '/03basic-scene', title: '03. Basic Scene' },
  { href: '/04transform-object', title: '04. Transform Object' },
  { href: '/05animations', title: '05. Animations' },
  { href: '/06cameras', title: '06. Cameras' },
  { href: '/07resize-fullscreen', title: '07. Resize and fullscreen' },
  { href: '/08geometries', title: '08. Geometries' },
  { href: '/09debug-ui', title: '09. Debug UI' },
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
