"use client";

import React, {useEffect, useState} from "react";
import {MenuItem} from "@/types";
import MenuCard from "./menu-card";
import {useSearchParams} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";

const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
        const offset = 52;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
        });
    }
};

const sections = ["appetizer", "side", "entree", "dessert"];

export default function Menu({menu}: {menu: MenuItem[]}): React.JSX.Element {
    const searchParams = useSearchParams();
    const [activeSection, setActiveSection] = useState<string>("MENU");

    useEffect(() => {
        const section = searchParams.get("section");
        if (section) {
            scrollToSection(section);
        }
    }, [searchParams]);

    useEffect(() => {
        const handleScroll = (): void => {
            const stickyHeaderHeight = 90;
            const scrollPosition = window.scrollY + stickyHeaderHeight;

            let currentSection = "MENU";
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
        <div className="mt-8 container">
            <div className="sticky top-0 w-full z-20 bg-background border-b-2 border-b-primary px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4">
                    <div className="text-primary font-bold text-6xl text-center w-full sm:w-auto min-h-[80px] flex items-center justify-center sm:justify-start">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{y: 10}}
                                animate={{y: 0}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.1}}
                            >
                                {activeSection}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="flex justify-center gap-4 md:gap-8 text-primary text-md sm:text-lg">
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
                                    item.hidden === false,
                            )}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
