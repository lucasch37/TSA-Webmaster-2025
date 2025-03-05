"use client";

import {MenuItem} from "@/types";
import {Minus, Plus, ShoppingBasket} from "lucide-react";
import Image from "next/image";
import React from "react";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

type Props = {
    menuItem: MenuItem;
    addToCart: Function;
};

// Detailed menu item page component
const MenuPageCard = ({menuItem, addToCart}: Props): React.JSX.Element => {
    const [activeOptions, setActivOptions] = React.useState<"Additives" | "Removables">(
        "Additives",
    );
    const [selectedAddItems, setSelectedAddItems] = React.useState<string[]>([]);
    const [selectedRemoveItems, setSelectedRemoveItems] = React.useState<string[]>([]);
    const [quantity, setQuantity] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    // Add item to cart with selected options
    const handleAddToCart = async (): Promise<void> => {
        try {
            setLoading(true);
            await addToCart(menuItem, quantity, selectedAddItems, selectedRemoveItems);
            toast.success(`${quantity}x ${menuItem.name} added to your cart!`);
        } catch {
            toast.error("Failed to add item to cart");
        } finally {
            setLoading(false);
        }
    };

    // Toggle add/remove items in customization
    const handleCheckboxChange = (item: string, type: "add" | "remove"): void => {
        if (type === "add") {
            setSelectedAddItems((prev) =>
                prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
            );
        } else {
            setSelectedRemoveItems((prev) =>
                prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
            );
        }
    };

    return (
        <div className="flex flex-col container mx-auto mt-8">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8">
                {/* Left side - Image and nutrition info */}
                <div className="relative">
                    <div className="w-full border-primary border-2 relative box-border">
                        {/* Item image */}
                        <div className="flex justify-center items-center h-[35rem]">
                            <Image
                                src={menuItem.image_url}
                                className="w-[25rem]"
                                height={1000}
                                width={1000}
                                alt={menuItem?.name}
                                placeholder="blur"
                                blurDataURL="UGK^mD-o1-M_XNR4xvtS1,RjIon+M#b_yDVs"
                            />
                        </div>

                        {/* Nutrition facts grid */}
                        <div
                            className={`w-full grid ${Object.keys(menuItem.health_stats).length === 4 ? "grid-cols-4" : "grid-cols-5"} divide-x-2 divide-primary border-t-2 border-primary items-center`}
                        >
                            {Object.entries(menuItem.health_stats).map(
                                ([key, value], index) => (
                                    <div
                                        key={index}
                                        className="text-primary flex flex-col p-5"
                                    >
                                        <div className="text-xs">
                                            {`${key}`.toUpperCase()}
                                        </div>
                                        <div className="text-xl font-semibold">
                                            {`${value}`}
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side - Item details and customization */}
                <div className="flex flex-col justify-between">
                    {/* Item name and description */}
                    <div>
                        <div className="text-primary font-semibold text-4xl">
                            {menuItem.name.toUpperCase()}
                        </div>
                        <hr className="border-t-2 border-primary my-6 w-full" />
                        <div className="text-primary text-base font-medium max-w-full flex flex-col gap-8">
                            <div>{menuItem.description}</div>

                            <div>
                                <span className="font-bold underline">Ingredients:</span>{" "}
                                {menuItem.ingredients.join(", ")}
                            </div>
                        </div>

                        {/* Quantity selector and add to cart */}
                        <div className="mt-12 flex gap-6 items-center">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hover:bg-primary hover:text-white"
                                    onClick={() =>
                                        setQuantity((prev) => Math.max(1, prev - 1))
                                    }
                                >
                                    <Minus size={14} />
                                </Button>
                                <span className="text-primary font-medium">
                                    {quantity}
                                </span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="hover:bg-primary hover:text-white"
                                    onClick={() => setQuantity((prev) => prev + 1)}
                                >
                                    <Plus size={14} />
                                </Button>
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                disabled={loading}
                                size={"lg"}
                                className="w-fit"
                            >
                                <div className="font-medium">Add To Cart</div>
                                <ShoppingBasket size={20} />
                            </Button>
                            <div className="font-bold text-primary text-[23px]">
                                ${(menuItem.price * quantity).toFixed(2)}
                            </div>
                        </div>
                    </div>

                    {/* Customization options */}
                    <div className="border-2 mt-12">
                        {/* Tab switcher */}
                        <div className="grid grid-cols-2 divide-x-2 divide-primary border-b-2">
                            <div
                                className={`px-4 py-3 ${activeOptions === "Additives" ? "bg-primary text-white" : "text-primary"} font-medium cursor-pointer`}
                                onClick={() => setActivOptions("Additives")}
                            >
                                Add Items
                            </div>
                            <div
                                className={`px-4 py-3 ${activeOptions === "Removables" ? "bg-primary text-white" : "text-primary"} font-medium cursor-pointer`}
                                onClick={() => setActivOptions("Removables")}
                            >
                                Remove Items
                            </div>
                        </div>

                        {/* Options checkboxes */}
                        <div className="p-8 min-h-[10rem]">
                            <div className="grid grid-cols-3 gap-4 text-">
                                {(activeOptions === "Additives"
                                    ? menuItem.items_to_add
                                    : menuItem.items_to_remove
                                ).map((item, index) => (
                                    <div
                                        className="flex gap-2 items-center text-primary"
                                        key={index}
                                    >
                                        <Checkbox
                                            checked={
                                                activeOptions === "Additives"
                                                    ? selectedAddItems.includes(item)
                                                    : selectedRemoveItems.includes(item)
                                            }
                                            onCheckedChange={() =>
                                                handleCheckboxChange(
                                                    item,
                                                    activeOptions === "Additives"
                                                        ? "add"
                                                        : "remove",
                                                )
                                            }
                                        />
                                        <div>{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPageCard;
