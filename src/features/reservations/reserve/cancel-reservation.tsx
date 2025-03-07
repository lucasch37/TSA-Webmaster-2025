"use client";

import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import React from "react";
import {toast} from "sonner";

type Props = {
    cancelReservation: Function;
    id: string;
};

const CancelReservation = ({cancelReservation, id}: Props): React.ReactNode => {
    return (
        <Button
            className="h-8"
            onClick={async () => {
                const res = await cancelReservation(id);
                if (!res) {
                    toast.error("Failed to cancel reservation");
                    return;
                }
                toast.success("Reservation cancelled");
            }}
        >
            Cancel
            <X size={18} />
        </Button>
    );
};

export default CancelReservation;
