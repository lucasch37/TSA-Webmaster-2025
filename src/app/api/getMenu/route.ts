import {NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server";

export async function GET(): Promise<NextResponse> {
    try {
        const supabase = createClient();
        const menu = await supabase.from("menu_items").select().order("name");

        return NextResponse.json(menu.data, {status: 201});
    } catch {
        return NextResponse.json("Internal Server Error", {status: 500});
    }
}
