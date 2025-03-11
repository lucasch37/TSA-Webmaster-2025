import React from "react";
import {AdminDashboard} from "@/features/admin/components/admin-dashboard";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Overview of restaurant performance and sustainability metrics",
};

const AdminDashboardPage = (): React.JSX.Element => {
    return (
        <div className="container py-10">
            <AdminDashboard />
        </div>
    );
};

export default AdminDashboardPage;
