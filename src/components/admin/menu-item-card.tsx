"use client";

import React, {useState} from "react";
import Image from "next/image";
import {MenuItem} from "@/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";
import {Badge} from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {ChevronDown} from "lucide-react";
import {updateMenuItemHidden} from "@/lib/actions/updateMenuItemHidden";

// Props interface for menu item card
interface MenuItemCardProps {
    item: MenuItem;
}

// Menu item card component for admin view
export function MenuItemCard({item}: MenuItemCardProps): React.JSX.Element {
    const [isHidden, setIsHidden] = useState(item.hidden);

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
        <Card className={isHidden ? "opacity-60" : ""}>
            {/* Card header with item name and visibility toggle */}
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <Switch
                        checked={!isHidden}
                        onCheckedChange={(checked) => handleToggle(checked)}
                    />
                </CardTitle>
                <CardDescription>{item.type}</CardDescription>
            </CardHeader>

            {/* Card content with image and basic info */}
            <CardContent>
                {/* Item image */}
                <div className="h-48 relative mb-4">
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>

                {/* Price and description */}
                <div className="h-28">
                    <div className="flex items-center gap-4">
                        <p className="font-bold text-lg mb-2">Price: ${item.price}</p>
                        {item.sale_percentage !== 0 && (
                            <Badge variant="destructive" className="mb-2">
                                Sale: {item.sale_percentage}% off
                            </Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground line-clamp-3">
                        {item.description}
                    </p>
                </div>
            </CardContent>

            {/* Details dialog trigger */}
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="flex items-center justify-between w-full">
                            <span>More Details</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>

                    {/* Detailed item information dialog */}
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{item.name} Details</DialogTitle>
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
                                            <li key={key}>{`${key}: ${value}`}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
}
