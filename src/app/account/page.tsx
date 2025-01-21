import React from "react";
import {Metadata} from "next";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import {Leaf, ShoppingBag} from "lucide-react";
import {getUserStats, getUserOrders} from "@/lib/actions/orders";

export const metadata: Metadata = {
    title: "Account | Sprout & About",
    description: "View your order history and sustainability impact",
};

export default async function AccountPage(): Promise<React.JSX.Element> {
    const [stats, orders] = await Promise.all([getUserStats(), getUserOrders()]);

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-6">
                <div className="grid gap-6">
                    {/* Sustainability scorecard */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Leaf className="h-5 w-5 text-green-500" />
                                Your Sustainability Impact
                            </CardTitle>
                            <CardDescription>
                                Track your contribution to sustainability
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-green-500">
                                {stats?.sustainability_score || 0}
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Sustainability points earned from your orders
                            </p>
                        </CardContent>
                    </Card>

                    {/* Order history card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Order History
                            </CardTitle>
                            <CardDescription>
                                View your past orders and their details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {orders.length === 0 ? (
                                    <p className="text-gray-500">No orders yet</p>
                                ) : (
                                    orders.map((order) => (
                                        <Card key={order.id}>
                                            <CardContent className="p-4">
                                                {/* Order header with date and total */}
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <p className="font-medium">
                                                            Order on{" "}
                                                            {new Date(
                                                                order.created_at,
                                                            ).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {order.items.length} items
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">
                                                            $
                                                            {(
                                                                order.total_amount / 100
                                                            ).toFixed(2)}
                                                        </p>
                                                        <p className="text-sm text-green-500">
                                                            +{order.sustainability_score}{" "}
                                                            points
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Order items list */}
                                                <div className="space-y-1">
                                                    {order.items.map((item, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col text-sm border-b last:border-b-0 pb-2 last:pb-0"
                                                        >
                                                            {/* Item name and price */}
                                                            <div className="flex justify-between">
                                                                <span>
                                                                    {item.quantity}x{" "}
                                                                    {item.name}
                                                                </span>
                                                                <span>
                                                                    $
                                                                    {(
                                                                        item.amount / 100
                                                                    ).toFixed(2)}
                                                                </span>
                                                            </div>
                                                            {/* Item customizations */}
                                                            {(item.addedItems?.length >
                                                                0 ||
                                                                item.removedItems
                                                                    ?.length > 0) && (
                                                                <div className="text-xs text-gray-500 ml-4">
                                                                    {item.addedItems
                                                                        ?.length > 0 && (
                                                                        <div>
                                                                            Added:{" "}
                                                                            {item.addedItems.join(
                                                                                ", ",
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    {item.removedItems
                                                                        ?.length > 0 && (
                                                                        <div>
                                                                            Removed:{" "}
                                                                            {item.removedItems.join(
                                                                                ", ",
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
