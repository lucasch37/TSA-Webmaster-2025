"use client";

import {useEffect} from "react";
import {clearCart} from "@/lib/cart";

export function ClearCartOnLoad(): null {
    useEffect(() => {
        clearCart().catch((error) => {
            console.error("Failed to clear cart:", error);
        });
    }, []);

    return null;
}
