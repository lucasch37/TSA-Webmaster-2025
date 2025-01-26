"use client";

import {Cart, MenuItem} from "@/types";
import {DialogTitle} from "@radix-ui/react-dialog";
import {ArrowRight, ShoppingBasket} from "lucide-react";
import {motion} from "motion/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import {Button} from "../ui/button";
import {Dialog, DialogContent, DialogTrigger} from "../ui/dialog";
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
            <DialogContent className="max-w-[800px]">
                <DialogTitle className="text-3xl font-bold text-primary">
                    Your Cart
                </DialogTitle>
                <div className="w-full h-full">
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
                            <div className="flex flex-col gap-4 max-h-[600px] overflow-auto pr-4">
                                {cart.items.map((item, index) => (
                                    <CartListItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        getMenuItem={getMenuItem}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t-2 mt-4">
                                <div className="text-primary flex items-center gap-2">
                                    <span className="text-xl">Subtotal:</span>
                                    <span className="font-bold text-2xl">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <Link href={"/checkout"}>
                                <Button
                                    className="w-full mt-6"
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
