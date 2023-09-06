import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AppContext from '@/Context/AppContext'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Tweeter',
  description: 'Tweeter made by CodeNest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <AppContext>
        <html lang="en">
          <body className={` dark:bg-black`}>{children}</body>
        </html>
      </AppContext>
    </ClerkProvider>
  )
}
