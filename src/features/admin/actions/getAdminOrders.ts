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

        const transformedOrders = orders.map((order) => {
            const items = (order.order_items || []).map((item: any) => ({
                menuItemId: item.menu_item_id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                addedItems: item.added_items || [],
                removedItems: item.removed_items || [],
            }));

            return {
                ...order,
                items,
            };
        });

        return {
            success: true,
            message: "Orders fetched successfully",
            data: transformedOrders as Order[],
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {success: false, message: "An unexpected error occurred"};
    }
}
