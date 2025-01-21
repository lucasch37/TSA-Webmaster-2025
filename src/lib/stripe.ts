"use server";

// Stripe payment integration utilities
import Stripe from "stripe";

// Validate Stripe secret key exists
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

// Initialize Stripe client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});

// Create new checkout session
export async function createStripeSession(
    params: Stripe.Checkout.SessionCreateParams,
): Promise<Stripe.Checkout.Session> {
    return stripe.checkout.sessions.create(params);
}

// Retrieve existing checkout session with line items
export async function getStripeSession(
    sessionId: string,
): Promise<Stripe.Checkout.Session> {
    return stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items.data.price.product", "line_items.data"],
    });
}
