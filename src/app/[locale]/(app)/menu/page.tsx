import Menu from "@/features/menu/components/menu";
import {getMenu} from "@/features/menu/actions/getMenu";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Menu | Sprout & About",
    description: "TSA Webmaster 2024-2025 Project",
};

export default async function MenuPage(): Promise<React.JSX.Element> {
    const menuRes = await getMenu();
    const menu = menuRes.data;
    if (!menu) {
        return <></>;
    }
    return (
        <>
            <Menu menu={menu} />
        </>
    );
}
