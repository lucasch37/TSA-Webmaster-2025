"use server";

import {createClient} from "@/lib/supabase/server";

interface OrderResponse {
    success: boolean;
    message: string;
}

export async function updateOrderFulfilled(
    id: string,
    fulfilled: boolean,
): Promise<OrderResponse> {
    try {
        const supabase = createClient();

        const {error} = await supabase.from("orders").update({fulfilled}).eq("id", id);

        if (error) {
            return {success: false, message: "Failed to update order status"};
        }

        return {success: true, message: "Order status updated successfully"};
    } catch {
        return {success: false, message: "An unexpected error occurred"};
    }
}
