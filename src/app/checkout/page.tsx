import React from "react";
import {getCart} from "@/lib/cart";
import {getMenu} from "@/lib/actions/getMenu";
import {createClient} from "@/lib/supabase/server";
import Image from "next/image";
import {Clock} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import CheckoutForm from "../../components/checkout/checkout-form";
import {Metadata} from "next";
import {MenuItem} from "@/types";
import {getUser} from "@/lib/actions/getUser";

export const metadata: Metadata = {
    title: "Checkout | Sprout & About",
    description: "Complete your order",
};

export default async function CheckoutPage(): Promise<React.JSX.Element> {
    // Get initial cart and menu data from server
    const [cart, menuData] = await Promise.all([getCart(), getMenu()]);
    const menu = menuData.data || [];

    // Get user data from server
    const supabase = createClient();
    const user = await getUser();
    let userPoints = 0;

    if (user) {
        const {data: userData} = await supabase
            .from("user_stats")
            .select("sustainability_score")
            .eq("user_id", user.id)
            .single();
        userPoints = userData?.sustainability_score || 0;
    }

    // Helper to find menu item by id
    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    // Calculate subtotal
    const subtotal = cart.items.reduce((sum, item) => {
        const menuItem = getMenuItem(item.menuItemId);
        if (!menuItem) {
            return sum;
        }
        const itemPrice = menuItem.price * (1 - menuItem.sale_percentage / 100);
        return sum + itemPrice * item.quantity;
    }, 0);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-primary mb-8">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Pickup order - Ready in 15-20 minutes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cart.items.map((item, index) => {
                                        const menuItem = getMenuItem(item.menuItemId);
                                        if (!menuItem) {
                                            return null;
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className="flex gap-4 py-4 border-b last:border-0"
                                            >
                                                <div className="w-20 h-20 relative flex-shrink-0">
                                                    <Image
                                                        src={menuItem.image_url}
                                                        alt={menuItem.name}
                                                        fill
                                                        className="object-cover rounded-md"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-primary">
                                                        {menuItem.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                    {item.addedItems.length > 0 && (
                                                        <p className="text-sm text-primary">
                                                            Added:{" "}
                                                            {item.addedItems.join(", ")}
                                                        </p>
                                                    )}
                                                    {item.removedItems.length > 0 && (
                                                        <p className="text-sm text-primary">
                                                            Removed:{" "}
                                                            {item.removedItems.join(", ")}
                                                        </p>
                                                    )}
                                                    <p className="text-primary font-medium mt-1">
                                                        $
                                                        {(
                                                            menuItem.price *
                                                            item.quantity *
                                                            (1 -
                                                                menuItem.sale_percentage /
                                                                    100)
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center text-lg font-semibold">
                                            <span>Subtotal</span>
                                            <span className="text-primary">
                                                ${subtotal.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <CheckoutForm
                            cart={cart}
                            subtotal={subtotal}
                            user={user}
                            userPoints={userPoints}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
