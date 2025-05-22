"use client";

import React, {useEffect, useState, useRef, useMemo} from "react";
import {MenuItem} from "@/types";
import MenuCard from "./menu-card";
import {useSearchParams} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {ScrollProgress} from "@/components/scroll-progress";
import {SlidersHorizontal, X, DollarSign, Utensils, ArrowDownUp} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Slider} from "@/components/ui/slider";

const sections = ["appetizer", "side", "entree", "dessert"];

const getEffectivePrice = (item: MenuItem): number => {
    return item.sale_percentage !== 0
        ? item.price * (1 - item.sale_percentage / 100)
        : item.price;
};

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

    const {minPrice, maxPrice} = useMemo(() => {
        if (!menu || menu.length === 0) {
            return {minPrice: 0, maxPrice: 100};
        }
        const prices = menu.map(getEffectivePrice);
        const calculatedMin = Math.floor(Math.min(...prices));
        const calculatedMax = Math.ceil(Math.max(...prices));
        return {
            minPrice: calculatedMin,
            maxPrice: calculatedMin === calculatedMax ? calculatedMax + 1 : calculatedMax,
        };
    }, [menu]);

    const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

    useEffect(() => {
        setPriceRange([minPrice, maxPrice]);
    }, [minPrice, maxPrice]);

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
                titleAreaHeight = 60;
            }
            const elementPosition = sectionElement.getBoundingClientRect().top;
            const absoluteElementTop = elementPosition + window.scrollY;
            const absoluteContentStart = absoluteElementTop + titleAreaHeight;
            const targetScrollY = absoluteContentStart - headerHeight - desiredGap;
            window.scrollTo({top: targetScrollY, behavior: "smooth"});
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
        return (): void => window.removeEventListener("scroll", handleScroll);
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
        if (minPrice < maxPrice) {
            result = result.filter((item) => {
                const effectivePrice = getEffectivePrice(item);
                return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
            });
        }
        if (sortOption !== "none") {
            switch (sortOption) {
                case "priceLowToHigh":
                    result.sort((a, b) => getEffectivePrice(a) - getEffectivePrice(b));
                    break;
                case "caloriesLowToHigh":
                    result.sort((a, b) => getCalories(a) - getCalories(b));
                    break;
                case "alphabetical":
                    result.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }
        }
        setFilteredMenu(result);
    }, [menu, filters, sortOption, priceRange, minPrice, maxPrice]);

    const toggleFilter = (): void => setIsFilterOpen(!isFilterOpen);

    const FilterOption = ({
        label,
        active,
        onClick,
    }: {
        label: string;
        active: boolean;
        onClick: () => void;
    }): React.JSX.Element => (
        <div className="flex gap-2 items-center text-primary">
            <Checkbox
                checked={active}
                onCheckedChange={onClick}
                id={`filter-${label.toLowerCase().replace(" ", "-")}`}
            />
            <label
                htmlFor={`filter-${label.toLowerCase().replace(" ", "-")}`}
                className="text-xs sm:text-sm cursor-pointer whitespace-nowrap"
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
            <button
                type="button"
                onClick={() => onChange(isActive ? "none" : value)}
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-8 px-2.5 border transition-colors whitespace-nowrap ${isActive ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border-primary text-primary hover:bg-primary/10"}`}
            >
                {label}
            </button>
        );
    };

    const resetFilters = (): void => {
        setFilters({vegan: false, glutenFree: false});
        setSortOption("none");
        if (minPrice < maxPrice) {
            setPriceRange([minPrice, maxPrice]);
        }
    };

    return (
        <div className="mt-4 md:mt-8 container !px-0">
            <ScrollProgress />
            <div
                ref={headerRef}
                className="sticky top-0 w-full z-10 px-[2rem] sm:px-[0rem] border-b-primary bg-gradient-to-r md:from-[#e1f7de] from-[#e1f7de] md:via-[#f6f5dd] md:to-[#ebf5e5] to-[#ebf5e5] overflow-hidden"
            >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 gap-4 border-b-2">
                    <div className="text-primary sm:pl-[2rem] font-bold text-5xl md:text-6xl text-center w-full sm:w-auto min-h-[60px] sm:min-h-[80px] flex items-center justify-center sm:justify-start">
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
                        </AnimatePresence>
                    </div>
                    <div className="flex sm:pr-[2rem] justify-center gap-4 md:gap-6 text-primary text-sm md:text-lg">
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
                                className="hidden md:flex"
                                animate={{rotate: isFilterOpen ? 90 : 0}}
                                transition={{duration: 0.3}}
                            >
                                {isFilterOpen ? (
                                    <X size={28} />
                                ) : (
                                    <SlidersHorizontal size={28} />
                                )}
                            </motion.div>
                            <motion.div
                                className="md:hidden"
                                animate={{rotate: isFilterOpen ? 90 : 0}}
                                transition={{duration: 0.3}}
                            >
                                {isFilterOpen ? (
                                    <X size={18} />
                                ) : (
                                    <SlidersHorizontal size={18} />
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
                            <div className="p-4 sm:p-6 flex flex-col lg:flex-row lg:items-center lg:justify-around gap-y-4 gap-x-3 sm:gap-x-6">
                                <div className="flex flex-col items-start gap-y-2 lg:flex-row lg:items-center lg:gap-x-3 lg:flex-1">
                                    <div className="text-primary font-semibold text-sm sm:text-base whitespace-nowrap flex items-center gap-1.5 shrink-0">
                                        <Utensils size={16} /> Dietary:
                                    </div>
                                    <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
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

                                <div className="flex flex-col items-start gap-y-2 lg:flex-row lg:items-center lg:gap-x-3 lg:flex-1">
                                    <div className="text-primary font-semibold text-sm sm:text-base whitespace-nowrap flex items-center gap-1.5 shrink-0">
                                        <ArrowDownUp size={16} /> Sort:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        <SortOption
                                            label="Price"
                                            value="priceLowToHigh"
                                            currentValue={sortOption}
                                            onChange={setSortOption}
                                        />
                                        <SortOption
                                            label="Calories"
                                            value="caloriesLowToHigh"
                                            currentValue={sortOption}
                                            onChange={setSortOption}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col items-start gap-y-2 lg:flex-row lg:items-center lg:gap-x-3 lg:flex-1">
                                    <div className="text-primary font-semibold text-sm sm:text-base whitespace-nowrap flex items-center gap-1.5 shrink-0">
                                        <DollarSign size={16} /> Price:
                                    </div>
                                    <div className="flex items-center gap-2 w-full">
                                        <div className="text-xs sm:text-sm text-primary/80 whitespace-nowrap shrink-0">
                                            ${priceRange[0]}
                                        </div>
                                        <div className="flex-grow mx-1 min-w-[70px] sm:min-w-[80px]">
                                            {minPrice < maxPrice && (
                                                <Slider
                                                    min={minPrice}
                                                    max={maxPrice}
                                                    step={1}
                                                    value={priceRange}
                                                    onValueChange={(value) =>
                                                        setPriceRange(
                                                            value as [number, number],
                                                        )
                                                    }
                                                    className="w-full"
                                                />
                                            )}
                                        </div>
                                        <div className="text-xs sm:text-sm text-primary/80 whitespace-nowrap shrink-0">
                                            ${priceRange[1]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                className="h-[2px] bg-primary w-full"
                                initial={{scaleX: 0}}
                                animate={{scaleX: 1}}
                                exit={{scaleX: 0}}
                                transition={{duration: 0.4, ease: "circOut", delay: 0.1}}
                                style={{transformOrigin: "center"}}
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
                        filters.vegan ||
                        filters.glutenFree ||
                        sortOption !== "none" ||
                        (minPrice < maxPrice &&
                            (priceRange[0] !== minPrice || priceRange[1] !== maxPrice));
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
                    (filters.vegan ||
                        filters.glutenFree ||
                        sortOption !== "none" ||
                        (minPrice < maxPrice &&
                            (priceRange[0] !== minPrice ||
                                priceRange[1] !== maxPrice))) && (
                        <div className="text-center py-16">
                            <div className="text-primary text-2xl font-semibold">
                                No items match your selection
                            </div>
                            <p className="text-neutral-600 mt-2 mb-4">
                                Try adjusting your filters or clearing them to see all
                                items.
                            </p>
                            <Button
                                onClick={resetFilters}
                                className="mt-4 bg-primary text-white hover:bg-primary/90"
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    )}
            </div>
        </div>
    );
}
