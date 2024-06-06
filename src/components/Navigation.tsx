'use client'

import { useRouter } from 'next/navigation'

const nav = [
  '/03-basic-scene',
  '/04-transform-object',
  '/05-animations',
  '/06-cameras',
  '/07-resize-fullscreen',
  '/08-geometries',
  '/09-debug-ui',
]

export default function Navigation() {
  const router = useRouter()

  return (
    <select
      className="menu"
      onChange={e => {
        router.push(e.target.value)
      }}
    >
      {nav.map(href => (
        <option key={href}>{href}</option>
      ))}
    </select>
  )
}
