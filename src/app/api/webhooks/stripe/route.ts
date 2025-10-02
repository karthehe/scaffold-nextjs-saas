/**
 * Stripe webhook handler
 * @author Augustus Rivers <hello@offlabel.design>
 * 
 * Handles Stripe webhook events. The important ones:
 * - checkout.session.completed - User just subscribed
 * - customer.subscription.updated - Subscription changed
 * - customer.subscription.deleted - User canceled
 * 
 * Make sure to set up the webhook in your Stripe dashboard and add
 * the signing secret to your .env file.
 */

import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/stripe/stripe'
import { db } from '@/lib/db'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = verifyWebhookSignature(body, signature)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string

  // Find user by Stripe customer ID
  const subscription = await db.subscription.findUnique({
    where: { stripeCustomerId: customerId },
  })

  if (!subscription) {
    console.error('No subscription found for customer:', customerId)
    return
  }

  // Update subscription with Stripe data
  await db.subscription.update({
    where: { id: subscription.id },
    data: {
      stripeSubscriptionId: subscriptionId,
      status: 'ACTIVE',
      plan: 'PRO', // You'd determine this from the price ID
    },
  })
}

async function handleSubscriptionUpdated(sub: Stripe.Subscription) {
  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  })

  if (!subscription) {
    console.error('No subscription found for:', sub.id)
    return
  }

  await db.subscription.update({
    where: { id: subscription.id },
    data: {
      status: sub.status === 'active' ? 'ACTIVE' : 'INACTIVE',
      stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
      stripePriceId: sub.items.data[0]?.price.id,
    },
  })
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const subscription = await db.subscription.findUnique({
    where: { stripeSubscriptionId: sub.id },
  })

  if (!subscription) {
    console.error('No subscription found for:', sub.id)
    return
  }

  await db.subscription.update({
    where: { id: subscription.id },
    data: {
      status: 'CANCELED',
      plan: 'FREE',
    },
  })
}
