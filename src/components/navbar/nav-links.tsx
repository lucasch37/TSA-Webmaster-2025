"use client";

import CartDialog from "@/features/cart/components/cart-dialog";
import { Cart, MenuItem } from "@/types";
import { 
    Calendar, 
    Home, 
    MessageCircleQuestion, 
    SquareMenu, 
    Menu, 
    User,
    X
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

const NavLinks = ({
    cart,
    menuData,
}: {
    cart: Cart;
    menuData: MenuItem[];
}): React.JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
        <div className="flex items-center justify-between h-full gap-2 container">
            {/* Logo */}
            <Link href={"/"} className="flex items-center gap-2 w-32">
                <div className="font-bold text-2xl text-center text-primary font-homemade-apple">
                    Sprout &<br />
                    About
                </div>
            </Link>

            {/* Navigation links */}
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 80 }}
                className="border border-primary rounded-full py-2 px-6 hidden md:flex gap-8 text-primary"
            >
                <Link href={"/"} className="flex gap-2 items-center nav-link">
                    <Home size={20} /> HOME
                </Link>
                <Link href={"/menu"} className="flex gap-2 items-center nav-link">
                    <SquareMenu size={20} /> MENU
                </Link>
                <Link href={"/about"} className="flex gap-2 items-center nav-link">
                    <MessageCircleQuestion size={20} /> ABOUT
                </Link>
                <Link href={"/reserve"} className="flex gap-2 items-center nav-link">
                    <Calendar size={20} /> RESERVE
                </Link>
            </motion.div>

            {/* User menu and cart */}
            <div className="flex items-center gap-4">
                <Link href="/account">
                    <motion.button
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 80 }}
                        className="rounded-full border border-primary hover:bg-primary hover:text-white transition ease-in-out duration-150 text-primary p-3"
                    >
                        <User />
                    </motion.button>
                </Link>

                {/* Cart button with count */}
                <CartDialog cart={cart} menu={menuData} />

                {/* Mobile menu */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <motion.button className="text-primary border border-primary rounded-full p-3 hover:bg-primary hover:text-white transition ease-in-out duration-150">
                                <Menu size={24} />
                            </motion.button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[250px] sm:w-[300px] [&>button]:hidden">
                            <div className="relative mb-6">
                                <SheetTitle className="font-homemade-apple text-primary text-left text-xl">
                                    Sprout & About
                                </SheetTitle>
                                <SheetClose className="absolute -top-3 -right-3 rounded-full h-6 w-6 flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white transition-colors">
                                    <X size={14} />
                                </SheetClose>
                            </div>
                            <div className="flex flex-col gap-6 text-primary">
                                <SheetClose asChild>
                                    <Link href={"/"} className="flex gap-3 items-center nav-link text-lg">
                                        <Home size={20} /> HOME
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href={"/menu"} className="flex gap-3 items-center nav-link text-lg">
                                        <SquareMenu size={20} /> MENU
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href={"/about"} className="flex gap-3 items-center nav-link text-lg">
                                        <MessageCircleQuestion size={20} /> ABOUT
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href={"/reserve"} className="flex gap-3 items-center nav-link text-lg">
                                        <Calendar size={20} /> RESERVE
                                    </Link>
                                </SheetClose>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default NavLinks;
