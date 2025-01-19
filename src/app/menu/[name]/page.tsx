import Navbar from "@/components/navbar";
import {getMenu} from "@/lib/actions/getMenu";
import {MenuItem} from "@/types";
import {ShoppingBag} from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
    params: {
        name: string;
    };
};

const MenuItemPage = async ({params: {name}}: Props): Promise<React.JSX.Element> => {
    const getMenuRes = await getMenu();
    const menu = getMenuRes.data;
    const itemName = decodeURIComponent(name);
    const menuItem = menu?.find((item: MenuItem) => item.name === itemName);
    console.log(menuItem?.health_stats);
    if (!menuItem) {
        return <></>;
    }
    return (
        <>
            <Navbar />
            <div className="flex flex-col container mx-auto mt-8">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10">
                    <div className="relative">
                        <div className="h-[40rem] w-full border-primary border-2 relative box-border">
                            <div className="flex justify-center items-center  h-[80%]">
                                <img
                                    src={"/landing/jalapeno-poppers.png"}
                                    className="w-4/5"
                                    alt={menuItem?.name}
                                />
                            </div>
                            <div className="absolute bottom-0 w-full grid grid-cols-4 divide-x-2 divide-primary border-t-2 border-primary h-[15%] items-center">
                                {Object.entries(menuItem.health_stats).map(
                                    ([key, value], index) => (
                                        <div
                                            key={index}
                                            className="text-primary flex flex-col p-5"
                                        >
                                            <div className="text-sm">
                                                {`${key}`.toUpperCase()}:
                                            </div>
                                            <div className="text-lg font-bold">
                                                {`${value}`}
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-6">
                        <div className="text-primary font-bold text-5xl font-homemade-apple ">
                            {menuItem.name}
                        </div>
                        <hr className="border-t-2 border-primary mt-4 w-full" />
                        <div className="text-primary text-base font-medium mt-4 max-w-full flex flex-col gap-8">
                            <div>{menuItem.description}</div>

                            <div>INGREDIENTS: {menuItem.ingredients.join(", ")}</div>
                        </div>
                        <button className="bg-primary hover:bg-green-800 transition ease-in-out duraiton-300 text-white py-4 px-8 rounded-full flex gap-3 items-center w-fit mt-16 justify-between">
                            <div>${menuItem.price}</div>
                            <div className="flex gap-2 items-center">
                                ADD TO MEAL
                                <ShoppingBag />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuItemPage;
