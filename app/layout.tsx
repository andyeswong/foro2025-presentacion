import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Glassmorphic Presentation',
  description: 'Remote controlled presentation with glassmorphic design',
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-mono">{children}</body>
    </html>
  )
}
