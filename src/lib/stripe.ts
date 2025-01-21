"use server";

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
});

export async function createStripeSession(
    params: Stripe.Checkout.SessionCreateParams,
): Promise<Stripe.Checkout.Session> {
    return stripe.checkout.sessions.create(params);
}

export async function getStripeSession(
    sessionId: string,
): Promise<Stripe.Checkout.Session> {
    return stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items.data.price.product", "line_items.data"],
    });
}
