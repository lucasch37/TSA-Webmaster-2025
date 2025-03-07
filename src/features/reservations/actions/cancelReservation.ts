"use server";

import {createClient} from "@/lib/supabase/server";
import {Reservation} from "@/types";
import {revalidatePath} from "next/cache";

const cancelReservation = async (id: string): Promise<Reservation | null> => {
    const supabase = createClient();
    const {data, error} = await supabase
        .from("reservations")
        .delete()
        .eq("id", id)
        .select()
        .single();
    if (error) {
        return null;
    }
    revalidatePath("/");
    return data;
};

export default cancelReservation;
