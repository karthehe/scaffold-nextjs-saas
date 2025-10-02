/**
 * Stripe utility functions
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * Stripe setup and helper functions. The webhook signature verification
 * is critical - don't skip it or anyone can fake webhook events.
 */

import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY - check your .env file')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-10-28.acacia',
  typescript: true,
})

/**
 * Create or retrieve a Stripe customer for a user
 */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string
): Promise<string> {
  const { db } = await import('@/lib/db')
  
  // Check if user already has a Stripe customer ID
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      subscription: {
        select: { stripeCustomerId: true },
      },
    },
  })

  if (user?.subscription?.stripeCustomerId) {
    return user.subscription.stripeCustomerId
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    metadata: {
      userId,
    },
  })

  // Save customer ID to database
  await db.subscription.upsert({
    where: { userId },
    create: {
      userId,
      stripeCustomerId: customer.id,
    },
    update: {
      stripeCustomerId: customer.id,
    },
  })

  return customer.id
}

/**
 * Create a checkout session for subscription
 */
export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    subscription_data: {
      metadata: {
        customerId,
      },
    },
  })
}

/**
 * Create a portal session for subscription management
 */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
) {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

/**
 * Verify webhook signature
 * THIS IS IMPORTANT - don't skip this check
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string
): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET')
  }

  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err}`)
  }
}
