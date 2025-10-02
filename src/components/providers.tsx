/**
 * App providers
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * Wraps the app with all necessary providers. This pattern keeps the
 * layout.tsx clean and makes it easy to add new providers later.
 */

'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance per request to avoid sharing
  // state between users. This was a fun bug to track down.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Don't refetch immediately on mount
            staleTime: 60 * 1000, // 1 minute
            // Retry failed requests
            retry: 1,
          },
        },
      })
  )

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
