"use client";

import {Button} from "@/components/ui/button";
import {removeFromCart, updateCartItemQuantity} from "@/features/cart/actions/cart";
import {Minus, Plus, X} from "lucide-react";
import {useRouter} from "next/navigation";
import React from "react";
import {toast} from "sonner";

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
            <div
                onClick={handleRemoveItem}
                className="cursor-pointer absolute top-0 right-0 "
            >
                <X className="text-primary bg-primary/20 p-1 rounded-full" />
            </div>
        );
    }

    // If quantity is provided, render quantity controls
    return (
        <>
            <Button
                variant="outline"
                size="icon"
                className="w-7 h-7 hover:bg-primary/10 shadow-md"
                onClick={() => handleUpdateQuantity(quantity - 1)}
            >
                <Minus size={12} />
            </Button>
            <span className="text-primary font-medium">{quantity}</span>
            <Button
                variant="outline"
                size="icon"
                className="w-7 h-7 hover:bg-primary/10 shadow-md"
                onClick={() => handleUpdateQuantity(quantity + 1)}
            >
                <Plus size={12} />
            </Button>
        </>
    );
}
