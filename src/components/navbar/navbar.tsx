import {getCart} from "@/features/cart/actions/cart";
import React from "react";
import NavLinks from "./nav-links";
import {getMenu} from "@/features/menu/actions/getMenu";

// Main navigation bar component
const Navbar = async (): Promise<React.JSX.Element> => {
    const [cart, menuData] = await Promise.all([getCart(), getMenu()]);
    const menu = menuData.data || [];

    return (
        <div className="inset-x-0 top-0 h-fit py-6 z-[40]">
            <NavLinks cart={cart} menuData={menu} />
        </div>
    );
};

export default Navbar;
