"use client";

import {useEffect} from "react";
import {clearCart} from "@/features/cart/actions/cart";

export function ClearCartOnLoad(): null {
    useEffect(() => {
        clearCart().catch((error) => {
            console.error("Failed to clear cart:", error);
        });
    }, []);

    return null;
}
