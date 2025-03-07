"use server";

import {createClient} from "@/lib/supabase/server";
import {Order} from "@/types";

export async function getAdminOrders(): Promise<{
    success: boolean;
    message: string;
    data?: Order[];
}> {
    try {
        const supabase = createClient();

        const {data: orders, error} = await supabase
            .from("orders")
            .select("*, order_items(*)")
            .order("created_at", {ascending: false});

        if (error) {
            return {success: false, message: "Failed to fetch orders"};
        }

        return {
            success: true,
            message: "Orders fetched successfully",
            data: orders as Order[],
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {success: false, message: "An unexpected error occurred"};
    }
}
