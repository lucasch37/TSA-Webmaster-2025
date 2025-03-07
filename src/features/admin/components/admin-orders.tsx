"use client";

import React, {useState} from "react";
import {Order} from "@/types";
import {updateOrderFulfilled} from "@/features/admin/actions/updateOrderFulfilled";
import {format} from "date-fns";
import {Check, Search, PlusCircle, MinusCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

interface AdminOrdersProps {
    initialOrders: Order[];
}

export function AdminOrders({initialOrders}: AdminOrdersProps): React.JSX.Element {
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"pending" | "fulfilled">("pending");

    const getFilteredOrders = (fulfilled: boolean): Order[] => {
        return orders
            .filter(
                (order) =>
                    order.fulfilled === fulfilled &&
                    (searchQuery === "" ||
                        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        order.customer_name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        order.customer_email
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        (order.order_number &&
                            order.order_number.toString().includes(searchQuery))),
            )
            .sort(
                (a, b) =>
                    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
            );
    };

    const pendingOrders = getFilteredOrders(false);
    const fulfilledOrders = getFilteredOrders(true);

    const updateOrderStatus = async (id: string, fulfilled: boolean): Promise<void> => {
        const response = await updateOrderFulfilled(id, fulfilled);

        if (response.success) {
            setOrders(
                orders.map((order) => (order.id === id ? {...order, fulfilled} : order)),
            );
        }
    };

    const formatOrderDate = (dateString: string): string => {
        return format(new Date(dateString), "MMM d, h:mm a");
    };

    return (
        <div className="space-y-6 px-4 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-primary font-bold text-4xl">ORDER TICKETS</h1>
                {pendingOrders.length > 0 && activeTab === "pending" && (
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {pendingOrders.length} pending{" "}
                        {pendingOrders.length === 1 ? "order" : "orders"}
                    </div>
                )}
            </div>

            <Tabs
                defaultValue="pending"
                className="w-full"
                onValueChange={(value) => setActiveTab(value as "pending" | "fulfilled")}
            >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <TabsList>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
                    </TabsList>

                    <div className="relative self-end">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-8 w-full sm:w-[250px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <TabsContent value="pending" className="border-none p-0 mt-4">
                    <Card className="border shadow-sm">
                        <CardHeader className="px-6">
                            <CardTitle>Current Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-auto px-4 pb-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b-2">
                                            <TableHead className="py-4 font-semibold">
                                                Order #
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Date
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Customer
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Email
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Items
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold text-right">
                                                Total
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold text-right">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {pendingOrders.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={7}
                                                    className="text-center py-8 text-muted-foreground"
                                                >
                                                    No pending orders found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            pendingOrders.map((order) => (
                                                <TableRow
                                                    key={order.id}
                                                    className="hover:bg-muted/40"
                                                >
                                                    <TableCell className="font-medium py-4">
                                                        {order.order_number
                                                            ? `#${order.order_number}`
                                                            : order.id.slice(0, 8)}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        {formatOrderDate(
                                                            order.created_at,
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        {order.customer_name}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        {order.customer_email}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        <div className="max-w-[250px]">
                                                            {order.order_items.map(
                                                                (item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="text-sm mb-1"
                                                                    >
                                                                        <div className="flex justify-between">
                                                                            <span>
                                                                                {
                                                                                    item.quantity
                                                                                }
                                                                                ×{" "}
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        {item.addedItems
                                                                            ?.length >
                                                                            0 && (
                                                                            <div className="pl-4 text-xs text-green-600 mt-1">
                                                                                {item.addedItems.map(
                                                                                    (
                                                                                        added,
                                                                                        idx,
                                                                                    ) => (
                                                                                        <div
                                                                                            key={`${index}-added-${idx}`}
                                                                                            className="flex items-center"
                                                                                        >
                                                                                            <PlusCircle className="h-3 w-3 mr-1" />{" "}
                                                                                            {
                                                                                                added
                                                                                            }
                                                                                        </div>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        {item.removedItems
                                                                            ?.length >
                                                                            0 && (
                                                                            <div className="pl-4 text-xs text-red-600 mt-1">
                                                                                {item.removedItems.map(
                                                                                    (
                                                                                        removed,
                                                                                        idx,
                                                                                    ) => (
                                                                                        <div
                                                                                            key={`${index}-removed-${idx}`}
                                                                                            className="flex items-center"
                                                                                        >
                                                                                            <MinusCircle className="h-3 w-3 mr-1" />{" "}
                                                                                            {
                                                                                                removed
                                                                                            }
                                                                                        </div>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-4 text-right font-medium">
                                                        $
                                                        {(
                                                            order.total_amount / 100
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="py-4 text-right">
                                                        <Button
                                                            size="sm"
                                                            onClick={() =>
                                                                updateOrderStatus(
                                                                    order.id,
                                                                    true,
                                                                )
                                                            }
                                                        >
                                                            <Check className="mr-2 h-4 w-4" />
                                                            Fulfill
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t p-4">
                            <div className="text-xs text-muted-foreground">
                                Showing {pendingOrders.length} pending orders
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="fulfilled" className="border-none p-0 mt-4">
                    <Card className="border shadow-sm">
                        <CardHeader className="px-6">
                            <CardTitle>Fulfilled Orders</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-auto px-4 pb-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-b-2">
                                            <TableHead className="py-4 font-semibold">
                                                Order #
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Date
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Customer
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Email
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold">
                                                Items
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold text-right">
                                                Total
                                            </TableHead>
                                            <TableHead className="py-4 font-semibold text-right">
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {fulfilledOrders.length === 0 ? (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={7}
                                                    className="text-center py-8 text-muted-foreground"
                                                >
                                                    No fulfilled orders found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            fulfilledOrders.map((order) => (
                                                <TableRow
                                                    key={order.id}
                                                    className="hover:bg-muted/40"
                                                >
                                                    <TableCell className="font-medium py-4">
                                                        {order.order_number
                                                            ? `#${order.order_number}`
                                                            : order.id.slice(0, 8)}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        {formatOrderDate(
                                                            order.created_at,
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        {order.customer_name}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        {order.customer_email}
                                                    </TableCell>
                                                    <TableCell className="py-4">
                                                        <div className="max-w-[250px]">
                                                            {order.order_items.map(
                                                                (item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="text-sm mb-1"
                                                                    >
                                                                        <div className="flex justify-between">
                                                                            <span>
                                                                                {
                                                                                    item.quantity
                                                                                }
                                                                                ×{" "}
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        {item.addedItems
                                                                            ?.length >
                                                                            0 && (
                                                                            <div className="pl-4 text-xs text-green-600 mt-1">
                                                                                {item.addedItems.map(
                                                                                    (
                                                                                        added,
                                                                                        idx,
                                                                                    ) => (
                                                                                        <div
                                                                                            key={`${index}-added-${idx}`}
                                                                                            className="flex items-center"
                                                                                        >
                                                                                            <PlusCircle className="h-3 w-3 mr-1" />{" "}
                                                                                            {
                                                                                                added
                                                                                            }
                                                                                        </div>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        {item.removedItems
                                                                            ?.length >
                                                                            0 && (
                                                                            <div className="pl-4 text-xs text-red-600 mt-1">
                                                                                {item.removedItems.map(
                                                                                    (
                                                                                        removed,
                                                                                        idx,
                                                                                    ) => (
                                                                                        <div
                                                                                            key={`${index}-removed-${idx}`}
                                                                                            className="flex items-center"
                                                                                        >
                                                                                            <MinusCircle className="h-3 w-3 mr-1" />{" "}
                                                                                            {
                                                                                                removed
                                                                                            }
                                                                                        </div>
                                                                                    ),
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="py-4 text-right font-medium">
                                                        $
                                                        {(
                                                            order.total_amount / 100
                                                        ).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="py-4 text-right">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() =>
                                                                updateOrderStatus(
                                                                    order.id,
                                                                    false,
                                                                )
                                                            }
                                                        >
                                                            Mark as Pending
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                        <CardFooter className="border-t p-4">
                            <div className="text-xs text-muted-foreground">
                                Showing {fulfilledOrders.length} fulfilled orders
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
