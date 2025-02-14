"use server";

import {createClient} from "@/lib/supabase/server";
import {Order, User} from "@/types";
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
): Promise<Order | Error> {
    const supabase = createClient();

    // Verify user authentication
    const user = await getAuthUser();
    if (!user) {
        return new Error("User not authenticated");
    }

    // Check for existing order with same session
    const {data: existingOrder} = await supabase
        .from("orders")
        .select("id")
        .eq("stripe_session_id", sessionId)
        .single();

    if (existingOrder) {
        const {data: order} = await supabase
            .from("orders")
            .select("*")
            .eq("id", existingOrder.id)
            .single();
        return order as Order;
    }

    // Create order using our new function
    const {data: order, error: orderError} = await supabase
        .rpc("create_order_with_items", {
            p_user_id: user.id,
            p_stripe_session_id: sessionId,
            p_total_amount: totalAmount,
            p_customer_name: customerDetails.name,
            p_customer_email: customerDetails.email,
            p_customer_phone: customerDetails.phone,
            p_items: items,
        })
        .single();

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

    const {data: orders, error} = await supabase.rpc("get_user_orders", {
        p_user_id: user.id,
    });

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
