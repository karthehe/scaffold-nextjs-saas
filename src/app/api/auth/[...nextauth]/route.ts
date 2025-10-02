/**
 * NextAuth API route handler
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * This is the catch-all route for NextAuth. It handles all the OAuth
 * callbacks and session management. Pretty straightforward.
 */

import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth/auth-options'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
