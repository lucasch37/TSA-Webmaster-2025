import React from "react";
import {AdminDashboard} from "@/features/admin/components/admin-dashboard";
import {Metadata} from "next";
import dynamic from "next/dynamic";
const AdminPageClientFeatures = dynamic(
    () => import("@/tours/admin/AdminPageClientFeatures"),
    {
        ssr: false,
    },
);

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Overview of restaurant performance and sustainability metrics",
};

const AdminDashboardPage = (): React.JSX.Element => {
    return (
        <div className="container py-10">
            <AdminPageClientFeatures />
            <AdminDashboard />
        </div>
    );
};

export default AdminDashboardPage;
