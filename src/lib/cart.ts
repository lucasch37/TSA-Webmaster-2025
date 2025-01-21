"use server";

import {cookies} from "next/headers";
import {Cart, MenuItem} from "@/types";
import {revalidatePath} from "next/cache";

const CART_COOKIE_NAME = "sprout_cart";

// Get cart from cookies
export async function getCart(): Promise<Cart> {
    const cartCookie = cookies().get(CART_COOKIE_NAME);
    if (!cartCookie) {
        return {items: []};
    }
    try {
        return JSON.parse(cartCookie.value);
    } catch {
        return {items: []};
    }
}

// Save cart to cookies
async function saveCart(cart: Cart): Promise<void> {
    cookies().set(CART_COOKIE_NAME, JSON.stringify(cart), {
        // Cookie expires in 7 days
        maxAge: 7 * 24 * 60 * 60,
        // Only accessible via HTTP(S), not JavaScript
        httpOnly: true,
        // Only sent over HTTPS in production
        secure: process.env.NODE_ENV === "production",
        // Restrict to same-origin
        sameSite: "lax",
        // Path for the cookie
        path: "/",
    });
}

// Add or update item in cart
export async function addToCart(
    menuItem: MenuItem,
    quantity: number,
    addedItems: string[],
    removedItems: string[],
): Promise<Cart> {
    const cart = await getCart();
    const existingItemIndex = cart.items.findIndex(
        (item) =>
            item.menuItemId === menuItem.id &&
            JSON.stringify(item.addedItems.sort()) ===
                JSON.stringify(addedItems.sort()) &&
            JSON.stringify(item.removedItems.sort()) ===
                JSON.stringify(removedItems.sort()),
    );

    if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
    } else {
        cart.items.push({
            menuItemId: menuItem.id,
            quantity,
            addedItems,
            removedItems,
        });
    }

    await saveCart(cart);
    return cart;
}

// Remove item from cart
export async function removeFromCart(index: number): Promise<Cart> {
    const cart = await getCart();
    cart.items.splice(index, 1);
    await saveCart(cart);
    return cart;
}

// Update item quantity in cart
export async function updateCartItemQuantity(
    index: number,
    quantity: number,
): Promise<Cart> {
    const cart = await getCart();
    if (cart.items[index]) {
        cart.items[index].quantity = quantity;
        await saveCart(cart);
    }
    return cart;
}

export async function clearCart(): Promise<void> {
    const cookieStore = cookies();

    // Set an expired cookie to clear it
    cookieStore.delete(CART_COOKIE_NAME);

    // Revalidate cart-related pages
    revalidatePath("/cart");
    revalidatePath("/checkout");
}
