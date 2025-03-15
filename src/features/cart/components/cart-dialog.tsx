"use client";

import {Cart, MenuItem} from "@/types";
import {DialogDescription, DialogTitle} from "@radix-ui/react-dialog";
import {ArrowRight, MenuSquare, ShoppingBasket} from "lucide-react";
import {motion} from "motion/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import CartListItem from "./cart-list-item";

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
            <DialogContent className="max-w-[95%] md:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-4xl font-bold text-primary">
                        YOUR CART
                    </DialogTitle>
                    <DialogDescription className="text-primary text-lg font-medium">
                        {cart.items.reduce((sum, item) => sum + item.quantity, 0)} Item
                        {cart.items.reduce((sum, item) => sum + item.quantity, 0) !== 1
                            ? "s"
                            : ""}{" "}
                        in your cart
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full h-full border-t-[1.5px] mt-2">
                    {cart.items.length === 0 ? (
                        <div className="text-center py-12">
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Your cart is empty.
                            </h2>
                            <p className="text-primary mb-8">
                                Add some items to get started!
                            </p>
                            <Link href="/menu">
                                <Button>
                                    <MenuSquare />
                                    Browse Menu
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col max-h-[600px] overflow-auto pr-4 divide-y-[1px]">
                                {cart.items.map((item, index) => (
                                    <CartListItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        getMenuItem={getMenuItem}
                                    />
                                ))}
                            </div>

                            <div className="pt-4 border-t-[1.5px]">
                                <div className="text-primary flex justify-between items-center gap-2">
                                    <span className="text-xl font-semibold">
                                        Subtotal:
                                    </span>
                                    <span className="font-bold text-2xl">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <Link href={"/checkout"}>
                                <Button
                                    className="w-full mt-6 text-base"
                                    disabled={cart.items.length <= 0}
                                >
                                    Checkout
                                    <ArrowRight size={20} />
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
                    className="rounded-full border border-primary hover:bg-primary hover:text-white transition ease-in-out duration-150 text-primary p-3 relative bg-background/40 shadow-md"
                >
                    <ShoppingBasket />
                    {cartCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </div>
                    )}
                </motion.div>
            </DialogTrigger>
        </Dialog>
    );
};

export default CartDialog;
