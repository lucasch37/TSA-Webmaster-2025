"use server";

import {createClient} from "@/lib/supabase/server";
import {MenuItem, Order, User} from "@/types";
import {getUser as getAuthUser} from "@/features/user/actions/getUser";

// Create new order from Stripe checkout session
export async function createOrder(
    sessionId: string,
    items: {
        name: string;
        quantity: number;
        price: number;
        addedItems?: string[];
        removedItems?: string[];
    }[],
    customerDetails: {name: string; email: string; phone?: string},
    totalAmount: number,
    pointsEarned: number,
    menu: MenuItem[],
): Promise<Order> {
    const supabase = createClient();

    // Verify user authentication
    const user = await getAuthUser();

    // Check for existing order with same session
    const {data: existingOrder} = await supabase
        .from("orders")
        .select()
        .eq("stripe_session_id", sessionId)
        .single();

    if (existingOrder) {
        return existingOrder as Order;
    }

    const {data: order, error: orderError} = await supabase
        .from("orders")
        .insert({
            user_id: user?.id,
            stripe_session_id: sessionId,
            total_amount: totalAmount,
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone,
            sustainability_score: pointsEarned,
            order_number: Math.floor(1000 + Math.random() * 9000),
        })
        .select()
        .single();
    items.forEach(async (item) => {
        await supabase.from("order_items").insert({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            added_items: item.addedItems,
            removed_items: item.removedItems,
            order_id: order.id,
            menu_item_id: menu.find((menuItem) => menuItem.name === item.name)?.id,
        });
    });

    if (orderError) {
        throw orderError;
    }

    return order as Order;
}

// Get all orders for current user
export async function getUserOrders(): Promise<Order[]> {
    const supabase = createClient();

    const user = await getAuthUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    const {data: orders, error} = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", {ascending: false})
        .eq("user_id", user.id);

    if (error) {
        throw error;
    }

    return orders as Order[];
}

// Get user data
export async function getUserData(): Promise<User | null> {
    const supabase = createClient();

    const user = await getAuthUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    const {data: userData, error} = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        throw error;
    }
    return userData;
}
