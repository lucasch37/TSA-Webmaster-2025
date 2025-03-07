import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {Reservation} from "@/types";
import {format} from "date-fns";
import {Check} from "lucide-react";
import React from "react";

const ReserveDialog = ({
    dialogOpen,
    setDialogOpen,
    reservation,
}: {
    dialogOpen: boolean;
    setDialogOpen: Function;
    reservation: Reservation | null;
}): React.ReactNode => {
    return (
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
            {reservation && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-primary text-2xl">
                            SUCCESS
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-sm text-primary mb-4">
                        {reservation.name}, your reservation on{" "}
                        {format(reservation.date, "MMMM dd, yyyy")}, at {reservation.time}{" "}
                        has been confirmed. See you soon!
                    </p>
                    <DialogFooter>
                        <Button onClick={() => setDialogOpen(false)} className="w-full">
                            Got it! <Check size={18} />
                        </Button>
                    </DialogFooter>
                </DialogContent>
            )}
        </Dialog>
    );
};

export default ReserveDialog;
