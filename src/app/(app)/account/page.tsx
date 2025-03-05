import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {logoutUser} from "@/features/user/actions/auth";
import {getUser} from "@/features/user/actions/getUser";
import {getUserData, getUserOrders} from "@/features/checkout/actions/orders";
import {Order} from "@/types";
import {Leaf, LogOut, UserCog} from "lucide-react";
import {Metadata} from "next";
import Link from "next/link";
import {redirect} from "next/navigation";
import React from "react";
import {UserCard} from "@/features/user/components/user-card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {format} from "date-fns";

export const metadata: Metadata = {
    title: "Account | Sprout & About",
    description: "View your order history and sustainability impact",
};

export default async function AccountPage(): Promise<React.JSX.Element> {
    const user = await getUser();
    if (!user) {
        throw redirect("/login");
    }
    const [userData, orders] = await Promise.all([getUserData(), getUserOrders()]);

    const logout = async (): Promise<void> => {
        "use server";
        const logoutRes = await logoutUser();
        if (logoutRes.success) {
            redirect("/");
        }
    };

    return (
        <div>
            <div className="container mx-auto mt-12">
                <div className="flex justify-between items-center border-b-2 pb-4">
                    <div className="font-bold text-primary text-6xl">ACCOUNT</div>
                    <div className="flex gap-4">
                        <Link href={"/admin"}>
                            <Button>
                                <UserCog size={20} />
                                Admin Portal
                            </Button>
                        </Link>
                        <form action={logout}>
                            <Button>
                                <LogOut size={20} />
                                Logout
                            </Button>
                        </form>
                    </div>
                </div>
                <div className="flex gap-8 relative mt-6">
                    <div className="flex flex-col">
                        <UserCard
                            name={user?.user_metadata.name}
                            isAdmin={userData?.is_admin || false}
                            createdAt={new Date(user?.created_at)}
                        />
                        <div className="rounded-lg border p-4 w-[300px] mt-8 text-primary">
                            <div>
                                <div className="font-semibold text-xl">
                                    Your Sustainability Impact
                                </div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold flex gap-2 items-center text-primary my-3">
                                    <Leaf size={30} />
                                    {userData?.sustainability_score || 0}
                                </div>
                                <p className="text-sm">
                                    Sustainability points earned from your orders
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="text-primary rounded-lg bg-background  flex flex-col">
                            <Tabs defaultValue="orders">
                                <TabsList className="w-full grid grid-cols-2">
                                    <TabsTrigger value="orders">Past Orders</TabsTrigger>
                                    <TabsTrigger value="reservations">
                                        Reservations
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="orders">
                                    <div className="mt-8">
                                        <div className="space-y-4">
                                            {orders.length === 0 ? (
                                                <p className="text-gray-500">
                                                    No orders yet
                                                </p>
                                            ) : (
                                                orders.map((order: Order) => (
                                                    <div
                                                        key={order.id}
                                                        className="p-4 border rounded-lg"
                                                    >
                                                        {/* Order header with date and total */}
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <p className="font-semibold text-lg">
                                                                    {format(
                                                                        new Date(
                                                                            order.created_at,
                                                                        ),
                                                                        "MMMM d, yyyy",
                                                                    )}
                                                                </p>
                                                                <p className="text-base font-medium mt-1">
                                                                    {order.items.reduce(
                                                                        (sum, item) =>
                                                                            sum +
                                                                            item.quantity,
                                                                        0,
                                                                    )}{" "}
                                                                    item
                                                                    {order.items.reduce(
                                                                        (sum, item) =>
                                                                            sum +
                                                                            item.quantity,
                                                                        0,
                                                                    ) > 1
                                                                        ? "s"
                                                                        : ""}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-semibold text-lg">
                                                                    $
                                                                    {(
                                                                        order.total_amount /
                                                                        100
                                                                    ).toFixed(2)}
                                                                </p>
                                                                <p className="text-sm text-primary flex items-center mt-1">
                                                                    +{" "}
                                                                    <Leaf
                                                                        size={16}
                                                                        className="mx-1"
                                                                    />{" "}
                                                                    {
                                                                        order.sustainability_score
                                                                    }{" "}
                                                                    points
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {/* Order items list */}
                                                        <div className="space-y-1 mt-2">
                                                            {order.items.map(
                                                                (item, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex flex-col text-sm pb-2 last:pb-0"
                                                                    >
                                                                        {/* Item name and price */}
                                                                        <div className="flex justify-between">
                                                                            <span>
                                                                                {
                                                                                    item.quantity
                                                                                }
                                                                                x{" "}
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </span>
                                                                            <span>
                                                                                $
                                                                                {item.price.toFixed(
                                                                                    2,
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        {/* Item customizations */}
                                                                        {(item.addedItems
                                                                            ?.length >
                                                                            0 ||
                                                                            item
                                                                                .removedItems
                                                                                ?.length >
                                                                                0) && (
                                                                            <div className="text-xs ml-4">
                                                                                {item
                                                                                    .addedItems
                                                                                    ?.length >
                                                                                    0 && (
                                                                                    <div>
                                                                                        Added:{" "}
                                                                                        {item.addedItems.join(
                                                                                            ", ",
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                                {item
                                                                                    .removedItems
                                                                                    ?.length >
                                                                                    0 && (
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
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
