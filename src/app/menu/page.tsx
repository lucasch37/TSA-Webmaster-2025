import Navbar from "@/components/navbar";
import {getMenu} from "@/lib/actions/getMenu";

import {Metadata} from "next";

import React from "react";

import Menu from "./menu";

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
            <Navbar />
            <Menu menu={menu} />
        </>
    );
}
