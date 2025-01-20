import Navbar from "@/components/navbar";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {getMenu} from "@/lib/actions/getMenu";
import {ShoppingBag} from "lucide-react";
import {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "Menu | Sprout & About",
    description: "TSA Webmaster 2024-2025 Project",
};

export default async function Menu(): Promise<React.JSX.Element> {
    const menuRes = await getMenu();
    const menu = menuRes.data;
    return (
        <>
            <Navbar />
            <div className="mt-8 container mx-auto">
                <div className="text-primary font-bold text-6xl">MENU</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 mt-12">
                    {menu?.map((menuItem) => (
                        <Card key={menuItem.id}>
                            <CardContent>
                                <div className="h-[16rem] flex items-center justify-center overflow-hidden">
                                    <Image
                                        src={menuItem.image_url}
                                        width={500}
                                        height={500}
                                        alt={menuItem.name}
                                        className="w-[13rem] h-[13rem] object-contain"
                                    />
                                </div>

                                <div className="h-[10rem]">
                                    <div className="text-primary font-semibold text-3xl text-[28px] mt-3 line-clamp-2 ">
                                        {menuItem.name.toUpperCase()}
                                    </div>
                                    <div className="text-primary text-sm mt-3 line-clamp-3">
                                        {menuItem.description}
                                    </div>
                                </div>

                                <Link href={`menu/${menuItem.name}`}>
                                    <Button
                                        size={"default"}
                                        className="w-full justify-between flex mt-4"
                                    >
                                        <div>${menuItem.price}</div>
                                        <div className="flex gap-2 items-center">
                                            <div className="text-sm">ADD TO CART</div>
                                            <ShoppingBag size={18} />
                                        </div>
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}
