import './globals.css'
import type { Metadata } from 'next'
import AppContext from '@/Context/AppContext'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'

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
          <body className={` dark:bg-black`}>
            <Toaster />
            {children}
          </body>
        </html>
      </AppContext>
    </ClerkProvider>
  )
}
