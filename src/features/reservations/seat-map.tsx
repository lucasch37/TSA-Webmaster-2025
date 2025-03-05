"use client";
import {cn} from "@/lib/utils";
import {Table} from "@/types";
import React from "react";
import {useReserve} from "./reserve-context";

type Reservation = {
    id: string;
    uid?: string;
    date: Date;
    time: string;
    name: string;
    tables: string[];
};

const tablesData: Table[] = [
    {name: "A", seats: 4},
    {name: "B", seats: 4},
    {name: "C", seats: 4},
    {name: "D", seats: 2},
    {name: "E", seats: 2},
    {name: "F", seats: 2},
    {name: "G", seats: 6},
    {name: "H", seats: 6},
    {name: "I", seats: 4},
    {name: "J", seats: 4},
    {name: "K", seats: 2},
    {name: "L", seats: 2},
    {name: "M", seats: 2},
    {name: "N", seats: 1},
];

export default function SeatMap(): React.JSX.Element {
    const {tables, setTables} = useReserve();
    const Table = ({
        name,
        className,
    }: {
        name: string;
        className: string;
    }): React.JSX.Element => {
        return (
            <div
                className={cn(
                    "border flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all",
                    className,
                    `${tables.find((table) => table.name === name) ? "bg-primary text-white" : "border-primary"}`,
                )}
                onClick={() => {
                    if (!tables.find((table) => table.name === name)) {
                        const foundTable = tablesData.find(
                            (table) => table.name === name,
                        );
                        if (foundTable) {
                            setTables((prev: Table[]) => [...prev, foundTable]);
                        }
                    } else {
                        setTables((prev: Table[]) =>
                            prev.filter((table) => table.name !== name),
                        );
                    }
                }}
            >
                {name}
            </div>
        );
    };

    return (
        <div className="rounded-lg border-2 p-8 2xl:scale-100">
            <div className="grid grid-cols-2 grid-rows-2 border w-[800px] h-[500px]">
                <div className="flex flex-col gap-9 justify-center items-center">
                    <div className="flex items-center justify-center gap-9">
                        <Table name="A" className="w-20 h-20" />
                        <Table name="B" className="w-20 h-20" />
                        <Table name="C" className="w-20 h-20" />
                    </div>
                    <div className="flex items-center justify-center gap-9">
                        <Table name="D" className="w-20 h-10" />
                        <Table name="E" className="w-20 h-10" />
                        <Table name="F" className="w-20 h-10" />
                    </div>
                </div>
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#15803d_0px,#15803d_2px,transparent_2px,transparent_14px)] border"></div>
                <div className="flex items-center justify-center gap-9">
                    <Table name="G" className="w-[7.5rem] h-20" />
                    <Table name="H" className="w-[7.5rem] h-20" />
                </div>
                <div className="flex flex-col gap-9 justify-center items-center">
                    <div className="flex items-center justify-center gap-9">
                        <Table name="I" className="w-20 h-20" />
                        <Table name="J" className="w-20 h-20" />
                        <Table name="K" className="w-10 h-20" />
                    </div>
                    <div className="flex items-center justify-center gap-9">
                        <Table name="L" className="w-20 h-10" />
                        <Table name="M" className="w-20 h-10" />
                        <Table name="N" className="w-10 h-10" />
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="font-semibold">
                    {tables.reduce((total, table) => {
                        const tableData = tablesData.find((t) => t.name === table.name);
                        return total + (tableData?.seats || 0);
                    }, 0)}{" "}
                    seats selected
                </div>
                <div className="w-1/2 flex gap-4 justify-end items-center">
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 border"></div>
                        <div className="text-sm font-medium">Available</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-primary/50"></div>
                        <div className="text-sm font-medium">Unavailable</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-primary"></div>
                        <div className="text-sm font-medium">Selected</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
