import {createOrder} from "@/features/checkout/actions/orders";
import Success from "@/features/checkout/components/success";
import {getMenu} from "@/features/menu/actions/getMenu";
import {getStripeSession} from "@/lib/stripe";
import {redirect} from "next/navigation";
import React from "react";
import Stripe from "stripe";
import {ClearCartOnLoad} from "./clear-cart";

// Order details type definition
export interface OrderDetails {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: Array<{
        menuItemId: number;
        name: string;
        quantity: number;
        price: number;
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
    menu_item_id: string;
}

export default async function CheckoutSuccessPage(props: {
    searchParams: Promise<{session_id?: string}>;
}): Promise<React.JSX.Element> {
    const searchParams = await props.searchParams;
    const sessionId = searchParams.session_id;
    const menuRes = await getMenu();
    const menu = menuRes.data;

    if (!menu) {
        redirect("/");
    }

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
                const menuItemId = parseInt(metadata.menu_item_id) || 0;
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
                    menuItemId,
                    name: product?.name || "",
                    quantity: item.quantity || 0,
                    price: amount / 100,
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
            menuItemId: item.menuItemId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
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
        <div>
            <ClearCartOnLoad />
            <Success details={details} menu={menu} />
        </div>
    );
}
