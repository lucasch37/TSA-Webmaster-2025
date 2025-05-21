import {updateMenuItemHidden} from "@/features/admin/actions/updateMenuItemHidden";
import {AdminMenuItemCard} from "@/features/admin/components/admin-menu-item-card";
import {getMenu} from "@/features/menu/actions/getMenu";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Menu Editor | Admin Dashboard",
    description: "Edit the menu items",
};

const sections = ["appetizer", "entree", "side", "dessert"];

export default async function AdminPage(): Promise<React.JSX.Element> {
    const menuRes = await getMenu();
    const menu = menuRes.data;

    return (
        <div className="mt-12 container pb-12">
            <div className="text-6xl font-bold text-primary border-b-2 pb-6">
                MENU EDITOR
            </div>
            <div className="flex flex-col gap-10 mt-12">
                {sections.map((section) => (
                    <div key={section} id={section}>
                        <div className="text-primary font-bold text-4xl mb-6">
                            {section.toUpperCase()}S
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                            {menu &&
                                menu
                                    .filter((item) => item.type.toLowerCase() === section)
                                    .map((item) => (
                                        <AdminMenuItemCard
                                            key={item.id}
                                            item={item}
                                            updateMenuItemHidden={updateMenuItemHidden}
                                        />
                                    ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
