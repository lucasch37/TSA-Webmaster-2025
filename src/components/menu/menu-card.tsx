import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {MenuItem} from "@/types";
import {ShoppingBasket} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Grid of menu item preview cards
export default function MenuCard({menu}: {menu: MenuItem[]}): React.JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-4">
            {menu?.map((menuItem) => (
                <Card key={menuItem.id}>
                    <CardContent>
                        {/* Item image */}
                        <div className="h-[16rem] flex items-center justify-center overflow-hidden">
                            <Image
                                src={menuItem.image_url}
                                width={500}
                                height={500}
                                alt={menuItem.name}
                                className="w-[15rem] object-contain"
                            />
                        </div>

                        {/* Item name and description */}
                        <div className="h-[10rem]">
                            <div className="text-primary font-semibold text-3xl text-[28px] mt-3 line-clamp-2 ">
                                {menuItem.name.toUpperCase()}
                            </div>
                            <div className="text-primary text-sm mt-3 line-clamp-3">
                                {menuItem.description}
                            </div>
                        </div>

                        {/* Price and details button */}
                        <Link href={`menu/${menuItem.name}`}>
                            <Button
                                size={"default"}
                                className="w-full justify-between flex mt-4"
                            >
                                <div>${menuItem.price}</div>
                                <div className="flex gap-2 items-center">
                                    <div className="text-sm">SEE DETAILS</div>
                                    <ShoppingBasket size={18} />
                                </div>
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
