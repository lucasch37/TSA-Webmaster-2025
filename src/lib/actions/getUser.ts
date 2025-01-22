"use server";

import {createClient} from "@/lib/supabase/server";

export async function getUser() {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    return user.data.user;
}