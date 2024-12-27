import React from "react";
import AdminView from "@/app/admin/adminView";
import {getMenu} from "@/lib/actions/getMenu";
export default async function Home(): Promise<React.JSX.Element> {
    const menu = await getMenu();
    return (
        <div>
            <AdminView menu={menu.data} />
        </div>
    );
}
