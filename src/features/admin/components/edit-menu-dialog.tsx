"use client";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import {MenuItem} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import React from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";
import {editMenuItem} from "../actions/editMenuItem";

type Props = {
    item: MenuItem;
    open: boolean;
    setOpen: Function;
};

const formSchema = z.object({
    price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Price must be a positive number",
    }),
    salePercentage: z.string().optional(),
});

const EditMenuDialog = ({item, open, setOpen}: Props): React.ReactNode => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: item.price?.toString() || "",
            salePercentage: item.sale_percentage?.toString() || "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
        const updatedItem: MenuItem = {
            ...item,
            price: Number(values.price),
            sale_percentage: values.salePercentage ? Number(values.salePercentage) : 0,
        };

        await editMenuItem(updatedItem);
        setOpen(false);

        toast.success(`${updatedItem.name} updated successfully`);
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary text-2xl">
                        EDIT {item.name.toUpperCase()}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 text-primary"
                    >
                        <FormField
                            control={form.control}
                            name="price"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>PRICE ($)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="salePercentage"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>SALE PERCENTAGE</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select discount percentage" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="0">0%</SelectItem>
                                            <SelectItem value="5">5%</SelectItem>
                                            <SelectItem value="10">10%</SelectItem>
                                            <SelectItem value="15">15%</SelectItem>
                                            <SelectItem value="20">20%</SelectItem>
                                            <SelectItem value="25">25%</SelectItem>
                                            <SelectItem value="50">50%</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit" className="w-full mt-8">
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default EditMenuDialog;
