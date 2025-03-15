"use server";

import {createClient} from "@/lib/supabase/server";
import {Reservation} from "@/types";
import {ReserveFormValues} from "../reserve/reserve-form";
import {User} from "@supabase/supabase-js";
import {revalidatePath} from "next/cache";

export async function createReservation(
    data: ReserveFormValues,
    tables: string[],
    user: User | null,
): Promise<Reservation | null> {
    const supabase = createClient();
    const {data: reservation, error} = await supabase
        .from("reservations")
        .insert({
            name: data.name,
            email: data.email,
            phone_number: data.phoneNumber,
            guests: data.numberOfGuests,
            date: data.date,
            time: data.time,
            tables: tables,
            uid: user?.id,
        })
        .select()
        .single();
    if (error) {
        return null;
    }
    return reservation as Reservation;
}

export async function revalidateReservations(): Promise<void> {
    revalidatePath("/");
}
