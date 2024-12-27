"use client";

import React from "react";
import {MenuItem} from "@/types";
import {MenuItemCard} from "@/components/custom/menu-item-card";

interface AdminViewProps {
    menu: MenuItem[] | undefined;
}

export default function AdminView({menu}: AdminViewProps): React.JSX.Element {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto p-4">
                {menu && menu.map((item) => <MenuItemCard key={item.id} item={item} />)}
            </div>
        </div>
    );
}
