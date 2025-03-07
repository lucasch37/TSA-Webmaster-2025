"use server";

import {createClient} from "@/lib/supabase/server";
import {MenuItem} from "@/types";
import {revalidatePath} from "next/cache";

export async function editMenuItem(item: MenuItem): Promise<MenuItem | null> {
    const supabase = createClient();
    const {data, error} = await supabase
        .from("menu_items")
        .update(item)
        .eq("id", item.id);
    if (error) {
        return null;
    }
    revalidatePath("/");
    return data;
}
