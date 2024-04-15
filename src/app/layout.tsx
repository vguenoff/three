import Link from 'next/link'
import './globals.css'

export const metadata = {
  title: 'Three',
  description: 'Three.js Journey',
}

const nav = [
  { href: '/03-basic-scene', title: '03. Basic Scene' },
  { href: '/04-transform-object', title: '04. Transform Object' },
  { href: '/05-animations', title: '05. Animations' },
  { href: '/06-cameras', title: '06. Cameras' },
  { href: '/06-cameras-old', title: '06. Cameras Old' },
  { href: '/07-resize-fullscreen', title: '07. Resize and fullscreen' },
  { href: '/08-geometries', title: '08. Geometries' },
  { href: '/09-debug-ui', title: '09. Debug UI' },
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
