"use server";

import {createClient} from "@/lib/supabase/server";
import {Order, UserStats} from "@/types";

// Create new order from Stripe checkout session
export async function createOrder(
    sessionId: string,
    items: {
        name: string;
        quantity: number;
        amount: number;
        addedItems?: string[];
        removedItems?: string[];
    }[],
    customerDetails: {name: string; email: string; phone?: string},
    totalAmount: number,
): Promise<Order> {
    const supabase = createClient();

    // Verify user authentication
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("User not authenticated");
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
        return order;
    }

    // Calculate sustainability score based on items
    const sustainabilityScore = items.length * 5;

    // Insert new order
    const {data: order, error: orderError} = await supabase
        .from("orders")
        .insert({
            user_id: user.id,
            stripe_session_id: sessionId,
            total_amount: totalAmount,
            sustainability_score: sustainabilityScore,
            items: items.map((item) => ({
                name: item.name,
                quantity: item.quantity,
                amount: item.amount,
                addedItems: item.addedItems || [],
                removedItems: item.removedItems || [],
            })),
            customer_name: customerDetails.name,
            customer_email: customerDetails.email,
            customer_phone: customerDetails.phone,
        })
        .select()
        .single();

    if (orderError) {
        throw orderError;
    }

    // Update user's sustainability stats
    const {error: statsError} = await supabase.rpc("upsert_user_stats", {
        p_user_id: user.id,
        p_sustainability_score: sustainabilityScore,
    });

    if (statsError) {
        throw statsError;
    }

    return order;
}

// Get all orders for current user
export async function getUserOrders(): Promise<Order[]> {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    const {data: orders, error} = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {ascending: false});

    if (error) {
        throw error;
    }
    return orders;
}

// Get sustainability stats for current user
export async function getUserStats(): Promise<UserStats> {
    const supabase = createClient();

    const {
        data: {user},
    } = await supabase.auth.getUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    const {data: stats, error} = await supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (error) {
        throw error;
    }
    return stats;
}
