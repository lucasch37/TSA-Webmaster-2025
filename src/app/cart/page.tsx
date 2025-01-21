import React from "react";
import {Metadata} from "next";
import {getCart} from "@/lib/cart";
import {getMenu} from "@/lib/actions/getMenu";
import Image from "next/image";
import Navbar from "@/components/navbar";
import CartItemActions from "./components/cart-item-actions";
import CartCheckoutButton from "./components/cart-checkout-button";
import {MenuItem} from "@/types";

export const metadata: Metadata = {
    title: "Cart | Sprout & About",
    description: "View and manage your cart items",
};

export default async function CartPage(): Promise<React.JSX.Element> {
    // Get initial cart and menu data from server
    const [cart, menuData] = await Promise.all([getCart(), getMenu()]);
    const menu = menuData.data || [];

    // Helper to find menu item by id
    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    // Calculate total
    const total = cart.items.reduce((total, item) => {
        const menuItem = getMenuItem(item.menuItemId);
        if (!menuItem) {
            return total;
        }
        return (
            total + menuItem.price * item.quantity * (1 - menuItem.sale_percentage / 100)
        );
    }, 0);

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-primary mb-8">Your Cart</h1>
                {cart.items.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-xl text-gray-600">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        {cart.items.map((item, index) => {
                            const menuItem = getMenuItem(item.menuItemId);
                            if (!menuItem) {
                                return null;
                            }

                            return (
                                <div
                                    key={index}
                                    className="border-2 border-primary p-6 rounded-lg"
                                >
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
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-primary">
                                                    {menuItem.name}
                                                </h3>
                                                <CartItemActions index={index} />
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
                                            <div className="flex justify-between items-center mt-4">
                                                <div className="flex items-center gap-4">
                                                    <CartItemActions
                                                        index={index}
                                                        quantity={item.quantity}
                                                    />
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

                        <div className="flex justify-between items-center border-t-2 border-primary pt-6 mt-6">
                            <div className="text-2xl font-bold text-primary">
                                Total: ${total.toFixed(2)}
                            </div>
                        </div>
                        <CartCheckoutButton hasItems={cart.items.length > 0} />
                    </div>
                )}
            </div>
        </>
    );
}
