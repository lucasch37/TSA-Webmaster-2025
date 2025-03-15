"use client";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import cancelReservation from "@/features/reservations/actions/cancelReservation";
import CancelReservation from "@/features/reservations/reserve/cancel-reservation";
import {UserCard} from "@/features/user/components/user-card";
import {MenuItem, Order, Reservation} from "@/types";
import {User} from "@supabase/supabase-js";
import {User as UserData} from "@/types";
import {IconInfoCircleFilled} from "@tabler/icons-react";
import {format} from "date-fns";
import {Leaf, ListCheck, LogOut, UserCog} from "lucide-react";
import Link from "next/link";
import {motion} from "motion/react";
import {AccountChart} from "./account-chart";

type Props = {
    logout: () => void;
    user: User;
    userData: UserData;
    orders: Order[];
    reservations: Reservation[];
    menu: MenuItem[];
};

const Account = ({
    logout,
    user,
    userData,
    orders,
    reservations,
    menu,
}: Props): React.JSX.Element => {
    const calculateEmissionsReduced = (): number => {
        try {
            const allItemsOrder = orders.map((order) => order.order_items).flat();
            const emissionsReduced = allItemsOrder.reduce((acc, item) => {
                const menuItem = menu.find(
                    (menuItem) => menuItem.id === item.menu_item_id,
                );
                if (!menuItem) {
                    return acc;
                }
                return acc + menuItem.emissions.emissions_saved * item.quantity;
            }, 0);
            return emissionsReduced;
        } catch {
            return 0;
        }
    };

    return (
        <div className="container mx-auto mt-12">
            <div className="flex gap-4 md:flex-row flex-col justify-center md:justify-between items-center border-b-2 pb-4">
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
            <div className="flex md:flex-row md:items-start items-center flex-col gap-8 relative mt-6">
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70}}
                    className="flex flex-col"
                >
                    <UserCard
                        name={user?.user_metadata.name}
                        isAdmin={userData?.is_admin || false}
                        createdAt={new Date(user?.created_at)}
                    />
                    <div className="rounded-lg border p-4 w-[300px] mt-8 text-primary shadow-md bg-background/40">
                        <div>
                            <div className="font-semibold text-xl">Your Rewards</div>
                        </div>
                        <div className="text-3xl font-bold flex gap-2 items-center my-3">
                            <Leaf size={24} />
                            {userData?.sustainability_score || 0}{" "}
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <span className="flex gap-1.5 items-center">
                                        <IconInfoCircleFilled size={19} />{" "}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[300px] text-center">
                                    Sustainability points are earned from your orders. You
                                    can redeem these points for discounts on your next
                                    order in multiples of 25, for one cent each.
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <p className="text-sm">
                            Sustainability points earned from your orders.
                        </p>
                    </div>
                    <div className="rounded-lg border p-4 w-[300px] mt-8 text-primary shadow-md bg-background/40">
                        <div className="flex gap-2 items-center">
                            <div className="font-semibold text-lg">
                                Sustainability Impact
                            </div>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <IconInfoCircleFilled size={19} />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[300px] text-center">
                                    This total was calculated based on our in-depth
                                    research on carbon emissions. To learn more about how
                                    we calculate this, view our sustainability stats
                                    listed on each menu item page.
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className="mt-8">
                            <AccountChart emissionsSaved={calculateEmissionsReduced()} />
                        </div>
                        <div className="flex flex-col items-center border rounded-lg px-2 justify-center py-2 mt-4">
                            <div className="text-sm">That's equivalent to:</div>
                            <div className="font-bold text-lg">
                                {(calculateEmissionsReduced() / 0.404).toFixed(1)} miles
                                not driven
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, y: 30}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{type: "spring", stiffness: 70, delay: 0.1}}
                    className="flex flex-col flex-1"
                >
                    <div className="text-primary rounded-lg flex flex-col">
                        <Tabs defaultValue="orders">
                            <TabsList className="w-full grid grid-cols-2">
                                <TabsTrigger value="orders">Past Orders</TabsTrigger>
                                <TabsTrigger value="reservations">
                                    Reservations
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="reservations">
                                <div className="mt-8">
                                    <div className="space-y-4">
                                        {orders.length === 0 ? (
                                            <p className="text-primary">
                                                No reservations
                                            </p>
                                        ) : (
                                            reservations.map(
                                                (reservation: Reservation) => (
                                                    <div
                                                        key={reservation.id}
                                                        className="p-4 border rounded-lg shadow-md bg-background/40"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <p className="font-semibold text-lg">
                                                                    {format(
                                                                        new Date(
                                                                            reservation.date,
                                                                        ),
                                                                        "MMMM d, yyyy",
                                                                    )}
                                                                    {", "}
                                                                    {reservation.time}
                                                                </p>
                                                            </div>
                                                            <CancelReservation
                                                                id={reservation.id}
                                                                cancelReservation={
                                                                    cancelReservation
                                                                }
                                                            />
                                                        </div>
                                                        <div className="mt-2 flex gap-1 text-sm">
                                                            <div className="font-medium">
                                                                Tables:{" "}
                                                            </div>
                                                            {reservation.tables.map(
                                                                (table, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="flex flex-col"
                                                                    >
                                                                        <div>
                                                                            Table {table}
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                        <div className="mt-2 flex gap-1 text-sm">
                                                            <div className="font-medium">
                                                                Guests:{" "}
                                                            </div>
                                                            {reservation.guests}
                                                        </div>
                                                    </div>
                                                ),
                                            )
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="orders">
                                <div className="mt-8 w-full">
                                    <div className="space-y-4 w-[300px] md:w-full">
                                        {orders.length === 0 ? (
                                            <p className="text-primary">No orders yet</p>
                                        ) : (
                                            orders.map((order: Order) => (
                                                <div
                                                    key={order.id}
                                                    className="p-4 border rounded-lg shadow-md bg-background/40"
                                                >
                                                    {/* Order header with date and total */}
                                                    <div className="flex md:flex-row flex-col justify-center md:justify-between items-start mb-2">
                                                        <div>
                                                            <div className="flex gap-2 items-center">
                                                                <div className="font-semibold text-lg">
                                                                    Order #
                                                                    {order.order_number}
                                                                </div>
                                                                <p className=" text-sm md:text-base">
                                                                    {format(
                                                                        new Date(
                                                                            order.created_at,
                                                                        ),
                                                                        "MMMM d, yyyy",
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <p className="text-base font-medium my-3 md:my-0 md:mt-1">
                                                                {order.order_items.reduce(
                                                                    (sum, item) =>
                                                                        sum +
                                                                        item.quantity,
                                                                    0,
                                                                )}{" "}
                                                                item
                                                                {order.order_items.reduce(
                                                                    (sum, item) =>
                                                                        sum +
                                                                        item.quantity,
                                                                    0,
                                                                ) > 1
                                                                    ? "s"
                                                                    : ""}
                                                            </p>
                                                        </div>
                                                        <div className="md:text-right">
                                                            <p className="font-semibold text-lg">
                                                                $
                                                                {(
                                                                    order.total_amount /
                                                                    100
                                                                ).toFixed(2)}
                                                            </p>
                                                            <p className="text-sm text-primary flex items-center my-3 md:my-0 md:mt-1">
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
                                                        {order.order_items.map(
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
                                                                            x {item.name}
                                                                        </span>
                                                                        <span>
                                                                            $
                                                                            {item.price.toFixed(
                                                                                2,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                    {/* Item customizations */}
                                                                    {(item.added_items
                                                                        ?.length > 0 ||
                                                                        item.removed_items
                                                                            ?.length >
                                                                            0) && (
                                                                        <div className="text-xs ml-4">
                                                                            {item
                                                                                .added_items
                                                                                ?.length >
                                                                                0 && (
                                                                                <div>
                                                                                    Added:{" "}
                                                                                    {item.added_items.join(
                                                                                        ", ",
                                                                                    )}
                                                                                </div>
                                                                            )}
                                                                            {item
                                                                                .removed_items
                                                                                ?.length >
                                                                                0 && (
                                                                                <div>
                                                                                    Removed:{" "}
                                                                                    {item.removed_items.join(
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
                                                    <Link
                                                        href={`/checkout/success?session_id=${order.stripe_session_id}`}
                                                        className="flex justify-end"
                                                    >
                                                        <Button className="mt-4 h-8 md:w-fit w-full">
                                                            <ListCheck size={15} /> View
                                                            Summary
                                                        </Button>
                                                    </Link>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Account;
