/**
 * Root layout
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * This is the main layout wrapper. Pretty standard stuff - providers,
 * fonts, metadata. The QueryClient setup is important for server/client
 * state management.
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SaaS Starter - Offlabel Design',
  description: 'Production-ready Next.js SaaS platform. Built with love (and a lot of coffee) by Augustus Rivers.',
  authors: [{ name: 'Augustus Rivers', url: 'https://offlabel.design' }],
  keywords: ['nextjs', 'saas', 'stripe', 'typescript', 'tailwind'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
