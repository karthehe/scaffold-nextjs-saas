/**
 * Utility functions
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * The usual suspects - class name merging, error handling, etc.
 * These are the functions I copy to every project anyway.
 */

import { clsx, type ClassValue } from 'clsx'

/**
 * Merge class names intelligently
 * Handles Tailwind conflicts properly (e.g., padding overrides)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/**
 * Format currency for display
 * Yeah, you could use Intl.NumberFormat directly, but this is cleaner
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount / 100) // Stripe amounts are in cents
}

/**
 * Sleep utility for rate limiting and retries
 * More useful than you'd think
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Safe JSON parse that returns null on error instead of throwing
 * Learned this one the hard way
 */
export function safeJsonParse<T>(json: string): T | null {
  try {
    return JSON.parse(json) as T
  } catch {
    return null
  }
}

/**
 * Generate a random ID
 * Not cryptographically secure, but fine for non-security use cases
 */
export function generateId(length: number = 16): string {
  return Math.random().toString(36).substring(2, 2 + length)
}

/**
 * Debounce function
 * For search inputs and other rapid-fire events
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
