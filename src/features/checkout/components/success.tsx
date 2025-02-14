"use client";

import {OrderDetails} from "@/app/(app)/checkout/success/page";
import {Button} from "@/components/ui/button";
import {MenuItem} from "@/types";
import {ArrowLeft, CheckCircle, Leaf} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Map from "./map";

type Props = {
    details: OrderDetails;
    menu: MenuItem[];
};

const Success = ({details, menu}: Props): React.JSX.Element => {
    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    return (
        <div className="container mx-auto mt-8">
            <div className="grid grid-cols-2 gap-16">
                <div className="flex flex-col">
                    <div className="flex gap-4 items-center">
                        <CheckCircle className="w-20 h-20 text-primary" />
                        <div>
                            <h1 className="text-3xl font-semibold text-primary">
                                Order Confirmed
                            </h1>
                            <div className="text-primary text-lg">
                                Thank you {details.customerName.split(" ")[0]}!
                            </div>
                        </div>
                    </div>
                    <div className="text-primary mt-8 text-xl font-medium flex gap-2 items-center">
                        <Leaf />
                        You earned {details.pointsEarned} points!
                    </div>
                    <Map />
                    <div className="flex flex-col divide-y-2 border-2 mt-4 rounded-lg">
                        <div className="py-4 px-6 flex">
                            <div className="font-bold text-primary w-[80px]">Name</div>
                            <div className="text-primary">{details.customerName}</div>
                        </div>
                        <div className="py-4 px-6 flex">
                            <div className="font-bold text-primary w-[80px]">Email</div>
                            <div className="text-primary">{details.customerEmail}</div>
                        </div>
                        <div className="py-4 px-6 flex">
                            <div className="font-bold text-primary w-[80px]">Phone #</div>
                            <div className="text-primary">{details.customerPhone}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-3xl text-primary pb-4">
                        Your Order
                    </div>
                    <div className="p-4 border-2 rounded-lg">
                        <div>
                            {details.items.map((item, index) => {
                                const menuItem = getMenuItem(item.menuItemId);
                                if (!menuItem) {
                                    return null;
                                }

                                return (
                                    <div key={index} className="flex gap-4 py-2">
                                        <div className="w-32 h-32 relative flex-shrink-0 border-[1.5px] rounded-lg">
                                            <Image
                                                src={menuItem.image_url}
                                                alt={menuItem.name}
                                                fill
                                                className="object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1">
                                            <h3 className="font-semibold text-lg text-primary">
                                                {menuItem.name} x{item.quantity}
                                            </h3>
                                            <div>
                                                <p className="text-sm line-clamp-1 text-primary">
                                                    {menuItem.description}
                                                </p>
                                                {item.addedItems.length > 0 && (
                                                    <p className="text-sm text-primary">
                                                        <span className="font-semibold">
                                                            Added:
                                                        </span>{" "}
                                                        {item.addedItems.join(", ")}
                                                    </p>
                                                )}
                                                {item.removedItems.length > 0 && (
                                                    <p className="text-sm text-primary">
                                                        <span className="font-semibold">
                                                            Removed:
                                                        </span>{" "}
                                                        {item.removedItems.join(", ")}
                                                    </p>
                                                )}
                                            </div>
                                            <p className="text-primary font-bold mt-1 text-xl">
                                                $
                                                {(
                                                    menuItem.price *
                                                    item.quantity *
                                                    (1 - menuItem.sale_percentage / 100)
                                                ).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="border-t-2 mt-4">
                            <div className="py-4 space-y-2">
                                <div className="flex justify-between items-center text-primary">
                                    <span>Subtotal</span>
                                    <span>
                                        $
                                        {details.items
                                            .reduce(
                                                (sum, item) =>
                                                    sum +
                                                    item.originalPrice * item.quantity,
                                                0,
                                            )
                                            .toFixed(2)}
                                    </span>
                                </div>
                                {details.items.some(
                                    (item) => item.salePercentage > 0,
                                ) && (
                                    <div className="flex justify-between items-center text-primary">
                                        <span>Sale Discount</span>
                                        <span>
                                            -$
                                            {details.items
                                                .reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        (item.originalPrice *
                                                            item.quantity *
                                                            item.salePercentage) /
                                                            100,
                                                    0,
                                                )
                                                .toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                {details.pointsRedeemed > 0 && (
                                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                                        <span>Points Discount</span>
                                        <span>
                                            -$
                                            {(details.pointsRedeemed / 25).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-center font-semibold text-primary border-t-2 pt-4">
                                <span className="text-xl">Total</span>
                                <span className="text-xl font-bold">
                                    ${details.displayTotal.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <Link href={"/menu"}>
                        <Button className="mt-8 w-fit">
                            <ArrowLeft size={18} />
                            Return to Menu
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
