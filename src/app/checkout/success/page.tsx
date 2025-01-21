"use client";

import {useEffect, useState, Suspense} from "react";
import {useRouter, useSearchParams} from "next/navigation";
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
import {toast} from "sonner";
import {createOrder} from "@/lib/actions/orders";
import Stripe from "stripe";

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
        addedItems: Array<string>;
        removedItems: Array<string>;
    }>;
    total: number;
    displayTotal: number;
}

function CheckoutSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [orderDetails, setOrderDetails] = useState<OrderDetails>({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        items: [],
        total: 0,
        displayTotal: 0,
    });
    const [loading, setLoading] = useState(true);

    // Load and process order details from Stripe session
    useEffect(() => {
        if (!sessionId) {
            router.push("/");
            return;
        }

        const loadOrderDetails = async (): Promise<void> => {
            try {
                // Get Stripe session data
                const session = await getStripeSession(sessionId);
                if (!session) {
                    toast.error("Could not find order details");
                    return;
                }

                // Parse order details from session
                const details: OrderDetails = {
                    customerName:
                        session.customer_details?.name ||
                        session.metadata?.customerName ||
                        "",
                    customerEmail:
                        session.customer_details?.email ||
                        session.metadata?.customerEmail ||
                        "",
                    customerPhone:
                        session.customer_details?.phone ||
                        session.metadata?.customerPhone ||
                        "",
                    items:
                        session.line_items?.data.map((item) => {
                            const product = item.price?.product as Stripe.Product | null;
                            const description = product?.description || "";
                            const lines = description.split("\n");
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
                                addedItems,
                                removedItems,
                            };
                        }) || [],
                    total: session.amount_total || 0,
                    displayTotal: (session.amount_total || 0) / 100,
                };

                setOrderDetails(details);

                // Create order in database and clear cart
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

                localStorage.removeItem("sprout_cart");
                window.dispatchEvent(new Event("cartUpdated"));
            } catch {
                toast.error("Could not load order details");
            } finally {
                setLoading(false);
            }
        };

        loadOrderDetails();
    }, [sessionId, router]);

    // Calculate estimated pickup time (20 mins from now)
    const estimatedTime = new Date();
    estimatedTime.setMinutes(estimatedTime.getMinutes() + 20);

    // Show loading spinner while fetching order details
    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto py-16">
                    <div className="max-w-2xl mx-auto">
                        <Card>
                            <CardContent className="p-8">
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
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
                            <div className="bg-muted/50 p-4 rounded-lg">
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
                                    <span>{orderDetails.customerName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-primary" />
                                    <span>{orderDetails.customerPhone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <span>{orderDetails.customerEmail}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Order Details</h3>
                                <div className="space-y-3">
                                    {orderDetails.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center"
                                        >
                                            <div>
                                                <span className="font-medium">
                                                    {item.name}
                                                </span>
                                                <span className="text-muted-foreground ml-2">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            <span>${item.displayAmount.toFixed(2)}</span>
                                        </div>
                                    ))}
                                    <div className="border-t pt-3 mt-3">
                                        <div className="flex justify-between items-center font-semibold">
                                            <span>Total</span>
                                            <span>
                                                ${orderDetails.displayTotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button
                                    onClick={() => router.push("/menu")}
                                    className="w-full"
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Wrap the component with Suspense
export default function CheckoutSuccessPage(): React.JSX.Element {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="container mx-auto py-16">
                    <div className="max-w-2xl mx-auto">
                        <Card>
                            <CardContent className="p-8">
                                <div className="flex justify-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        }>
            <CheckoutSuccess />
        </Suspense>
    );
}
