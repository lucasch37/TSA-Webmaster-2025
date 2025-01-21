import React from "react";
import {Metadata} from "next";
import AdminClient from "@/components/admin/admin-client";

export const metadata: Metadata = {
    title: "Admin Dashboard | Sprout & About",
    description: "Manage menu items and view customer feedback",
};

export default function AdminPage(): React.JSX.Element {
    return <AdminClient />;
}
