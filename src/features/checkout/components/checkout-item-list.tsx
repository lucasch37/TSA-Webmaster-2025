"use client";

import {Cart, MenuItem} from "@/types";
import Image from "next/image";
import React from "react";

type Props = {
    cart: Cart;
    menu: MenuItem[];
};

const CheckoutItemList = ({cart, menu}: Props): React.JSX.Element => {
    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    const subtotal = cart.items.reduce((sum, item) => {
        const menuItem = getMenuItem(item.menuItemId);
        if (!menuItem) {
            return sum;
        }
        const itemPrice = menuItem.price * (1 - menuItem.sale_percentage / 100);
        return sum + itemPrice * item.quantity;
    }, 0);

    return (
        <div className="flex flex-col h-fit">
            <div className="flex justify-between items-center text-primary border-b-2 pb-4">
                <div className="font-semibold text-2xl">Order Summary</div>
                <div className="font-bold text-xl">{cart.items.length} Items</div>
            </div>
            <div className="">
                {cart.items.map((item, index) => {
                    const menuItem = getMenuItem(item.menuItemId);
                    if (!menuItem) {
                        return null;
                    }

                    return (
                        <div key={index} className="flex gap-4 pt-4">
                            <div className="w-32 h-32 relative flex-shrink-0 border-[1.5px]">
                                <Image
                                    src={menuItem.image_url}
                                    alt={menuItem.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <h3 className="font-semibold text-lg text-primary">
                                    {menuItem.name} x{item.quantity}
                                </h3>
                                <div>
                                    <p className="text-sm line-clamp-1 text-primary">
                                        {menuItem.description}
                                    </p>
                                    {item.addedItems.length > 0 && (
                                        <p className="text-sm text-primary">
                                            <span className="font-semibold">Added:</span>{" "}
                                            {item.addedItems.join(", ")}
                                        </p>
                                    )}
                                    {item.removedItems.length > 0 && (
                                        <p className="text-sm text-primary">
                                            <span className="font-semibold">
                                                Removed:
                                            </span>{" "}
                                            {item.removedItems.join(", ")}
                                        </p>
                                    )}
                                </div>
                                <p className="text-primary font-bold mt-1 text-xl">
                                    $
                                    {(
                                        menuItem.price *
                                        item.quantity *
                                        (1 - menuItem.sale_percentage / 100)
                                    ).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}

                <div className="pt-4 border-t-2 mt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                        <span className="text-primary text-xl">Subtotal:</span>
                        <span className="text-primary font-bold text-2xl">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutItemList;
