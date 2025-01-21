"use server";

import {MenuResponse} from "@/types";
import {createClient} from "@/lib/supabase/server";

// Fetch all menu items sorted by name
export async function getMenu(): Promise<MenuResponse> {
    try {
        const supabase = createClient();
        // Get menu items from database
        const menu = await supabase.from("menu_items").select().order("name");
        if (menu.error) {
            return {
                success: false,
                message: "Failed to fetch menu",
            };
        }

        return {
            success: true,
            message: "Fetched Menu Successfully",
            data: menu.data,
        };
    } catch {
        return {success: false, message: "Failed to fetch menu"};
    }
}
