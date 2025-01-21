import React from "react";
import {Metadata} from "next";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
    title: "Reserve | Sprout & About",
    description: "Make a reservation at our restaurant",
};

export default function ReservePage(): React.JSX.Element {
    return (
        <div>
            <Navbar />
        </div>
    );
}
