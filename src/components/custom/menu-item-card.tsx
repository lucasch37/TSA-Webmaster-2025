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

interface MenuItemCardProps {
    item: MenuItem;
    // onToggleHidden: (id: string, hidden: boolean) => void;
}

export function MenuItemCard({item}: MenuItemCardProps): React.JSX.Element {
    const [isHidden, setIsHidden] = useState(item.hidden);

    return (
        <Card className={isHidden ? "opacity-60" : ""}>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{item.name}</span>
                    <Switch
                        checked={!isHidden}
                        onCheckedChange={(checked) => setIsHidden(!checked)}
                    />
                </CardTitle>
                <CardDescription>{item.category}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-48 relative mb-4">
                    <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
                <p className="font-bold text-lg mb-2">Price: {item.price}</p>
                {item.sale_percentage !== 0 && (
                    <Badge variant="destructive" className="mb-2">
                        Sale: {item.sale_percentage}% off
                    </Badge>
                )}
                <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
            <CardFooter>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="outline"
                            className="flex items-center justify-between w-full"
                        >
                            <span>More Details</span>
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{item.name} Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-2">
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
