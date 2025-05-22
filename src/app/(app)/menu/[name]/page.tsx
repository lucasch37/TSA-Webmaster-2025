import MenuPageCard from "@/features/menu/components/menu-page-card";
import {getMenu} from "@/features/menu/actions/getMenu";
import {addToCart} from "@/features/cart/actions/cart";
import {MenuItem} from "@/types";
import {Metadata} from "next";
import React from "react";
import dynamic from "next/dynamic";

const MenuItemPageClientFeatures = dynamic(
    () => import("@/tours/menuItem/MenuItemPageClientFeatures"),
);

// Props type for menu item page
type Props = {
    params: Promise<{
        name: string;
    }>;
};

// Generate dynamic metadata for menu item
export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const {name} = await props.params;
    const itemName = decodeURIComponent(name);
    return {
        title: `${itemName} | Sprout & About`,
        description: `Details about ${itemName} from TSA Webmaster 2024-2025 Project`,
    };
};

// Individual menu item page component
const MenuItemPage = async (props: Props): Promise<React.JSX.Element> => {
    const params = await props.params;

    const {name} = params;

    // Fetch menu and find specific item
    const getMenuRes = await getMenu();
    const menu = getMenuRes.data;
    const itemName = decodeURIComponent(name);
    const menuItem = menu?.find((item: MenuItem) => item.name === itemName);

    if (!menuItem) {
        return <></>;
    }

    return (
        <>
            <MenuItemPageClientFeatures />
            <MenuPageCard menuItem={menuItem} addToCart={addToCart} />
        </>
    );
};

export default MenuItemPage;
