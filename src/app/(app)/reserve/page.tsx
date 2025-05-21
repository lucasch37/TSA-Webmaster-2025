import Reserve from "@/features/reservations/reserve/reserve";
import {ReserveProvider} from "@/features/reservations/reserve/reserve-context";
import {getUser} from "@/features/user/actions/getUser";
import {createClient} from "@/lib/supabase/server";
import {Reservation} from "@/types";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Reserve | Sprout & About",
    description: "Make a reservation at our restaurant",
};

export default async function ReservePage(): Promise<React.JSX.Element> {
    const supabase = createClient();
    const {data} = await supabase.from("reservations").select("*");
    const reservations = data as Reservation[] | null;

    const user = await getUser();

    return (
        <ReserveProvider foundReservations={reservations || []} user={user}>
            <div className="flex flex-col container mx-auto min-h-screen text-primary">
                <div className="font-bold text-6xl mt-12 pb-6 mb-6 border-b-2 text-center md:text-start">
                    RESERVE
                </div>
                <Reserve />
            </div>
        </ReserveProvider>
    );
}
