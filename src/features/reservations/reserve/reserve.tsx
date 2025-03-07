"use client";

import React from "react";
import ReserveForm from "./reserve-form";
import SeatMap from "./seat-map";

const Reserve = (): React.ReactNode => {
    return (
        <div className="flex flex-col xl:flex-row gap-8">
            <SeatMap />
            <div className="flex flex-col flex-1 border-2 rounded-lg h-fit p-6">
                <ReserveForm />
            </div>
        </div>
    );
};

export default Reserve;
