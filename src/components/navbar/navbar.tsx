import {getCart} from "@/lib/cart";
import React from "react";
import NavLinks from "./nav-links";
import {getMenu} from "@/lib/actions/getMenu";

// Main navigation bar component
const Navbar = async (): Promise<React.JSX.Element> => {
    const [cart, menuData] = await Promise.all([getCart(), getMenu()]);
    const menu = menuData.data || [];

    return (
        <div className="inset-x-0 top-0 z-0 h-fit py-6">
            <NavLinks cart={cart} menuData={menu} />
        </div>
    );
};

export default Navbar;
