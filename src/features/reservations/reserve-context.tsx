"use client";

import {Table} from "@/types";
import React, {createContext, useContext, useState, ReactNode} from "react";

interface ReserveContextType {
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}

const ReserveContext = createContext<ReserveContextType | undefined>(undefined);

export const useReserve = (): ReserveContextType => {
    const context = useContext(ReserveContext);
    return context!;
};

interface ReserveProviderProps {
    children: ReactNode;
}

export const ReserveProvider: React.FC<ReserveProviderProps> = ({children}) => {
    const [tables, setTables] = useState<Table[]>([]);
    return (
        <ReserveContext.Provider
            value={{
                tables,
                setTables,
            }}
        >
            {children}
        </ReserveContext.Provider>
    );
};
