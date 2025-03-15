"use client";

import {Button} from "@/components/ui/button";
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
import {updateOrderFulfilled} from "@/features/admin/actions/updateOrderFulfilled";
import {Order} from "@/types";
import {format} from "date-fns";
import {Check, MinusCircle, PlusCircle, Search} from "lucide-react";
import React, {useState} from "react";
import {toast} from "sonner";

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
            toast.success("Order status updated successfully");
        } else {
            toast.error(response.message);
        }
    };

    const formatOrderDate = (dateString: string): string => {
        return format(new Date(dateString), "MMM d, h:mm a");
    };

    return (
        <div className="container">
            <div className="flex items-center justify-between">
                <h1 className="text-primary font-bold text-6xl">ORDERS</h1>
                {pendingOrders.length > 0 && activeTab === "pending" && (
                    <div className="rounded-full border px-3 py-1 text-primary text-sm font-medium hidden md:flex">
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 mt-8">
                    <TabsList className="w-[200px] md:w-[600px] grid grid-cols-2">
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="fulfilled">Fulfilled</TabsTrigger>
                    </TabsList>

                    <div className="relative md:self-end">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                        <Input
                            type="search"
                            placeholder="Search orders..."
                            className="pl-8 w-full sm:w-[250px] rounded-lg text-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <TabsContent value="pending" className="border-none p-0 mt-4 ">
                    <div className="p-0">
                        <div className="overflow-auto border rounded-xl shadow-lg">
                            <Table>
                                <TableHeader className="bg-primary text-white">
                                    <TableRow className="border-b-2">
                                        <TableHead className="py-4 pl-4 font-semibold whitespace-nowrap">
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
                                        <TableHead className="py-4 pr-8 font-semibold text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-primary font-medium bg-background/40 shadow-md">
                                    {pendingOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="text-center py-8"
                                            >
                                                No pending orders found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        pendingOrders.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium py-4 pl-4">
                                                    {order.order_number
                                                        ? `#${order.order_number}`
                                                        : order.id.slice(0, 8)}
                                                </TableCell>
                                                <TableCell className="py-4 whitespace-nowrap">
                                                    {formatOrderDate(order.created_at)}
                                                </TableCell>
                                                <TableCell className="py-4 whitespace-nowrap">
                                                    {order.customer_name}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    {order.customer_email}
                                                </TableCell>
                                                <TableCell className="py-4 whitespace-nowrap">
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
                                                                            × {item.name}
                                                                        </span>
                                                                    </div>
                                                                    {item.added_items
                                                                        ?.length > 0 && (
                                                                        <div className="pl-4 text-xs text-green-600 mt-1">
                                                                            {item.added_items.map(
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
                                                                    {item.removed_items
                                                                        ?.length > 0 && (
                                                                        <div className="pl-4 text-xs text-red-600 mt-1">
                                                                            {item.removed_items.map(
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
                                                    {(order.total_amount / 100).toFixed(
                                                        2,
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4 text-right pr-4">
                                                    <Button
                                                        size="sm"
                                                        variant={"outline"}
                                                        onClick={() =>
                                                            updateOrderStatus(
                                                                order.id,
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        <Check size={15} />
                                                        Fulfill
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <div className="text-sm mt-4 text-primary">
                        Showing {pendingOrders.length} pending orders
                    </div>
                </TabsContent>

                <TabsContent value="fulfilled" className="border-none p-0 mt-4">
                    <div className="p-0">
                        <div className="border rounded-xl overflow-hidden shadow-lg">
                            <Table>
                                <TableHeader className="bg-primary text-white">
                                    <TableRow className="border-b-2">
                                        <TableHead className="py-4 pl-4 font-semibold whitespace-nowrap">
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
                                        <TableHead className="py-4 pr-8 font-semibold text-right">
                                            Action
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-primary bg-background/40 shadow-md">
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
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium py-4 pl-4">
                                                    {order.order_number
                                                        ? `#${order.order_number}`
                                                        : order.id.slice(0, 8)}
                                                </TableCell>
                                                <TableCell className="py-4 whitespace-nowrap">
                                                    {formatOrderDate(order.created_at)}
                                                </TableCell>
                                                <TableCell className="py-4 whitespace-nowrap">
                                                    {order.customer_name}
                                                </TableCell>
                                                <TableCell className="py-4">
                                                    {order.customer_email}
                                                </TableCell>
                                                <TableCell className="py-4 whitespace-nowrap">
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
                                                                            × {item.name}
                                                                        </span>
                                                                    </div>
                                                                    {item.added_items
                                                                        ?.length > 0 && (
                                                                        <div className="pl-4 text-xs text-green-600 mt-1">
                                                                            {item.added_items.map(
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
                                                                    {item.removed_items
                                                                        ?.length > 0 && (
                                                                        <div className="pl-4 text-xs text-red-600 mt-1">
                                                                            {item.removed_items.map(
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
                                                    {(order.total_amount / 100).toFixed(
                                                        2,
                                                    )}
                                                </TableCell>
                                                <TableCell className="py-4 pr-4 text-right">
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
                    </div>
                    <div className="text-sm mt-4 text-primary">
                        Showing {fulfilledOrders.length} fulfilled orders
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
