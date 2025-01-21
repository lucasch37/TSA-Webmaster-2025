"use server";

import {CustomerDetails, CartItem} from "@/types";
import {APP_CONFIG} from "@/config";
import {getMenu} from "./getMenu";
import {createStripeSession} from "../stripe";
import {createClient} from "@/lib/supabase/server";

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
): Promise<CheckoutResult> {
    try {
        const supabase = createClient();
        // Get user phone from auth if available
        const {
            data: {user},
        } = await supabase.auth.getUser();
        const userPhone = user?.user_metadata?.phone;

        // Get menu items for price lookup
        const menuData = await getMenu();
        const menuItems = menuData.data || [];

        const session = await createStripeSession({
            payment_method_types: ["card"],
            line_items: cart.items.map((cartItem) => {
                const menuItem = menuItems.find(
                    (item) => item.id === cartItem.menuItemId,
                );
                if (!menuItem) {
                    throw new Error(`Menu item not found for id: ${cartItem.menuItemId}`);
                }

                // Calculate price with sale discount
                const price = menuItem.price * (1 - menuItem.sale_percentage / 100);
                // Build customization text for item description
                const customizationText = `${menuItem.description}${
                    cartItem.addedItems.length
                        ? `\nAdded: ${cartItem.addedItems.join(", ")}`
                        : ""
                }${
                    cartItem.removedItems.length
                        ? `\nRemoved: ${cartItem.removedItems.join(", ")}`
                        : ""
                }`;

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: menuItem.name,
                            description: customizationText,
                            images: [menuItem.image_url],
                        },
                        // Convert price to cents for Stripe
                        unit_amount: Math.round(price * 100),
                    },
                    quantity: cartItem.quantity,
                };
            }),
            mode: "payment",
            success_url: `${APP_CONFIG.api.baseUrl}/checkout/success?session_id=${CHECKOUT_SESSION_ID_PLACEHOLDER}`,
            cancel_url: `${APP_CONFIG.api.baseUrl}/cart`,
            customer_email: customerDetails.email,
            // Store order metadata
            metadata: {
                orderType: "pickup",
                customerName: customerDetails.name,
                customerPhone: userPhone || customerDetails.phone,
                customerEmail: customerDetails.email,
            },
        });

        if (!session.url) {
            throw new Error("No checkout URL returned from Stripe");
        }

        return {success: true, url: session.url};
    } catch {
        return {success: false, error: "Error creating checkout session"};
    }
}
