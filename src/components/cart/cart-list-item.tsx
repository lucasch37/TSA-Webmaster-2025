import {CartItem} from "@/types";
import Image from "next/image";
import React from "react";
import CartItemActions from "./cart-item-actions";

type Props = {
    item: CartItem;
    index: number;
    getMenuItem: Function;
};

const CartListItem = ({item, index, getMenuItem}: Props): React.JSX.Element | null => {
    const menuItem = getMenuItem(item.menuItemId);
    if (!menuItem) {
        return null;
    }

    return (
        <div className="py-6">
            <div className="flex gap-6 items-center relative">
                <div className="w-36 h-36 relative border-[1.5px]">
                    <Image
                        src={menuItem.image_url}
                        alt={menuItem.name}
                        fill
                        className="object-contain p-2"
                    />
                </div>
                <div className="flex-1 justify-between flex flex-col h-[125px]">
                    <div className="h-fit">
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-semibold text-primary">
                                {menuItem.name}
                            </h3>
                            <CartItemActions index={index} />
                        </div>
                        <p className="text-gray-600 mt-1 text-sm text-primary line-clamp-1">
                            {menuItem.description}
                        </p>
                        <div className="space-x-2">
                            {item.addedItems.length > 0 && (
                                <span className="text-sm text-primary">
                                    <span className="font-medium">Added:</span>{" "}
                                    {item.addedItems.join(", ")}
                                </span>
                            )}
                            {item.removedItems.length > 0 && (
                                <span className="text-sm text-primary">
                                    <span className="font-medium">Removed:</span>{" "}
                                    {item.removedItems.join(", ")}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-xl font-bold text-primary">
                            $
                            {(
                                menuItem.price *
                                item.quantity *
                                (1 - menuItem.sale_percentage / 100)
                            ).toFixed(2)}
                        </div>
                        <div className="flex items-center gap-3">
                            <CartItemActions index={index} quantity={item.quantity} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartListItem;
