"use client";

import React from "react";
import ReserveForm from "./reserve-form";
import SeatMap from "./seat-map";

const Reserve = (): React.ReactNode => {
    return (
        <div className="flex flex-col xl:flex-row gap-8">
            <SeatMap />
            <ReserveForm />
        </div>
    );
};

export default Reserve;
