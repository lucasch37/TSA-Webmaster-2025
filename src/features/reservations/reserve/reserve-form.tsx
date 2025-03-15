"use client";

import {cn} from "@/lib/utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import React from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {Button} from "@/components/ui/button";
import {Calendar} from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {toast} from "sonner";
import {createReservation} from "../actions/createReservation";
import {useReserve} from "./reserve-context";
import ReserveDialog from "./reserve-dialog";
import {Reservation} from "@/types";
import {Checkbox} from "@/components/ui/checkbox";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import Link from "next/link";
import {motion} from "motion/react";

const reserveSchema = z.object({
    date: z.date({
        required_error: "Date is required",
    }),
    time: z.string({
        required_error: "Time is required",
    }),
    numberOfGuests: z
        .number({
            required_error: "Number of guests is required",
        })
        .int("Please enter a whole number")
        .positive("Number of guests must be positive")
        .max(12, "Maximum 12 guests allowed per reservation")
        .min(1, "At least 1 guest is required"),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email("Please enter a valid email address"),
    name: z
        .string({
            required_error: "Name is required",
        })
        .min(1, "Please enter your name"),
    phoneNumber: z
        .string({
            required_error: "Phone number is required",
        })
        .min(10, "Please enter a valid phone number"),
    useExistingDetails: z.boolean(),
});

export type ReserveFormValues = z.infer<typeof reserveSchema>;

const ReserveForm = (): React.ReactNode => {
    const {tables, setTables, setDate, setTime, user, setReservations} = useReserve();

    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [successfulReservation, setSuccessfulReservation] =
        React.useState<Reservation | null>(null);

    const form = useForm<ReserveFormValues>({
        resolver: zodResolver(reserveSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            numberOfGuests: 2,
            date: new Date(),
            time: undefined,
            useExistingDetails: false,
        },
    });

    async function onSubmit(data: ReserveFormValues): Promise<void> {
        if (tables.length === 0) {
            toast.error("Please select a table");
            return;
        }
        if (tables.reduce((acc, table) => acc + table.seats, 0) < data.numberOfGuests) {
            toast.error("Selected tables do not have enough seats");
            return;
        }
        if (
            tables.reduce((acc, table) => acc + table.seats, 0) >
            2 * data.numberOfGuests
        ) {
            toast.error(
                `You only have ${data.numberOfGuests} guests, please select fewer tables or seats.`,
            );
            return;
        }
        const reservation = await createReservation(
            data,
            tables.map((table) => table.name),
            user,
        );
        if (!reservation) {
            toast.error("Failed to create reservation");
        } else {
            setDialogOpen(true);
            setSuccessfulReservation(reservation);
            setReservations((reservations) => [...reservations, reservation]);
        }
    }

    const date = form.watch("date");
    const time = form.watch("time");

    React.useEffect(() => {
        setDate(date);
        setTables([]);
    }, [date]);

    React.useEffect(() => {
        setTime(time);
        setTables([]);
    }, [time]);

    React.useEffect(() => {
        if (user) {
            form.setValue("useExistingDetails", true);
            form.setValue("name", user.user_metadata?.name || "");
            form.setValue("email", user.email || "");
            form.setValue("phoneNumber", user.user_metadata?.phone || "");
        }
    }, [user]);

    return (
        <motion.div
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{type: "spring", stiffness: 70, delay: 0.1}}
            className="flex flex-col flex-1 border-2 shadow-md bg-background/40 rounded-lg h-fit p-6"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {user ? (
                        <FormField
                            control={form.control}
                            name="useExistingDetails"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(
                                                checked: CheckboxPrimitive.CheckedState,
                                            ) => {
                                                field.onChange(checked === true);
                                                if (
                                                    checked === true &&
                                                    user.user_metadata
                                                ) {
                                                    form.setValue(
                                                        "name",
                                                        user.user_metadata.name || "",
                                                    );
                                                    form.setValue(
                                                        "email",
                                                        user.email || "",
                                                    );
                                                    form.setValue(
                                                        "phoneNumber",
                                                        user.user_metadata.phone || "",
                                                    );
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none text-primary">
                                        <FormLabel>Use my account to reserve</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    ) : (
                        <Link href={"/login"}>
                            <Button variant={"link"} className="p-0">
                                Sign in to better manage your reservations.
                            </Button>
                        </Link>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>NAME</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            disabled={form.watch("useExistingDetails")}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>EMAIL</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="email@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            disabled={form.watch("useExistingDetails")}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>PHONE NUMBER</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(123) 456-7890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            disabled={form.watch("useExistingDetails")}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfGuests"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel># OF GUESTS</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Number of guests"
                                            type="number"
                                            min={1}
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(parseInt(e.target.value))
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="date"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>DATE</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal rounded",
                                                        !field.value &&
                                                            "text-muted-foreground",
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 text-primary" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            className="w-auto p-0 overflow-hidden text-primary"
                                            align="start"
                                        >
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                fromDate={new Date()}
                                                initialFocus
                                                className="bg-background"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="time"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>TIME</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a time" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[
                                                "11:00 AM",
                                                "12:00 PM",
                                                "1:00 PM",
                                                "2:00 PM",
                                                "3:00 PM",
                                                "4:00 PM",
                                                "5:00 PM",
                                                "6:00 PM",
                                                "7:00 PM",
                                                "8:00 PM",
                                                "9:00 PM",
                                            ].map((time) => (
                                                <SelectItem key={time} value={time}>
                                                    {time}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full mt-2">
                        Reserve Seats
                    </Button>
                </form>
            </Form>
            <ReserveDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                reservation={successfulReservation || null}
            />
        </motion.div>
    );
};

export default ReserveForm;
