/**
 * Database client
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * Prisma client singleton. The global caching is important in dev
 * to avoid creating too many connections (which will crash your DB).
 * Took me way too long to figure this out the first time.
 */

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

/**
 * Gracefully disconnect on process exit
 * Prevents hanging connections and other weirdness
 */
process.on('beforeExit', async () => {
  await db.$disconnect()
})
