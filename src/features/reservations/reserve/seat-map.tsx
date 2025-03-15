"use client";
import {cn} from "@/lib/utils";
import {Table} from "@/types";
import React from "react";
import {useReserve} from "./reserve-context";
import {format} from "date-fns";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {PopoverClose} from "@radix-ui/react-popover";
import {motion} from "motion/react";

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
    const {tables, setTables, reservations, date, time} = useReserve();
    const Table = ({
        name,
        className,
    }: {
        name: string;
        className: string;
    }): React.JSX.Element => {
        const isReserved =
            date && time
                ? reservations.some(
                      (reservation) =>
                          reservation.tables.some((table) => table === name) &&
                          format(new Date(reservation.date), "MM dd yyyy") ===
                              format(date, "MM dd yyyy") &&
                          reservation.time === time,
                  )
                : false;

        return (
            <Popover>
                <PopoverTrigger asChild>
                    <div
                        className={cn(
                            "border flex items-center justify-center transition-all",
                            className,
                            tables.find((table) => table.name === name)
                                ? "bg-primary text-white"
                                : isReserved
                                  ? "bg-primary/50 text-white cursor-pointer"
                                  : "border-primary cursor-pointer hover:bg-primary/10",
                        )}
                    >
                        {name}
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    {!isReserved ? (
                        <>
                            <div className="flex items-center">
                                <span className="font-bold text-lg">Table {name}</span>{" "}
                                <span className="rounded-full border px-2 py-0.5 text-xs ml-2">
                                    Available
                                </span>
                            </div>
                            <div className="text-sm font-semibold">
                                {tablesData.find((table) => table.name === name)?.seats}{" "}
                                seats
                            </div>
                            <div className="mt-3">
                                <PopoverClose asChild>
                                    <Button
                                        className="w-full h-7"
                                        onClick={() => {
                                            if (
                                                !tables.find(
                                                    (table) => table.name === name,
                                                )
                                            ) {
                                                const foundTable = tablesData.find(
                                                    (table) => table.name === name,
                                                );
                                                if (foundTable) {
                                                    setTables((prev: Table[]) => [
                                                        ...prev,
                                                        foundTable,
                                                    ]);
                                                }
                                            } else {
                                                setTables((prev: Table[]) =>
                                                    prev.filter(
                                                        (table) => table.name !== name,
                                                    ),
                                                );
                                            }
                                        }}
                                    >
                                        {tables.find((table) => table.name === name)
                                            ? "Deselect"
                                            : "Select"}
                                    </Button>
                                </PopoverClose>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center">
                                <span className="font-bold text-lg">Table {name}</span>{" "}
                                <span className="rounded-full border px-2 py-0.5 text-xs ml-2">
                                    Unavailable
                                </span>
                            </div>
                            <div className="text-sm font-semibold">
                                {tablesData.find((table) => table.name === name)?.seats}{" "}
                                seats
                            </div>
                            <div className="text-sm italic">
                                Reserved by{" "}
                                {
                                    reservations.find((reservation) =>
                                        reservation.tables.some(
                                            (table) => table === name,
                                        ),
                                    )?.name
                                }
                            </div>
                            <div className="mt-3">
                                <Button disabled className="w-full h-7">
                                    Select
                                </Button>
                            </div>
                        </>
                    )}
                </PopoverContent>
            </Popover>
        );
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{type: "spring", stiffness: 70}}
            className="rounded-lg border-2 p-8 bg-background/40 shadow-md"
        >
            <div className="grid md:grid-cols-2 grid-rows-2 border md:w-[600px] lg:w-[700px] 2xl:w-[800px] h-[500px] mx-auto">
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-9 justify-center items-center">
                    <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-9">
                        <Table
                            name="A"
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                        />
                        <Table
                            name="B"
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                        />
                        <Table
                            name="C"
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-9">
                        <Table
                            name="D"
                            className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10"
                        />
                        <Table
                            name="E"
                            className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10"
                        />
                        <Table
                            name="F"
                            className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10"
                        />
                    </div>
                </div>
                <div className="w-full h-full bg-[repeating-linear-gradient(45deg,#15803d_0px,#15803d_2px,transparent_2px,transparent_14px)] border hidden md:flex"></div>
                <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-9">
                    <Table
                        name="G"
                        className="w-16 h-12 sm:w-24 sm:h-16 md:w-[7.5rem] md:h-20"
                    />
                    <Table
                        name="H"
                        className="w-16 h-12 sm:w-24 sm:h-16 md:w-[7.5rem] md:h-20"
                    />
                </div>
                <div className="flex flex-col gap-4 sm:gap-6 md:gap-9 justify-center items-center pb-16 md:pb-0">
                    <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-9">
                        <Table
                            name="I"
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                        />
                        <Table
                            name="J"
                            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                        />
                        <Table
                            name="K"
                            className="w-8 h-12 sm:w-9 sm:h-16 md:w-10 md:h-20"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-9">
                        <Table
                            name="L"
                            className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10"
                        />
                        <Table
                            name="M"
                            className="w-12 h-8 sm:w-16 sm:h-9 md:w-20 md:h-10"
                        />
                        <Table
                            name="N"
                            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between items-center mt-4">
                <div className="font-semibold">
                    {tables.reduce((total, table) => {
                        const tableData = tablesData.find((t) => t.name === table.name);
                        return total + (tableData?.seats || 0);
                    }, 0)}{" "}
                    seats selected
                </div>
                <div className="w-1/2 flex gap-4 justify-end items-center md:flex-row flex-col">
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
        </motion.div>
    );
}
