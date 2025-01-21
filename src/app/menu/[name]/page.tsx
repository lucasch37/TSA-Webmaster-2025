import MenuPageCard from "@/components/menu/menu-page-card";
import Navbar from "@/components/navbar";
import {getMenu} from "@/lib/actions/getMenu";
import {MenuItem} from "@/types";
import {Metadata} from "next";
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
            <MenuPageCard menuItem={menuItem} />
        </>
    );
};

export default MenuItemPage;
