"use server";

import {createClient} from "@/lib/supabase/server";
import {User} from "@supabase/supabase-js";

export async function getUser(): Promise<User | null> {
    const supabase = createClient();
    const user = await supabase.auth.getUser();
    return user.data.user;
}
