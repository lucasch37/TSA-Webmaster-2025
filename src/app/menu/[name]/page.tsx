import Navbar from "@/components/navbar";
import {getMenu} from "@/lib/actions/getMenu";
import {MenuItem} from "@/types";
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
    console.log(menuItem);
    if (!menuItem) {
        return <></>;
    }
    return (
        <>
            <Navbar />
            <div className="mt-8 container mx-auto">
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-[40rem] border-primary border-4 ">
                        <div className="flex justify-center items-center">
                            <Image
                                src={"/landing/jalapeno-poppers.png"}
                                height={1000}
                                width={1000}
                                alt={menuItem?.name}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="text-primary font-bold text-6xl">
                            {menuItem.name}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MenuItemPage;
