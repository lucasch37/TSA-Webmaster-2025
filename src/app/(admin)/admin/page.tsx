import {AdminMenuItemCard} from "@/features/admin/components/admin-menu-item-card";
import {getMenu} from "@/features/menu/actions/getMenu";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Admin Dashboard | Sprout & About",
    description: "Manage menu items and view customer feedback",
};

const sections = ["appetizer", "entree", "side", "dessert"];

export default async function AdminPage(): Promise<React.JSX.Element> {
    const menuRes = await getMenu();
    const menu = menuRes.data;

    return (
        <div className="mt-8 container mx-auto">
            {sections.map((section) => (
                <div key={section} id={section} className="mt-12">
                    <div className="text-primary font-bold text-4xl mb-6">
                        {section.toUpperCase()}S
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                        {menu &&
                            menu
                                .filter((item) => item.type.toLowerCase() === section)
                                .map((item) => (
                                    <AdminMenuItemCard key={item.id} item={item} />
                                ))}
                    </div>
                </div>
            ))}
            {/* <div className="text-primary font-bold text-6xl mt-16">
                    CUSTOMER FEEDBACK
                </div> */}
        </div>
    );
}
