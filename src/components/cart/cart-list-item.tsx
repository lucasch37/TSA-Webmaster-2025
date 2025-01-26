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
        <div className="border-2 border-primary p-6 relative">
            <div className="flex gap-6">
                <div className="w-32 h-32 relative">
                    <Image
                        src={menuItem.image_url}
                        alt={menuItem.name}
                        fill
                        className="object-contain rounded-md"
                    />
                </div>
                <div className="flex-1">
                    <div className="h-[5rem]">
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-semibold text-primary">
                                {menuItem.name}
                            </h3>
                            <CartItemActions index={index} />
                        </div>
                        <p className="text-gray-600 mt-2 text-sm text-primary line-clamp-2">
                            {menuItem.description}
                        </p>
                        {item.addedItems.length > 0 && (
                            <p className="text-sm text-primary mt-2">
                                <span className="font-medium">Added:</span>{" "}
                                {item.addedItems.join(", ")}
                            </p>
                        )}
                        {item.removedItems.length > 0 && (
                            <p className="text-sm text-primary mt-1">
                                <span className="font-medium">Removed:</span>{" "}
                                {item.removedItems.join(", ")}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-4">
                            <CartItemActions index={index} quantity={item.quantity} />
                        </div>
                        <div className="text-2xl font-bold text-primary">
                            $
                            {(
                                menuItem.price *
                                item.quantity *
                                (1 - menuItem.sale_percentage / 100)
                            ).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartListItem;
