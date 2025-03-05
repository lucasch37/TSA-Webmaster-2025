"use client";

import React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";

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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Table} from "@/types";
import {useReserve} from "./reserve-context";

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
        .max(6, "Maximum 6 guests allowed per reservation")
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
        .min(10, "Phone number must be at least 10 digits"),
});

type ReserveFormValues = z.infer<typeof reserveSchema>;

const ReserveForm = () => {
    const {setTables} = useReserve();

    const form = useForm<ReserveFormValues>({
        resolver: zodResolver(reserveSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            numberOfGuests: 2,
        },
    });

    function onSubmit(data: ReserveFormValues) {
        // Handle form submission
        console.log(data);
    }

    return (
        <div className="rounded-lg shadow-sm">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(123) 456-7890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfGuests"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel># OF GUESTS</FormLabel>
                                    <FormControl>
                                        <Input
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
                                        onValueChange={() => {
                                            field.onChange;
                                            setTables([]);
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a time" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[
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
                    <Button type="submit" className="w-full">
                        Reserve Table
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ReserveForm;
