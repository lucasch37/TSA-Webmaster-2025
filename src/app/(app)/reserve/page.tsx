import Reserve from "@/features/reservations/reserve";
import {ReserveProvider} from "@/features/reservations/reserve-context";
import SeatMap from "@/features/reservations/seat-map";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Reserve | Sprout & About",
    description: "Make a reservation at our restaurant",
};

export default function ReservePage(): React.JSX.Element {
    return (
        <ReserveProvider>
            <div className="flex flex-col container mx-auto min-h-screen text-primary">
                <div className="font-bold text-6xl mt-12 pb-6 mb-6 border-b-2">
                    RESERVE
                </div>
                <Reserve />
            </div>
        </ReserveProvider>
    );
}
