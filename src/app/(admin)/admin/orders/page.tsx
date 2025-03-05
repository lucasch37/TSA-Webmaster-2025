import {AdminOrders} from "@/features/admin/components/admin-orders";
import {getAdminOrders} from "@/features/admin/actions/getAdminOrders";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Order Tickets | Admin Dashboard",
    description: "Restaurant-style order tickets ready to be fulfilled",
};

export default async function AdminOrdersPage(): Promise<React.JSX.Element> {
    const ordersRes = await getAdminOrders();
    const orders = ordersRes.data || [];

    const pendingCount = orders.filter((order) => !order.fulfilled).length;

    return (
        <div className="mt-8 pb-12 w-full max-w-full">
            <AdminOrders initialOrders={orders} />
        </div>
    );
}
