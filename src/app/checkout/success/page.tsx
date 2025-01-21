import React from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Navbar from "@/components/navbar";
import {CheckCircle, Clock, Phone, Mail, User} from "lucide-react";
import {getStripeSession} from "@/lib/stripe";
import {createOrder} from "@/lib/actions/orders";
import Stripe from "stripe";
import {redirect} from "next/navigation";
import Link from "next/link";
import {ClearCartOnLoad} from "./clear-cart";

// Order details type definition
interface OrderDetails {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: Array<{
        name: string;
        quantity: number;
        amount: number;
        displayAmount: number;
        originalPrice: number;
        salePercentage: number;
        addedItems: Array<string>;
        removedItems: Array<string>;
    }>;
    total: number;
    displayTotal: number;
    pointsEarned: number;
    pointsRedeemed: number;
}

interface ProductMetadata {
    original_price: string;
    sale_percentage: string;
}

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: {session_id?: string};
}): Promise<React.JSX.Element> {
    const sessionId = searchParams.session_id;

    if (!sessionId) {
        redirect("/");
    }

    // Get Stripe session data
    const session = await getStripeSession(sessionId);
    if (!session) {
        redirect("/");
    }

    // Parse order details from session
    const details: OrderDetails = {
        customerName:
            session.customer_details?.name || session.metadata?.customerName || "",
        customerEmail:
            session.customer_details?.email || session.metadata?.customerEmail || "",
        customerPhone:
            session.customer_details?.phone || session.metadata?.customerPhone || "",
        items:
            session.line_items?.data.map((item) => {
                const product = item.price?.product as Stripe.Product | null;
                const description = product?.description || "";
                const lines = description.split("\n");
                const metadata = (product?.metadata as unknown as ProductMetadata) || {};
                const originalPrice = parseFloat(metadata.original_price) || 0;
                const salePercentage = parseFloat(metadata.sale_percentage) || 0;
                const addedItems =
                    lines
                        .find((line: string) => line.startsWith("Added:"))
                        ?.replace("Added:", "")
                        .trim()
                        .split(",")
                        .map((i: string) => i.trim())
                        .filter(Boolean) || [];
                const removedItems =
                    lines
                        .find((line: string) => line.startsWith("Removed:"))
                        ?.replace("Removed:", "")
                        .trim()
                        .split(",")
                        .map((i: string) => i.trim())
                        .filter(Boolean) || [];
                const amount = item.amount_total || 0;

                return {
                    name: product?.name || "",
                    quantity: item.quantity || 0,
                    amount: amount,
                    displayAmount: amount / 100,
                    originalPrice,
                    salePercentage,
                    addedItems,
                    removedItems,
                };
            }) || [],
        total: session.amount_total || 0,
        displayTotal: (session.amount_total || 0) / 100,
        pointsEarned: session.metadata?.pointsEarned
            ? parseInt(session.metadata.pointsEarned)
            : 0,
        pointsRedeemed: session.metadata?.pointsRedeemed
            ? parseInt(session.metadata.pointsRedeemed)
            : 0,
    };

    // Create order in database
    await createOrder(
        sessionId,
        details.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            amount: item.amount,
            addedItems: item.addedItems,
            removedItems: item.removedItems,
        })),
        {
            name: details.customerName,
            email: details.customerEmail,
            phone: details.customerPhone,
        },
        details.total,
    );

    // Calculate estimated pickup time (20 mins from now)
    const estimatedTime = new Date();
    estimatedTime.setMinutes(estimatedTime.getMinutes() + 20);

    return (
        <div className="min-h-screen bg-background">
            <ClearCartOnLoad />
            <Navbar />
            <div className="container mx-auto py-16">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <CheckCircle className="w-16 h-16 text-green-500" />
                            </div>
                            <CardTitle className="text-center text-2xl">
                                Order Confirmed!
                            </CardTitle>
                            <CardDescription className="text-center text-lg">
                                Thank you for your order
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-5 h-5 text-primary" />
                                    <h3 className="font-semibold">
                                        Estimated Pickup Time
                                    </h3>
                                </div>
                                <p className="text-lg">
                                    {estimatedTime.toLocaleTimeString([], {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4 text-primary" />
                                    <span>{details.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <span>{details.customerPhone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <span>{details.customerEmail}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Order Details</h3>
                                <div className="space-y-3">
                                    {details.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-start"
                                        >
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        x{item.quantity}
                                                    </span>
                                                </div>
                                                {item.addedItems.length > 0 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Added:{" "}
                                                        {item.addedItems.join(", ")}
                                                    </p>
                                                )}
                                                {item.removedItems.length > 0 && (
                                                    <p className="text-sm text-muted-foreground">
                                                        Removed:{" "}
                                                        {item.removedItems.join(", ")}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <span className="font-medium">
                                                    $
                                                    {(
                                                        item.originalPrice * item.quantity
                                                    ).toFixed(2)}
                                                </span>
                                                {item.salePercentage > 0 && (
                                                    <p className="text-sm text-green-600">
                                                        -{item.salePercentage}% off
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="border-t pt-3 mt-3 space-y-2">
                                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                                            <span>Subtotal</span>
                                            <span>
                                                $
                                                {details.items
                                                    .reduce(
                                                        (sum, item) =>
                                                            sum +
                                                            item.originalPrice *
                                                                item.quantity,
                                                        0,
                                                    )
                                                    .toFixed(2)}
                                            </span>
                                        </div>
                                        {details.items.some(
                                            (item) => item.salePercentage > 0,
                                        ) && (
                                            <div className="flex justify-between items-center text-sm text-green-600">
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
                                                    {(
                                                        details.pointsRedeemed / 25
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center font-semibold">
                                            <span>Total</span>
                                            <span>
                                                ${details.displayTotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-green-600 pt-2">
                                            <span>Points Earned</span>
                                            <span>+{details.pointsEarned} points</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link href="/menu" className="w-full">
                                    <Button className="w-full">Continue Shopping</Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
