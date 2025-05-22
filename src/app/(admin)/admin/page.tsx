import React from "react";
import {AdminDashboard} from "@/features/admin/components/admin-dashboard";
import {Metadata} from "next";
import nextDynamic from "next/dynamic";

const AdminPageClientFeatures = nextDynamic(
    () => import("@/tours/admin/AdminPageClientFeatures"),
    {
        ssr: false,
    },
);

export const dynamic = "force-dynamic";

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
