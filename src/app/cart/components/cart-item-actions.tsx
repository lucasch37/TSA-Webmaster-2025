"use client";

import React from "react";
import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2} from "lucide-react";
import {removeFromCart, updateCartItemQuantity} from "@/lib/cart";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

interface CartItemActionsProps {
    index: number;
    quantity?: number;
}

export default function CartItemActions({
    index,
    quantity,
}: CartItemActionsProps): React.JSX.Element {
    const router = useRouter();

    const handleRemoveItem = async (): Promise<void> => {
        try {
            await removeFromCart(index);
            toast.success("Item removed from cart");
            router.refresh();
        } catch {
            toast.error("Failed to remove item");
        }
    };

    const handleUpdateQuantity = async (newQuantity: number): Promise<void> => {
        if (newQuantity < 1) {
            return;
        }
        try {
            await updateCartItemQuantity(index, newQuantity);
            router.refresh();
        } catch {
            toast.error("Failed to update quantity");
        }
    };

    // If quantity is not provided, render remove button only
    if (!quantity) {
        return (
            <Button variant="ghost" size="icon" onClick={handleRemoveItem}>
                <Trash2 className="text-red-500" />
            </Button>
        );
    }

    // If quantity is provided, render quantity controls
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(quantity - 1)}
            >
                <Minus className="h-4 w-4" />
            </Button>
            <span className="text-primary font-medium">{quantity}</span>
            <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(quantity + 1)}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </>
    );
}
