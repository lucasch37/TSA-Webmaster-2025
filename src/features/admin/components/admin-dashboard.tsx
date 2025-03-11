"use client";

import React, {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {RefreshCw} from "lucide-react";
import {
    CustomerRetentionChart,
    PeakOrderTimesChart,
    AverageOrderValueChart,
    RevenueChart,
} from "./dashboard-charts";
import {createClient} from "@/lib/supabase/client";

type DashboardMetrics = {
    topSellingDishes: {name: string; quantity: number}[];
    averageOrderValues: {date: string; value: number}[];
    customerRetention: {label: string; value: number}[];
    peakOrderTimes: {hour: number; orders: number}[];
    revenue: {date: string; amount: number}[];
    totalCustomers: number;
};

const emptyMetrics: DashboardMetrics = {
    topSellingDishes: [],
    averageOrderValues: [],
    customerRetention: [],
    peakOrderTimes: [],
    revenue: [],
    totalCustomers: 0,
};

interface AdminDashboardProps {
    initialMetrics?: DashboardMetrics;
}

interface Order {
    created_at: string;
    total_amount: number;
    user_id?: string;
    fulfilled_at?: string | null;
}

interface MenuItem {
    name: string;
}

interface TopDishItem {
    menu_item_id: number;
    quantity: number;
    menu_items: MenuItem | {name: string} | Array<{name: string}> | null;
}

export const AdminDashboard = ({
    initialMetrics = emptyMetrics,
}: AdminDashboardProps): React.JSX.Element => {
    const [metrics, setMetrics] = useState<DashboardMetrics>(initialMetrics);
    const [isRefreshing, setIsRefreshing] = useState(false);

    async function fetchDashboardMetrics(): Promise<{
        success: boolean;
        message: string;
        data?: DashboardMetrics;
    }> {
        try {
            const supabase = createClient();

            const {count: totalCustomers, error: usersError} = await supabase
                .from("users")
                .select("*", {count: "exact", head: true});

            if (usersError) {
                console.error("Error fetching users count:", usersError);
                return {success: false, message: "Failed to fetch users count"};
            }

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90);
            const sinceDate = thirtyDaysAgo.toISOString();

            const {data: orders, error: ordersError} = await supabase
                .from("orders")
                .select("created_at, total_amount, user_id")
                .gte("created_at", sinceDate);

            if (ordersError) {
                console.error("Error fetching orders:", ordersError);
                return {success: false, message: "Failed to fetch orders"};
            }

            const {data: topDishes, error: topDishesError} = await supabase
                .from("order_items")
                .select(
                    `
                    menu_item_id,
                    quantity,
                    menu_items(name)
                `,
                )
                .limit(10);

            if (topDishesError) {
                console.error("Error fetching top dishes:", topDishesError);
                return {success: false, message: "Failed to fetch top dishes"};
            }

            const dishQuantities: Record<
                number,
                {id: number; name: string; quantity: number}
            > = {};

            if (topDishes) {
                (topDishes as TopDishItem[]).forEach((item) => {
                    const menuItemId = item.menu_item_id;
                    if (!menuItemId) {
                        return;
                    }

                    let itemName = "Unknown";
                    if (item.menu_items) {
                        if (Array.isArray(item.menu_items) && item.menu_items[0]?.name) {
                            itemName = item.menu_items[0].name;
                        } else if (
                            typeof item.menu_items === "object" &&
                            "name" in item.menu_items &&
                            item.menu_items.name
                        ) {
                            itemName = item.menu_items.name;
                        }
                    }

                    if (!dishQuantities[menuItemId]) {
                        dishQuantities[menuItemId] = {
                            id: menuItemId,
                            name: itemName,
                            quantity: 0,
                        };
                    }

                    dishQuantities[menuItemId].quantity += item.quantity || 0;
                });
            }

            const topSellingDishes = Object.values(dishQuantities)
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 10)
                .map((dish) => ({
                    name: dish.name,
                    quantity: dish.quantity,
                }));

            const ordersByDate: Record<string, {total: number; count: number}> = {};
            const revenueByDate: Record<string, number> = {};

            const typedOrders = orders as Order[];

            typedOrders.forEach((order) => {
                const date = new Date(order.created_at).toISOString().split("T")[0];

                if (!ordersByDate[date]) {
                    ordersByDate[date] = {total: 0, count: 0};
                }
                ordersByDate[date].total += order.total_amount / 100;
                ordersByDate[date].count += 1;

                if (!revenueByDate[date]) {
                    revenueByDate[date] = 0;
                }
                revenueByDate[date] += order.total_amount / 100;
            });

            const averageOrderValues = Object.keys(ordersByDate)
                .map((date) => ({
                    date,
                    value: ordersByDate[date].total / ordersByDate[date].count,
                }))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            const revenue = Object.keys(revenueByDate)
                .map((date) => ({
                    date,
                    amount: revenueByDate[date],
                }))
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            const customerOrderCounts: Record<string, number> = {};

            typedOrders.forEach((order) => {
                if (order.user_id) {
                    customerOrderCounts[order.user_id] =
                        (customerOrderCounts[order.user_id] || 0) + 1;
                }
            });

            const returningCustomers = Object.values(customerOrderCounts).filter(
                (count) => count > 1,
            ).length;
            const newCustomers = Object.values(customerOrderCounts).filter(
                (count) => count === 1,
            ).length;

            const customerRetention = [
                {label: "Returning Customers", value: returningCustomers},
                {label: "New Customers", value: newCustomers},
            ];

            const orderTimes = typedOrders.map((order) => {
                const date = new Date(order.created_at);
                return date.getHours();
            });

            const peakOrderTimes = Array.from({length: 24}, (_, i) => i).map((hour) => ({
                hour,
                orders: orderTimes.filter((time) => time === hour).length,
            }));

            return {
                success: true,
                message: "Dashboard metrics fetched successfully",
                data: {
                    topSellingDishes,
                    averageOrderValues,
                    customerRetention,
                    peakOrderTimes,
                    revenue,
                    totalCustomers: totalCustomers || 0,
                },
            };
        } catch (error) {
            console.error("Error fetching dashboard metrics:", error);
            return {success: false, message: "An unexpected error occurred"};
        }
    }

    useEffect(() => {
        if (
            !initialMetrics.averageOrderValues.length &&
            !initialMetrics.customerRetention.length &&
            !initialMetrics.peakOrderTimes.length
        ) {
            refreshMetrics();
        }
    }, [initialMetrics]);

    const refreshMetrics = async (): Promise<void> => {
        try {
            setIsRefreshing(true);
            const response = await fetchDashboardMetrics();

            if (response.success && response.data) {
                setMetrics(response.data);
            } else {
                console.error("Failed to refresh metrics:", response.message);
            }
        } catch (error) {
            console.error("Failed to refresh metrics:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const averageOrderValue =
        metrics.averageOrderValues.length > 0
            ? metrics.averageOrderValues.reduce(
                  (sum: number, item) => sum + item.value,
                  0,
              ) / metrics.averageOrderValues.length
            : 0;

    const totalRevenue = metrics.revenue.reduce(
        (sum: number, item) => sum + item.amount,
        0,
    );

    const peakHour =
        metrics.peakOrderTimes.length > 0
            ? metrics.peakOrderTimes.reduce(
                  (
                      max: {hour: number; orders: number},
                      current: {hour: number; orders: number},
                  ) => (current.orders > max.orders ? current : max),
                  {hour: 0, orders: 0},
              )
            : {hour: 0, orders: 0};

    return (
        <div className="w-full max-w-[1600px] mx-auto px-4 space-y-8">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <Button
                    onClick={refreshMetrics}
                    size="sm"
                    disabled={isRefreshing}
                    className="ml-auto"
                >
                    {isRefreshing ? (
                        <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Refreshing...
                        </>
                    ) : (
                        <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Refresh Data
                        </>
                    )}
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Customers
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{metrics.totalCustomers}</div>
                        <p className="text-xs text-muted-foreground">
                            Total registered users
                        </p>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Average Order Value
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${averageOrderValue.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">Per order</p>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Revenue
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalRevenue.toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">Last 90 days</p>
                    </CardContent>
                </Card>

                <Card className="w-full">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{peakHour.hour}:00</div>
                        <p className="text-xs text-muted-foreground">
                            {peakHour.orders} orders
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full">
                    <RevenueChart revenue={metrics.revenue} />
                </div>
                <div className="w-full">
                    <AverageOrderValueChart
                        averageOrderValues={metrics.averageOrderValues}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="w-full">
                    <CustomerRetentionChart
                        customerRetention={metrics.customerRetention}
                    />
                </div>
                <div className="w-full">
                    <PeakOrderTimesChart peakOrderTimes={metrics.peakOrderTimes} />
                </div>
            </div>
        </div>
    );
};
