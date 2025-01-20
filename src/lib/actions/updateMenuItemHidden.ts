"use server";

import {MenuResponse} from "@/types";
import {createClient} from "@/lib/supabase/server";

export async function updateMenuItemHidden(
    id: number,
    hidden: boolean,
): Promise<MenuResponse> {
    try {
        const supabase = createClient();

        const {error} = await supabase.from("menu_items").update({hidden}).eq("id", id);

        if (error) {
            return {success: false, message: "Failed to update hidden status"};
        }

        return {success: true, message: "Hidden status updated successfully"};
    } catch {
        return {success: false, message: "An unexpected error occurred"};
    }
}
