/**
 * Landing page
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * Simple landing page with a hero and CTA. You'll want to customize
 * this for your actual product, but it gives you a starting point.
 */

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-5xl w-full">
        <div className="text-center space-y-8">
          <h1 className="text-6xl font-bold tracking-tight">
            Build your SaaS <br />
            <span className="text-primary">ridiculously fast</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Production-ready Next.js scaffold with authentication, billing, 
            and everything else you need. Stop building the same boilerplate 
            and ship your product instead.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">View Dashboard</Button>
            </Link>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            Built with ❤️ by{' '}
            <a 
              href="https://offlabel.design" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Off Label Design
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🔐 Authentication</h3>
            <p className="text-sm text-muted-foreground">
              NextAuth.js with Google, GitHub, and email. Session management
              handled automatically.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">💳 Stripe Billing</h3>
            <p className="text-sm text-muted-foreground">
              Subscription management, webhooks, and customer portal. 
              PCI compliance? Already handled.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🗄️ Database Ready</h3>
            <p className="text-sm text-muted-foreground">
              Prisma ORM with PostgreSQL. Type-safe queries and automatic
              migrations.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
