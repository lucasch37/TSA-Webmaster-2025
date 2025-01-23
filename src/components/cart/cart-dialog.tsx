"use client";

import {Cart, MenuItem} from "@/types";
import {motion} from "motion/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Button} from "../ui/button";
import {Dialog, DialogContent, DialogTrigger} from "../ui/dialog";
import CartItemActions from "./cart-item-actions";
import {ShoppingBasket} from "lucide-react";
import {DialogTitle} from "@radix-ui/react-dialog";
import {usePathname} from "next/navigation";

const CartDialog = ({cart, menu}: {cart: Cart; menu: MenuItem[]}): React.JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);
    // Helper to find menu item by id
    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    // Calculate total
    const total = cart.items.reduce((sum, item) => {
        const menuItem = getMenuItem(item.menuItemId);
        if (!menuItem) {
            return sum;
        }
        const itemPrice = menuItem.price * (1 - menuItem.sale_percentage / 100);
        return sum + itemPrice * item.quantity;
    }, 0);

    const cartCount = cart.items.length;
    const pathname = usePathname();

    React.useEffect(() => {
        const handleRouteChange = (): void => {
            setIsOpen(false);
        };
        handleRouteChange();
    }, [pathname]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-[800px]">
                <DialogTitle className="text-3xl font-bold text-primary">
                    Your Cart
                </DialogTitle>
                <div className="w-full">
                    {cart.items.length === 0 ? (
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-500 mb-8">
                                Add some delicious items to get started!
                            </p>
                            <Link href="/menu">
                                <Button>Browse Menu</Button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col gap-4 max-h-[800px] overflow-auto pr-4">
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
                            </div>

                            <div className="flex justify-between items-center border-t-2 border-primary pt-6 mt-6">
                                <div className="text-2xl font-bold text-primary">
                                    Total: ${total.toFixed(2)}
                                </div>
                            </div>
                            <Link href={"/checkout"}>
                                <Button
                                    className="w-full mt-4"
                                    disabled={cart.items.length <= 0}
                                >
                                    Proceed to Checkout
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogTrigger>
                <motion.div
                    initial={{scale: 0.9}}
                    animate={{scale: 1}}
                    transition={{type: "spring", stiffness: 80}}
                    className="rounded-full border border-primary hover:bg-primary hover:text-white transition ease-in-out duration-150 text-primary p-3 relative"
                >
                    <ShoppingBasket />
                    {cartCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cartCount}
                        </div>
                    )}
                </motion.div>
            </DialogTrigger>
        </Dialog>
    );
};

export default CartDialog;
