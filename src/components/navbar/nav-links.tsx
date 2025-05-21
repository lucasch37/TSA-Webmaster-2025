"use client";

import CartDialog from "@/features/cart/components/cart-dialog";
import {cn} from "@/lib/utils";
import {Cart, MenuItem} from "@/types";
import {Calendar, Home, InfoIcon, SquareMenu} from "lucide-react"; // Menu and X removed, Sheet related imports also removed
import {motion} from "motion/react";
import Link from "next/link";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {UserIcon} from "../ui/user";

const NavLinks = ({
    cart,
    menuData,
}: {
    cart: Cart;
    menuData: MenuItem[];
}): React.JSX.Element => {
    return (
        <>
            <div className="flex items-center justify-between h-full gap-2 container">
                {/* Logo */}
                <Link href={"/"} className="flex items-center gap-2 w-32">
                    <div className="font-bold text-xl md:text-2xl text-center text-primary font-homemade-apple">
                        Sprout &<br />
                        About
                    </div>
                </Link>

                {/* Navigation links */}
                <motion.div className="border border-primary rounded-full py-2 px-6 hidden md:flex gap-8 text-primary bg-background/40 shadow-md">
                    <Link href={"/"} className="flex gap-2 items-center nav-link">
                        <Home size={20} /> HOME
                    </Link>
                    <NavigationMenu delayDuration={0}>
                        <NavigationMenuList className="flex gap-6">
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Link
                                        href={"/menu"}
                                        className="flex gap-2 items-center nav-link"
                                    >
                                        <SquareMenu size={20} /> MENU
                                    </Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary p-6 no-underline outline-none focus:shadow-md"
                                                    href="/menu"
                                                >
                                                    <div className="mb-2 mt-4 text-3xl font-medium text-white font-homemade-apple">
                                                        Menu
                                                    </div>
                                                    <p className="text-sm leading-tight text-white">
                                                        Explore our selection of
                                                        vegetarian dishes.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem
                                            href="/menu?section=appetizer"
                                            title="Appetizers"
                                            className="hover:bg-primary/10 transition-all"
                                        >
                                            Light, flavorful, and perfect for sharing,
                                            these plant-based starters set the stage for a
                                            delicious meal.
                                        </ListItem>
                                        <ListItem
                                            href="/menu?section=entree"
                                            title="Entrees"
                                            className="hover:bg-primary/10 transition-all"
                                        >
                                            Wholesome, satisfying, and packed with bold
                                            flavors, these vegan mains make every bite
                                            memorable.
                                        </ListItem>
                                        <ListItem
                                            href="/menu?section=dessert"
                                            title="Desserts"
                                            className="hover:bg-primary/10 transition-all"
                                        >
                                            Sweet, indulgent, and completely dairy-free,
                                            these treats prove that plant-based can be
                                            just as decadent.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Link
                                        href={"/about"}
                                        className="flex gap-2 items-center nav-link"
                                    >
                                        <InfoIcon size={20} /> ABOUT
                                    </Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="z-[200]">
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary p-6 no-underline outline-none focus:shadow-md"
                                                    href="/about"
                                                >
                                                    <div className="mb-2 mt-4 text-3xl font-medium text-white font-homemade-apple">
                                                        About
                                                    </div>
                                                    <p className="text-sm leading-tight text-white">
                                                        About our restaurant.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem
                                            href="/about"
                                            title="Our Story"
                                            className="hover:bg-primary/10 transition-all"
                                        >
                                            Learn about our history, mission, and values.
                                        </ListItem>
                                        <ListItem
                                            href="/about?section=farm-table"
                                            title="Farm to Table"
                                            className="hover:bg-primary/10 transition-all"
                                        >
                                            Discover how we source our ingredients,
                                            support local farmers, and transport our
                                            ingredients.
                                        </ListItem>
                                        <ListItem
                                            href="/about?section=preparation"
                                            title="Preparation"
                                            className="hover:bg-primary/10 transition-all"
                                        >
                                            Our process for preparing and cooking our
                                            dishes.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    <Link
                                        href={"/reserve"}
                                        className="flex gap-2 items-center nav-link"
                                    >
                                        <Calendar size={20} /> RESERVE
                                    </Link>
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="z-[200]">
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-primary p-6 no-underline outline-none focus:shadow-md"
                                                    href="/reserve"
                                                >
                                                    <div className="mb-2 mt-4 text-3xl font-medium text-white font-homemade-apple">
                                                        Reserve
                                                    </div>
                                                    <p className="text-sm leading-tight text-white">
                                                        Reserve a spot.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <div className="row-span-3 h-[250px] text-sm p-2">
                                            Reserve a table at our restaurant to enjoy a
                                            delicious meal with friends and family.
                                        </div>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </motion.div>

                {/* User menu and cart */}
                <div className="flex items-center gap-4">
                    <Link href="/account">
                        <button className="rounded-full border border-primary hover:bg-primary hover:text-white transition ease-in-out duration-150 text-primary bg-background/40 shadow-md">
                            <UserIcon />
                        </button>
                    </Link>

                    {/* Cart button with count */}
                    <CartDialog cart={cart} menu={menuData} />
                </div>
            </div>

            {/* Bottom navbar for mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-primary shadow-lg p-2 z-50">
                <div className="flex justify-around items-center text-primary">
                    <Link
                        href="/"
                        className="flex flex-col items-center nav-link text-xs p-1 hover:bg-primary/10 rounded-md"
                    >
                        <Home size={20} />
                        <span className="mt-1">HOME</span>
                    </Link>
                    <Link
                        href="/menu"
                        className="flex flex-col items-center nav-link text-xs p-1 hover:bg-primary/10 rounded-md"
                    >
                        <SquareMenu size={20} />
                        <span className="mt-1">MENU</span>
                    </Link>
                    <Link
                        href="/about"
                        className="flex flex-col items-center nav-link text-xs p-1 hover:bg-primary/10 rounded-md"
                    >
                        <InfoIcon size={20} />
                        <span className="mt-1">ABOUT</span>
                    </Link>
                    <Link
                        href="/reserve"
                        className="flex flex-col items-center nav-link text-xs p-1 hover:bg-primary/10 rounded-md"
                    >
                        <Calendar size={20} />
                        <span className="mt-1">RESERVE</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({className, title, children, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        className,
                    )}
                    {...props}
                >
                    <div className="font-medium leading-none text-lg">{title}</div>
                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default NavLinks;
