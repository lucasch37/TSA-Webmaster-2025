"use client";

import React from "react";
import {getMenu} from "@/lib/actions/getMenu";
import {MenuItemCard} from "@/components/admin/menu-item-card";
import AdminNavbar from "@/components/admin/admin-navbar";
import {useEffect, useState} from "react";
import {MenuItem} from "@/types";

const sections = ["appetizer", "entree", "side", "dessert"];

const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 60;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
};

export default function Home(): React.JSX.Element {
    const [menu, setMenu] = useState<MenuItem[]>([]);

    useEffect(() => {
        const fetchMenu = async (): Promise<void> => {
            const menuRes = await getMenu();
            if (menuRes.data) {
                setMenu(menuRes.data);
            }
        };
        fetchMenu().then();
    }, []);

    return (
        <>
            <AdminNavbar />
            <div className="mt-8 container mx-auto">
                <div className="sticky top-0 z-10 w-full bg-background">
                    <div className="flex items-center justify-between py-4 border-b-2 border-primary">
                        <div className="text-primary font-bold text-6xl">EDIT MENU</div>
                        <div className="flex gap-8 text-primary">
                            {sections.map((section) => (
                                <button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className="flex gap-2 items-center nav-link font-semibold"
                                >
                                    {section.toUpperCase()}S
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {sections.map((section) => (
                    <div key={section} id={section} className="mt-12">
                        <div className="text-primary font-bold text-4xl mb-6">
                            {section.toUpperCase()}S
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {menu &&
                                menu
                                    .filter((item) => item.type.toLowerCase() === section)
                                    .map((item) => (
                                        <MenuItemCard key={item.id} item={item} />
                                    ))}
                        </div>
                    </div>
                ))}
                {/* <div className="text-primary font-bold text-6xl mt-16">
                    CUSTOMER FEEDBACK
                </div> */}
            </div>
        </>
    );
}
