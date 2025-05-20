"use client";

import React, {useEffect, useState, useRef} from "react";
import {MenuItem} from "@/types";
import MenuCard from "./menu-card";
import {useSearchParams} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {ScrollProgress} from "@/components/scroll-progress";
import {SlidersHorizontal, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

const sections = ["appetizer", "side", "entree", "dessert"];

const getCalories = (item: MenuItem): number => {
    const calValue = item.health_stats?.["Calories"];
    if (typeof calValue === "string") {
        const parsed = parseFloat(calValue.replace(/[^0-9.]/g, ""));
        return isNaN(parsed) ? 0 : parsed;
    }
    if (typeof calValue === "number") {
        return calValue;
    }
    return 0;
};

export default function Menu({menu}: {menu: MenuItem[]}): React.JSX.Element {
    const searchParams = useSearchParams();
    const [activeSection, setActiveSection] = useState<string>("MENU");
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
    const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>(menu);
    const headerRef = useRef<HTMLDivElement>(null);

    const [filters, setFilters] = useState({
        vegan: false,
        glutenFree: false,
    });
    const [sortOption, setSortOption] = useState<string>("none");

    const scrollToSection = (sectionId: string): void => {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement && headerRef.current) {
            const headerHeight = headerRef.current.offsetHeight;
            let titleAreaHeight = 0;
            const desiredGap = 16;

            const titleElement = sectionElement.querySelector(
                ".section-page-title",
            ) as HTMLElement;
            if (titleElement) {
                const titleStyles = window.getComputedStyle(titleElement);
                titleAreaHeight =
                    titleElement.offsetHeight + parseFloat(titleStyles.marginBottom);
            } else {
                console.warn(
                    `'.section-page-title' not found in section '${sectionId}'. Using fallback height.`,
                );
                titleAreaHeight = 60;
            }

            const elementPosition = sectionElement.getBoundingClientRect().top;
            const absoluteElementTop = elementPosition + window.scrollY;
            const absoluteContentTopAfterTitle = absoluteElementTop + titleAreaHeight;
            const targetScrollY =
                absoluteContentTopAfterTitle - headerHeight - desiredGap;

            window.scrollTo({
                top: targetScrollY,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const section = searchParams.get("section");
        if (section) {
            setTimeout(() => scrollToSection(section), 150);
        }
    }, [searchParams]);

    useEffect(() => {
        const handleScroll = (): void => {
            const currentHeaderHeight = headerRef.current?.offsetHeight || 90;
            const scrollPosition = window.scrollY + currentHeaderHeight + 1;
            let currentSectionName = "MENU";

            sections.forEach((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const elementTop = element.offsetTop;
                    const elementBottom = elementTop + element.offsetHeight;
                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        currentSectionName = section.toUpperCase() + "S";
                    }
                }
            });

            if (currentSectionName === "MENU" && window.scrollY > 0) {
                for (let i = sections.length - 1; i >= 0; i--) {
                    const element = document.getElementById(sections[i]);
                    if (element && element.offsetTop < scrollPosition) {
                        currentSectionName = sections[i].toUpperCase() + "S";
                        break;
                    }
                }
            }
            setActiveSection(currentSectionName);
        };

        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();

        return (): void => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        let result = [...menu];
        if (filters.vegan) {
            result = result.filter((item) => item.tags.some((tag) => tag === "Vegan"));
        }
        if (filters.glutenFree) {
            result = result.filter((item) =>
                item.tags.some((tag) => tag === "Gluten Free"),
            );
        }
        if (sortOption !== "none") {
            switch (sortOption) {
                case "priceLowToHigh":
                    result.sort((a, b) => {
                        const aPrice =
                            a.sale_percentage !== 0
                                ? a.price * (1 - a.sale_percentage / 100)
                                : a.price;
                        const bPrice =
                            b.sale_percentage !== 0
                                ? b.price * (1 - b.sale_percentage / 100)
                                : b.price;
                        return aPrice - bPrice;
                    });
                    break;
                case "caloriesLowToHigh":
                    result.sort((a, b) => {
                        const aCalories = getCalories(a);
                        const bCalories = getCalories(b);
                        return aCalories - bCalories;
                    });
                    break;
                case "alphabetical":
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    break;
            }
        }
        setFilteredMenu(result);
    }, [menu, filters, sortOption]);

    const toggleFilter = (): void => {
        setIsFilterOpen(!isFilterOpen);
    };

    const FilterOption = ({
        label,
        active,
        onClick,
    }: {
        label: string;
        active: boolean;
        onClick: () => void;
    }): React.JSX.Element => (
        <div className="flex gap-2.5 items-center text-primary">
            <Checkbox
                checked={active}
                onCheckedChange={onClick}
                id={`filter-${label.toLowerCase().replace(" ", "-")}`}
            />
            <label
                htmlFor={`filter-${label.toLowerCase().replace(" ", "-")}`}
                className="text-sm md:text-base cursor-pointer"
            >
                {label}
            </label>
        </div>
    );

    const SortOption = ({
        label,
        value,
        currentValue,
        onChange,
    }: {
        label: string;
        value: string;
        currentValue: string;
        onChange: (value: string) => void;
    }): React.JSX.Element => {
        const isActive = currentValue === value;

        return (
            <motion.button
                type="button"
                onClick={() => onChange(isActive ? "none" : value)}
                className={`
                    relative inline-flex items-center justify-center rounded-md text-sm font-medium
                    transition-colors focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:pointer-events-none disabled:opacity-50
                    h-9 px-3 md:px-4 border overflow-hidden min-w-[100px] md:min-w-0
                    border-primary
                    ${!isActive ? "hover:bg-primary/10" : ""}
                `}
                whileTap={{scale: 0.97}}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: "hsl(var(--primary))",
                        zIndex: 0,
                        originY: 1,
                    }}
                    initial={{scaleY: 0}}
                    animate={{scaleY: isActive ? 1 : 0}}
                    transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                />

                <motion.span
                    className="relative tracking-tight"
                    animate={{
                        color: isActive
                            ? "hsl(var(--primary-foreground))"
                            : "hsl(var(--primary))",
                    }}
                    transition={{
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                        delay: isActive ? 0.05 : 0,
                    }}
                >
                    {label}
                </motion.span>
            </motion.button>
        );
    };

    return (
        <div className="mt-4 md:mt-8 container !px-0">
            <ScrollProgress />
            <div
                ref={headerRef}
                className="sticky top-0 w-full z-10 border-b-primary overflow-hidden px-[2rem] bg-gradient-to-r md:from-[#e1f7de] from-[#e1f7de] md:via-[#f6f5dd] md:to-[#ebf5e5] to-[#ebf5e5]"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4 border-b-2">
                    <div className="text-primary font-bold text-5xl md:text-6xl text-center w-full sm:w-auto min-h-[60px] sm:min-h-[80px] flex items-center justify-center sm:justify-start">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{y: 10, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{opacity: 0, y: -10}}
                                transition={{duration: 0.15}}
                            >
                                {activeSection}
                            </motion.div>
                        </AnimatePresence>{" "}
                    </div>
                    <div className="flex justify-center gap-4 md:gap-6 text-primary text-sm md:text-lg">
                        {sections.map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className="flex gap-2 items-center nav-link font-semibold"
                            >
                                {section.toUpperCase()}S
                            </button>
                        ))}
                        <button
                            onClick={toggleFilter}
                            className="flex gap-2 items-center nav-link font-semibold"
                        >
                            <motion.div
                                animate={{rotate: isFilterOpen ? 90 : 0}}
                                transition={{duration: 0.3}}
                            >
                                {isFilterOpen ? (
                                    <X size={20} />
                                ) : (
                                    <SlidersHorizontal size={20} />
                                )}
                            </motion.div>
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            key="filter-panel-content"
                            initial={{height: 0, opacity: 0}}
                            animate={{height: "auto", opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="overflow-hidden"
                        >
                            <div className="p-8 flex flex-col md:flex-row justify-between gap-8 md:gap-4">
                                <div className="flex flex-col gap-3">
                                    <div className="text-primary font-semibold text-lg">
                                        Dietary Preferences
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                                        <FilterOption
                                            label="Vegan"
                                            active={filters.vegan}
                                            onClick={() =>
                                                setFilters({
                                                    ...filters,
                                                    vegan: !filters.vegan,
                                                })
                                            }
                                        />
                                        <FilterOption
                                            label="Gluten Free"
                                            active={filters.glutenFree}
                                            onClick={() =>
                                                setFilters({
                                                    ...filters,
                                                    glutenFree: !filters.glutenFree,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className="text-primary font-semibold text-lg">
                                        Sort By
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <SortOption
                                            label="Price: Low-High"
                                            value="priceLowToHigh"
                                            currentValue={sortOption}
                                            onChange={setSortOption}
                                        />
                                        <SortOption
                                            label="Calories: Low-High"
                                            value="caloriesLowToHigh"
                                            currentValue={sortOption}
                                            onChange={setSortOption}
                                        />
                                        <SortOption
                                            label="Alphabetical"
                                            value="alphabetical"
                                            currentValue={sortOption}
                                            onChange={setSortOption}
                                        />
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                className="h-[2px] bg-primary w-full"
                                initial={{scaleX: 0}}
                                animate={{scaleX: 1}}
                                exit={{scaleX: 0}}
                                transition={{duration: 0.4, ease: "circOut", delay: 0.1}}
                                style={{transformOrigin: "left"}}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-16 px-[2rem]">
                {sections.map((section) => {
                    const sectionMenu = filteredMenu.filter(
                        (item) =>
                            item.type.toLowerCase() === section && item.hidden === false,
                    );

                    const hasActiveFilters =
                        filters.vegan || filters.glutenFree || sortOption !== "none";
                    if (hasActiveFilters && sectionMenu.length === 0) {
                        return null;
                    }

                    return (
                        <div key={section} id={section} className="mb-12 min-h-[100px]">
                            <div className="text-primary font-bold text-4xl mb-6 section-page-title">
                                {section.toUpperCase()}S
                            </div>
                            {sectionMenu.length > 0 ? (
                                <MenuCard menu={sectionMenu} />
                            ) : (
                                <p className="text-neutral-500 text-lg">
                                    {hasActiveFilters
                                        ? `No ${section.toLowerCase()}s match your current selection.`
                                        : `No ${section.toLowerCase()}s currently available.`}
                                </p>
                            )}
                        </div>
                    );
                })}

                {filteredMenu.length === 0 &&
                    (filters.vegan || filters.glutenFree || sortOption !== "none") && (
                        <div className="text-center py-16">
                            <div className="text-primary text-2xl font-semibold">
                                No items match your selection
                            </div>
                            <p className="text-neutral-600 mt-2 mb-4">
                                Try adjusting your filters or clearing them to see all
                                items.
                            </p>
                            <Button
                                onClick={() => {
                                    setFilters({vegan: false, glutenFree: false});
                                    setSortOption("none");
                                }}
                                className="mt-4 bg-primary text-white hover:bg-primary/90"
                            >
                                Clear All Filters & Sort
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
}
