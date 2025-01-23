"use server";

import {CustomerDetails, CartItem} from "@/types";
import {APP_CONFIG} from "@/config";
import {getMenu} from "./getMenu";
import {createStripeSession} from "../stripe";
import {createClient} from "@/lib/supabase/server";
import Stripe from "stripe";
import {getUser} from "@/lib/actions/getUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "stripe_key", {
    apiVersion: "2024-12-18.acacia",
});

// Placeholder for dynamic session ID in success URL
const CHECKOUT_SESSION_ID_PLACEHOLDER = "{CHECKOUT_SESSION_ID}";

// Checkout result type definition
interface CheckoutResult {
    success: boolean;
    url?: string;
    error?: string;
}

// Create Stripe checkout session with cart items
export async function createCheckoutSession(
    cart: {items: CartItem[]},
    customerDetails: CustomerDetails,
    pointsToRedeem: number = 0,
): Promise<CheckoutResult> {
    try {
        const supabase = createClient();
        // Get user and their points
        const user = await getUser();

        let availablePoints = 0;
        if (user) {
            const {data: userData} = await supabase
                .from("users")
                .select("sustainability_score")
                .eq("id", user.id)
                .single();
            availablePoints = userData?.sustainability_score || 0;
        }

        // Validate points redemption
        if (pointsToRedeem > availablePoints) {
            throw new Error("Not enough points available");
        }

        // Get menu items for price lookup
        const menuData = await getMenu();
        const menuItems = menuData.data || [];

        // Calculate points discount ($1 per 25 points)
        const pointsDiscount = pointsToRedeem / 25;

        // Create a one-time coupon if points are being redeemed
        let couponId: string | undefined;
        if (pointsToRedeem > 0) {
            const coupon = await stripe.coupons.create({
                amount_off: Math.round(pointsDiscount * 100), // Convert to cents
                duration: "once",
                currency: "usd",
            });
            couponId = coupon.id;
        }

        const session = await createStripeSession({
            payment_method_types: ["card"],
            customer_email: customerDetails.email,
            line_items: cart.items.map((cartItem) => {
                const menuItem = menuItems.find(
                    (item) => item.id === cartItem.menuItemId,
                );
                if (!menuItem) {
                    throw new Error(`Menu item not found for id: ${cartItem.menuItemId}`);
                }

                const price = menuItem.price * (1 - menuItem.sale_percentage / 100);
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: menuItem.name,
                            description: `${menuItem.description}${
                                cartItem.addedItems.length
                                    ? `\nAdded: ${cartItem.addedItems.join(", ")}`
                                    : ""
                            }${
                                cartItem.removedItems.length
                                    ? `\nRemoved: ${cartItem.removedItems.join(", ")}`
                                    : ""
                            }`,
                            metadata: {
                                menu_item_id: menuItem.id.toString(),
                                original_price: menuItem.price.toString(),
                                sale_percentage: menuItem.sale_percentage.toString(),
                            },
                        },
                        unit_amount: Math.round(price * 100), // Convert to cents
                    },
                    quantity: cartItem.quantity,
                };
            }),
            discounts: couponId ? [{coupon: couponId}] : [],
            metadata: {
                pointsRedeemed: pointsToRedeem.toString(),
                pointsEarned: cart.items
                    .reduce((sum, item) => sum + item.quantity * 5, 0)
                    .toString(), // 5 points per item, accounting for quantity
                userId: user?.id || "",
                customerName: customerDetails.name,
                customerPhone: customerDetails.phone,
            },
            mode: "payment",
            success_url: `${APP_CONFIG.api.baseUrl}/checkout/success?session_id=${CHECKOUT_SESSION_ID_PLACEHOLDER}`,
            cancel_url: `${APP_CONFIG.api.baseUrl}/cart`,
        });

        // If successful, deduct the points from the user's account
        if (user && pointsToRedeem > 0) {
            await supabase
                .from("users")
                .update({
                    sustainability_score: availablePoints - pointsToRedeem,
                })
                .eq("id", user.id);
        }

        return {
            success: true,
            url: session.url || undefined,
        };
    } catch {
        return {success: false, error: "Error creating checkout session"};
    }
}
