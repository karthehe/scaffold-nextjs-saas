/**
 * NextAuth configuration
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * Authentication setup with multiple providers. The Prisma adapter
 * handles all the session/user DB stuff automatically, which is nice.
 * 
 * Add your OAuth credentials to .env - check .env.example for what you need.
 */

import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import EmailProvider from 'next-auth/providers/email'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },

  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        // Add user ID and role to session
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        // First time JWT created, add user data
        token.role = user.role || 'USER'
      }
      return token
    },

    async redirect({ url, baseUrl }) {
      // Redirect to dashboard after sign in
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (url.startsWith(baseUrl)) return url
      return `${baseUrl}/dashboard`
    },
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === 'development',
}
