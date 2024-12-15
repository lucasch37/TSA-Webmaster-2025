import {MessageCircleQuestion, ShoppingBag, SquareMenu, Truck, User} from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = (): JSX.Element => {
    return (
        <div className="inset-x-0 top-0 z-0 h-fit py-6">
            <div className="flex items-center justify-between h-full gap-2 container">
                <Link href={"/"} className="flex items-center gap-2 w-32">
                    <div className="font-bold text-2xl text-center text-primary font-homemade-apple">
                        Sprout &<br />
                        About
                    </div>
                </Link>
                <div className="border border-primary rounded-full py-3 px-6 flex gap-8 text-primary">
                    <div className="flex gap-2 items-center">
                        <SquareMenu size={20} /> MENU
                    </div>
                    <div className="flex gap-2 items-center">
                        <MessageCircleQuestion size={20} /> ABOUT
                    </div>
                    <div className="flex gap-2 items-center">
                        <Truck size={20} /> ORDER
                    </div>
                    <div className="flex gap-2 items-center">
                        <SquareMenu size={20} /> MENU
                    </div>
                </div>
                <div className="flex items-center gap-4 w-32">
                    <div className="rounded-full border border-primary text-primary p-3">
                        <User />
                    </div>
                    <div className="rounded-full border border-primary text-primary p-3">
                        <ShoppingBag />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
