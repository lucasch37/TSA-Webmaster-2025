import React from "react";
import {Metadata} from "next";
import ReserveClient from "@/components/reserve/reserve-client";

export const metadata: Metadata = {
    title: "Reserve | Sprout & About",
    description: "Make a reservation at our restaurant",
};

export default function ReservePage(): React.JSX.Element {
    return <ReserveClient />;
}
