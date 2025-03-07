"use client";

import {Reservation, Table} from "@/types";
import {User} from "@supabase/supabase-js";
import React, {createContext, useContext, useState, ReactNode} from "react";

interface ReserveContextType {
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    reservations: Reservation[];
    setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
    time: string;
    setTime: React.Dispatch<React.SetStateAction<string>>;
    user: User | null;
}

const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const useReserve = (): ReserveContextType => {
    const context = useContext(ReserveContext);
    return context!;
};

interface ReserveProviderProps {
    foundReservations: Reservation[];
    children: ReactNode;
    user: User | null;
}

export const ReserveProvider: React.FC<ReserveProviderProps> = ({
    children,
    foundReservations,
    user,
}) => {
    const [tables, setTables] = useState<Table[]>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [reservations, setReservations] = useState<Reservation[]>(foundReservations);
    const [time, setTime] = useState<string>("");
    return (
        <ReserveContext.Provider
            value={{
                tables,
                setTables,
                date,
                setDate,
                reservations,
                setReservations,
                time,
                setTime,
                user,
            }}
        >
            {children}
        </ReserveContext.Provider>
    );
};
