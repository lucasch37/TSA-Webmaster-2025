"use client";

import {Cart, MenuItem} from "@/types";
import {Calendar, Home, MessageCircleQuestion, SquareMenu, User} from "lucide-react";
import {motion} from "motion/react";
import Link from "next/link";
import React from "react";
import CartDialog from "../cart/cart-dialog";

const NavLinks = ({
    cart,
    menuData,
}: {
    cart: Cart;
    menuData: MenuItem[];
}): React.JSX.Element => {
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
                initial={{scale: 0.9}}
                animate={{scale: 1}}
                whileHover={{scale: 1.05}}
                transition={{type: "spring", stiffness: 80}}
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
            <div className="flex items-center gap-4 w-32">
                <Link href="/account">
                    <motion.button
                        initial={{scale: 0.9}}
                        animate={{scale: 1}}
                        transition={{type: "spring", stiffness: 80}}
                        className="rounded-full border border-primary hover:bg-primary hover:text-white transition ease-in-out duration-150 text-primary p-3"
                    >
                        <User />
                    </motion.button>
                </Link>

                {/* Cart button with count */}
                <CartDialog cart={cart} menu={menuData} />
            </div>
        </div>
    );
};

export default NavLinks;
