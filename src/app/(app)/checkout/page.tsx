import {Button} from "@/components/ui/button";
import {getCart} from "@/features/cart/actions/cart";
import CheckoutItemList from "@/features/checkout/components/checkout-item-list";
import {getMenu} from "@/features/menu/actions/getMenu";
import {getUser} from "@/features/user/actions/getUser";
import {createClient} from "@/lib/supabase/server";
import {ArrowLeft} from "lucide-react";
import {Metadata} from "next";
import Link from "next/link";
import React from "react";
import CheckoutForm from "../../../features/checkout/components/checkout-form";

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
            .from("users")
            .select("sustainability_score")
            .eq("id", user.id)
            .single();
        userPoints = userData?.sustainability_score || 0;
    }

    return (
        <div>
            <div className="container mx-auto py-8">
                <div className="flex justify-between mb-8 items-center">
                    <div className="text-6xl font-bold text-primary">CHECKOUT</div>
                    <Link href={"/menu"}>
                        <Button size={"default"} className="h-fit">
                            <ArrowLeft size={18} />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CheckoutItemList cart={cart} menu={menu} />

                    <div>
                        <CheckoutForm
                            cart={cart}
                            user={user}
                            userPoints={userPoints}
                            menu={menu}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
