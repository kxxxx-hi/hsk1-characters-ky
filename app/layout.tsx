import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HSK 1 characters',
  description: 'Learn Chinese characters by clicking and exploring their meanings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

