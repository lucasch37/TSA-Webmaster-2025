import {Cart, MenuItem} from "@/types";

const CART_KEY = "sprout_cart";

const dispatchCartUpdate = (): void => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cartUpdated"));
    }
};

export const getCart = (): Cart => {
    if (typeof window === "undefined") {
        return {items: []};
    }
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : {items: []};
};

export const saveCart = (cart: Cart): void => {
    if (typeof window === "undefined") {
        return;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    dispatchCartUpdate();
};

export const addToCart = (
    menuItem: MenuItem,
    quantity: number,
    addedItems: string[],
    removedItems: string[],
): Cart => {
    const cart = getCart();
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

    saveCart(cart);
    return cart;
};

export const removeFromCart = (index: number): Cart => {
    const cart = getCart();
    cart.items.splice(index, 1);
    saveCart(cart);
    return cart;
};

export const updateCartItemQuantity = (index: number, quantity: number): Cart => {
    const cart = getCart();
    if (cart.items[index]) {
        cart.items[index].quantity = quantity;
        saveCart(cart);
    }
    return cart;
};
