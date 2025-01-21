"use client";

import React from "react";

// Menu section types
const sections = ["appetizer", "entree", "side", "dessert"];

// Smooth scroll function for menu sections
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

const MenuScroll = (): React.JSX.Element => {
    return (
        <div>
            {/* Navigation header */}
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
        </div>
    );
};

export default MenuScroll;
