import React from "react";
import {getMenu} from "@/lib/actions/getMenu";
import {MenuItemCard} from "@/components/admin/menu-item-card";
import AdminNavbar from "@/components/admin/admin-navbar";

export default async function Home(): Promise<React.JSX.Element> {
    const menuRes = await getMenu();
    const menu = menuRes.data;
    return (
        <>
            <AdminNavbar />
            <div className="mt-8 container mx-auto">
                <div className="text-primary font-bold text-6xl">EDIT MENU</div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
                    {menu &&
                        menu.map((item) => <MenuItemCard key={item.id} item={item} />)}
                </div>
                {/* <div className="text-primary font-bold text-6xl mt-16">
                    CUSTOMER FEEDBACK
                </div> */}
            </div>
        </>
    );
}
