"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {MenuItem} from "@/types";
import {ShoppingBasket, ZoomIn} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
    MorphingDialog,
    MorphingDialogClose,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogImage,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "../ui/morphing-dialog";

// Grid of menu item preview cards
export default function MenuCard({menu}: {menu: MenuItem[]}): React.JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
            {menu?.map((menuItem) => (
                <MorphingDialog
                    key={menuItem.id}
                    transition={{
                        type: "spring",
                        bounce: 0.05,
                        duration: 0.35,
                    }}
                >
                    <MorphingDialogTrigger>
                        <Card key={menuItem.id}>
                            <CardContent>
                                {/* Item image */}
                                <div className="h-[16rem] flex items-center justify-center overflow-hidden">
                                    <MorphingDialogImage
                                        src={menuItem.image_url}
                                        alt={menuItem.name}
                                        className="w-[15rem] object-contain"
                                    />
                                </div>

                                {/* Item name and description */}
                                <div className="h-[10rem]">
                                    <MorphingDialogTitle className="text-primary font-semibold text-3xl text-[28px] mt-3 line-clamp-2 ">
                                        {menuItem.name.toUpperCase()}
                                    </MorphingDialogTitle>
                                    <MorphingDialogDescription className="text-primary text-sm mt-3 line-clamp-3">
                                        {menuItem.description}
                                    </MorphingDialogDescription>
                                </div>

                                {/* Price and details button */}
                                <Button
                                    size={"default"}
                                    className="w-full justify-between flex mt-4"
                                >
                                    <div>${menuItem.price}</div>
                                    <div className="flex gap-2 items-center">
                                        <div className="text-sm">View</div>
                                        <ZoomIn size={18} />
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>
                    </MorphingDialogTrigger>
                    <MorphingDialogContainer>
                        <MorphingDialogContent>
                            <Card
                                key={menuItem.id}
                                className="bg-background w-[600px] relative"
                            >
                                <CardContent>
                                    {/* Item image */}
                                    <div className="h-[24rem] flex items-center justify-center overflow-hidden">
                                        <MorphingDialogImage
                                            src={menuItem.image_url}
                                            alt={menuItem.name}
                                            className="w-[23rem] object-contain"
                                        />
                                    </div>

                                    {/* Item name and description */}
                                    <div className="h-[7rem]">
                                        <MorphingDialogTitle className="text-primary font-semibold text-3xl text-[28px] mt-3 line-clamp-2 ">
                                            {menuItem.name.toUpperCase()}
                                        </MorphingDialogTitle>
                                        <MorphingDialogDescription className="text-primary text-sm mt-3 line-clamp-3">
                                            {menuItem.description}
                                        </MorphingDialogDescription>
                                    </div>

                                    {/* Price and details button */}
                                    <Link href={`menu/${menuItem.name}`}>
                                        <Button
                                            size={"default"}
                                            className="w-full justify-between flex mt-8"
                                        >
                                            <div>${menuItem.price}</div>
                                            <div className="flex gap-2 items-center">
                                                <div className="text-sm">Buy</div>
                                                <ShoppingBasket size={18} />
                                            </div>
                                        </Button>
                                    </Link>
                                </CardContent>
                                <MorphingDialogClose className="text-primary" />
                            </Card>
                        </MorphingDialogContent>
                    </MorphingDialogContainer>
                </MorphingDialog>
            ))}
        </div>
    );
}
