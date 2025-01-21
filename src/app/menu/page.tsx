import Navbar from "@/components/navbar";
import {getMenu} from "@/lib/actions/getMenu";

import {Metadata} from "next";

import React from "react";

import MenuCard from "@/app/menu/components/menu-card";
import MenuScroll from "@/components/menu-scroll";

// Page metadata
export const metadata: Metadata = {
    title: "Menu | Sprout & About",
    description: "TSA Webmaster 2024-2025 Project",
};

const sections = ["appetizer", "side", "entree", "dessert"];
// Menu page component
export default async function MenuPage(): Promise<React.JSX.Element> {
    // Fetch menu items from database
    const menuRes = await getMenu();
    const menu = menuRes.data;
    if (!menu) {
        return <></>;
    }

    return (
        <>
            <Navbar />
            <div className="mt-8 container mx-auto">
                {/* Sticky navigation header */}
                <MenuScroll />

                {/* Menu sections */}
                <div className="mt-16">
                    {sections.map((section) => (
                        <div key={section} id={section} className="mb-12">
                            <div className="text-primary font-bold text-4xl">
                                {section.toUpperCase()}S
                            </div>
                            <MenuCard
                                menu={menu.filter(
                                    (item) =>
                                        item.type.toLowerCase() === section &&
                                        !item.hidden,
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
