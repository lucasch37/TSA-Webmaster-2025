"use client";

import React from "react";
import SeatMap from "./seat-map";
import ReserveForm from "./reserve-form";
import {Table} from "@/types";

type Props = {};

const Reserve = (props: Props) => {
    return (
        <div className="flex gap-8">
            <SeatMap />
            <div className="flex flex-col flex-1 border-2 rounded-lg h-fit p-6">
                <ReserveForm />
            </div>
        </div>
    );
};

export default Reserve;
