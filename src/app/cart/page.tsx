import React from "react";
import {Metadata} from "next";
import CartClient from "@/components/cart/cart-client";

export const metadata: Metadata = {
    title: "Cart | Sprout & About",
    description: "View and manage your cart items",
};

export default function CartPage(): React.JSX.Element {
    return <CartClient />;
}
