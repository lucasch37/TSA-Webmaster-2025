"use client";

import React, {useEffect, useState} from "react";
import {MenuItem} from "@/types";
import MenuCard from "./menu-card";

const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({behavior: "smooth"});
    }
};

const sections = ["appetizer", "side", "entree", "dessert"];

export default function Menu({menu}: {menu: MenuItem[]}): React.JSX.Element {
    const [activeSection, setActiveSection] = useState<string>("MENU");

    useEffect(() => {
        const handleScroll = (): void => {
            const stickyHeaderHeight = 90; // Adjust if your sticky header height changes
            const scrollPosition = window.scrollY + stickyHeaderHeight;

            let currentSection = "MENU"; // Default to "MENU"

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const {top} = element.getBoundingClientRect();
                    const elementTop = top + window.scrollY;

                    if (scrollPosition >= elementTop) {
                        currentSection = section.toUpperCase() + "S";
                    }
                }
            });

            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);

        return (): void => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="mt-8 container mx-auto">
            <div className="sticky top-0 z-10 w-full bg-background">
                <div className="flex items-center justify-between py-4 px-6 border-b-2 border-primary">
                    <div className="text-primary font-bold text-6xl">{activeSection}</div>
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

            {/* Menu Sections */}
            <div className="mt-8">
                {sections.map((section) => (
                    <div key={section} id={section} className="mb-8">
                        <div className="text-primary font-bold text-6xl mb-4">
                            {section.toUpperCase()}S
                        </div>
                        {/* Filter the menu items based on their type */}
                        <MenuCard
                            menu={menu.filter(
                                (item) => item.type.toLowerCase() === section,
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
