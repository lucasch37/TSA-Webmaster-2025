import Navbar from "@/components/navbar";
import {Button} from "@/components/ui/button";
import {getMenu} from "@/lib/actions/getMenu";
import {MenuItem} from "@/types";
import {ShoppingBag} from "lucide-react";
import {Metadata} from "next";
import Image from "next/image";
import React from "react";

type Props = {
    params: {
        name: string;
    };
};

export const generateMetadata = ({params: {name}}: Props): Metadata => {
    const itemName = decodeURIComponent(name);
    return {
        title: `${itemName} | Sprout & About`,
        description: `Details about ${itemName} from TSA Webmaster 2024-2025 Project`,
    };
};

const MenuItemPage = async ({params: {name}}: Props): Promise<React.JSX.Element> => {
    const getMenuRes = await getMenu();
    const menu = getMenuRes.data;
    const itemName = decodeURIComponent(name);
    const menuItem = menu?.find((item: MenuItem) => item.name === itemName);

    if (!menuItem) {
        return <></>;
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col container mx-auto mt-8">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-8">
                    <div className="relative">
                        <div className="w-full border-primary border-2 relative box-border">
                            <div className="flex justify-center items-center h-[35rem]">
                                <Image
                                    src={"/landing/jalapeno-poppers.png"}
                                    className="w-[25rem]"
                                    height={1000}
                                    width={1000}
                                    alt={menuItem?.name}
                                />
                            </div>
                            <div className="w-full grid grid-cols-4 divide-x-2 divide-primary border-t-2 border-primary items-center">
                                {Object.entries(menuItem.health_stats).map(
                                    ([key, value], index) => (
                                        <div
                                            key={index}
                                            className="text-primary flex flex-col p-5"
                                        >
                                            <div className="text-sm">
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

                    <div className="flex flex-col">
                        <div className="text-primary font-semibold text-4xl">
                            {menuItem.name.toUpperCase()}
                        </div>
                        <hr className="border-t-2 border-primary my-6 w-full" />
                        <div className="text-primary text-base font-medium max-w-full flex flex-col gap-8">
                            <div>{menuItem.description}</div>

                            <div>INGREDIENTS: {menuItem.ingredients.join(", ")}</div>
                        </div>
                        <div className="mt-12 flex gap-6 items-center">
                            <Button size={"lg"}>
                                <div className="font-normal">ADD TO CART</div>
                                <ShoppingBag size={20} />
                            </Button>
                            <div className="font-bold text-primary text-[23px]">
                                ${menuItem.price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuItemPage;
