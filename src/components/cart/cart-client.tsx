"use client";

import {getCart, removeFromCart, updateCartItemQuantity} from "@/lib/cart";
import {getMenu} from "@/lib/actions/getMenu";
import {Button} from "@/components/ui/button";
import {Minus, Plus, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {MenuItem, Cart} from "@/types";
import Image from "next/image";
import Navbar from "@/components/navbar";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

export default function CartClient(): React.JSX.Element {
    const [cart, setCart] = useState<Cart>({items: []});
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Update cart data from local storage
    const updateCartData = (): void => {
        setCart(getCart());
    };

    // Load menu data and set up cart event listeners
    useEffect(() => {
        const loadData = async (): Promise<void> => {
            const menuData = await getMenu();
            setMenu(menuData.data || []);
            updateCartData();
            setLoading(false);
        };
        loadData();

        window.addEventListener("cartUpdated", updateCartData);
        window.addEventListener("storage", updateCartData);

        return (): void => {
            window.removeEventListener("cartUpdated", updateCartData);
            window.removeEventListener("storage", updateCartData);
        };
    }, []);

    // Remove item from cart
    const handleRemoveItem = (index: number): void => {
        removeFromCart(index);
        toast.success("Item removed from cart");
    };

    // Update item quantity in cart
    const handleUpdateQuantity = (index: number, newQuantity: number): void => {
        if (newQuantity < 1) {
            return;
        }
        updateCartItemQuantity(index, newQuantity);
    };

    // Helper to find menu item by id
    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    // Loading spinner
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-primary mb-8">Your Cart</h1>
                {cart.items.length === 0 ? (
                    // Empty cart message
                    <div className="text-center py-8">
                        <p className="text-xl text-gray-600">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {/* Cart items list */}
                        {cart.items.map((item, index): React.ReactNode => {
                            const menuItem = getMenuItem(item.menuItemId);
                            if (!menuItem) {
                                return null;
                            }

                            return (
                                <div
                                    key={index}
                                    className="border-2 border-primary p-6 rounded-lg"
                                >
                                    {/* Item image and details */}
                                    <div className="flex gap-6">
                                        <div className="w-32 h-32 relative">
                                            <Image
                                                src={menuItem.image_url}
                                                alt={menuItem.name}
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            {/* Item name and remove button */}
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-primary">
                                                    {menuItem.name}
                                                </h3>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        handleRemoveItem(index)
                                                    }
                                                >
                                                    <Trash2 className="text-red-500" />
                                                </Button>
                                            </div>
                                            <p className="text-gray-600 mt-2">
                                                {menuItem.description}
                                            </p>
                                            {item.addedItems.length > 0 && (
                                                <p className="text-sm text-primary mt-2">
                                                    <span className="font-medium">
                                                        Added:
                                                    </span>{" "}
                                                    {item.addedItems.join(", ")}
                                                </p>
                                            )}
                                            {item.removedItems.length > 0 && (
                                                <p className="text-sm text-primary mt-1">
                                                    <span className="font-medium">
                                                        Removed:
                                                    </span>{" "}
                                                    {item.removedItems.join(", ")}
                                                </p>
                                            )}
                                            {/* Quantity controls and price */}
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex items-center gap-4">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                index,
                                                                item.quantity - 1,
                                                            )
                                                        }
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="text-primary font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                index,
                                                                item.quantity + 1,
                                                            )
                                                        }
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="text-xl font-bold text-primary">
                                                    $
                                                    {(
                                                        menuItem.price *
                                                        item.quantity *
                                                        (1 -
                                                            menuItem.sale_percentage /
                                                                100)
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Cart total and checkout button */}
                        <div className="flex justify-between items-center border-t-2 border-primary pt-6 mt-6">
                            <div className="text-2xl font-bold text-primary">
                                Total: $
                                {cart.items
                                    .reduce((total, item): number => {
                                        const menuItem = getMenuItem(item.menuItemId);
                                        if (!menuItem) {
                                            return total;
                                        }
                                        return (
                                            total +
                                            menuItem.price *
                                                item.quantity *
                                                (1 - menuItem.sale_percentage / 100)
                                        );
                                    }, 0)
                                    .toFixed(2)}
                            </div>
                        </div>
                        <Button
                            className="w-full mt-4"
                            onClick={() => router.push("/checkout")}
                            disabled={cart.items.length === 0}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
