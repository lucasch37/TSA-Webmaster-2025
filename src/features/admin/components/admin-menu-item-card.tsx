"use client";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Switch} from "@/components/ui/switch";
import {MenuItem} from "@/types";
import {IconInfoCircleFilled} from "@tabler/icons-react";
import {Edit} from "lucide-react";
import Image from "next/image";
import React, {useState} from "react";
import EditMenuDialog from "./edit-menu-dialog";

// Props interface for menu item card
interface MenuItemCardProps {
    item: MenuItem;
    updateMenuItemHidden: Function;
}

// Menu item card component for admin view
export function AdminMenuItemCard({
    item,
    updateMenuItemHidden,
}: MenuItemCardProps): React.JSX.Element {
    const [isHidden, setIsHidden] = useState(item.hidden);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Toggle menu item visibility
    const handleToggle = async (checked: boolean): Promise<void> => {
        try {
            const response = await updateMenuItemHidden(item.id, !checked);
            if (!response.success) {
                throw new Error(response.message);
            }
            setIsHidden(!checked);
        } catch {
            setIsHidden(checked);
        }
    };

    return (
        <div className={`${isHidden ? "opacity-60" : ""} border-2 p-6`}>
            {/* Card header with item name and visibility toggle */}
            <div>
                <div className="flex justify-between items-center">
                    <span className="line-clamp-1 uppercase text-xl font-bold text-primary">
                        {item.name}
                    </span>
                    <Switch
                        checked={!isHidden}
                        onCheckedChange={(checked) => handleToggle(checked)}
                    />
                </div>
                <div className="text-primary">
                    {isHidden ? "Unavailable" : "Available"}
                </div>
            </div>

            {/* Card content with image and basic info */}
            <div>
                {/* Item image */}
                <div className="h-56 relative mb-4">
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-contain rounded-md p-4 h-full"
                    />
                </div>

                {/* Price and description */}
                <div className="h-24">
                    <div className="flex items-center gap-2 mb-4">
                        <p className="font-bold text-2xl text-primary">
                            ${item.price.toFixed(2)}
                        </p>
                        {item.sale_percentage !== 0 && (
                            <div className="rounded-full border border-red-500 px-2 py-0.5 text-red-500 text-xs">
                                Sale: {item.sale_percentage}% off
                            </div>
                        )}
                        <Dialog>
                            <DialogTrigger asChild>
                                <IconInfoCircleFilled
                                    size={25}
                                    className="text-primary cursor-pointer"
                                />
                            </DialogTrigger>

                            {/* Detailed item information dialog */}
                            <DialogContent className="text-primary max-w-[800px]">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl uppercase">
                                        {item.name} Details
                                    </DialogTitle>
                                </DialogHeader>
                                <div className="space-y-2">
                                    {/* Ingredients and customization options */}
                                    <p>
                                        <strong>Ingredients:</strong>{" "}
                                        {item.ingredients.join(", ")}
                                    </p>
                                    <p>
                                        <strong>Items to remove:</strong>{" "}
                                        {item.items_to_remove.join(", ")}
                                    </p>
                                    <p>
                                        <strong>Items to add:</strong>{" "}
                                        {item.items_to_add.join(", ")}
                                    </p>

                                    {/* Health statistics */}
                                    <div>
                                        <strong>Health stats:</strong>
                                        <ul className="list-disc pl-5">
                                            {Object.entries(item.health_stats).map(
                                                ([key, value]) => (
                                                    <li
                                                        key={key}
                                                    >{`${key}: ${value}`}</li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <p className="text-primary line-clamp-2 text-sm">
                        {item.description}
                    </p>
                </div>
            </div>

            {/* Details dialog trigger */}
            <div className="mt-4 flex gap-2">
                <Button
                    className="flex-1 items-center"
                    onClick={() => setDialogOpen(true)}
                >
                    <Edit size={18} />
                    Edit Menu Item
                </Button>
            </div>
            <EditMenuDialog item={item} open={dialogOpen} setOpen={setDialogOpen} />
        </div>
    );
}
