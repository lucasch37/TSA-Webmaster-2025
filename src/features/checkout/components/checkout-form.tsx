"use client";

import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
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
import {createCheckoutSession} from "@/features/checkout/actions/checkout";
import {createAccountAndSignIn} from "@/features/user/actions/auth";
import {Cart, MenuItem} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {User} from "@supabase/supabase-js";
import {ArrowRight} from "lucide-react";
import Link from "next/link";
import React from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";
import {z} from "zod";

// Validation schemas
const customerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
});

const checkoutFormSchema = z.object({
    customerDetails: customerSchema,
    createAccount: z.boolean().default(false),
    password: z.string().optional(),
    usePoints: z.boolean().default(false),
    useExistingDetails: z.boolean().default(true),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutFormProps {
    cart: Cart;
    user: User | null;
    userPoints: number;
    menu: MenuItem[];
}

export default function CheckoutForm({
    cart,
    user,
    userPoints,
    menu,
}: CheckoutFormProps): React.JSX.Element {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [checkoutValues, setCheckoutValues] = React.useState<CheckoutFormValues>();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            customerDetails: {
                email: user?.email || "",
                name: user?.user_metadata?.name || "",
                phone: user?.user_metadata?.phone || "",
            },
            createAccount: false,
            usePoints: false,
            useExistingDetails: true,
        },
    });

    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    const subtotal = cart.items.reduce((sum, item) => {
        const menuItem = getMenuItem(item.menuItemId);
        if (!menuItem) {
            return sum;
        }
        const itemPrice = menuItem.price * (1 - menuItem.sale_percentage / 100);
        return sum + itemPrice * item.quantity;
    }, 0);

    // Calculate maximum points that can be used (based on total)
    const calculateMaxPointsToUse = (): number => {
        const maxPointsPossible = Math.floor(subtotal * 25);
        const maxPoints = Math.min(userPoints, maxPointsPossible);
        return Math.floor(maxPoints / 25) * 25;
    };

    const calculateTotal = (): number => {
        if (form.watch("usePoints")) {
            const maxPoints = calculateMaxPointsToUse();
            const pointsDiscount = maxPoints / 25;
            return Math.max(0, subtotal - pointsDiscount);
        }
        return subtotal;
    };

    const onSubmit = async (values: CheckoutFormValues): Promise<void> => {
        setCheckoutValues(values);
        setDialogOpen(true);
    };

    const handleCheckout = async (values: CheckoutFormValues): Promise<void> => {
        try {
            // If user wants to create an account, do it before checkout
            if (!user && values.createAccount && values.password) {
                const result = await createAccountAndSignIn(
                    values.customerDetails,
                    values.password,
                );

                if (!result.success) {
                    toast.error(result.error || "Failed to create account");
                    return;
                }

                toast.success("Account created successfully!");
            }

            const pointsToUse = values.usePoints ? calculateMaxPointsToUse() : 0;
            const result = await createCheckoutSession(
                cart,
                values.customerDetails,
                pointsToUse,
            );

            if (!result.success) {
                toast.error(result.error || "Failed to create checkout session");
                return;
            }

            if (result.url) {
                window.location.href = result.url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("An error occurred during checkout");
        }
    };

    return (
        <div className="border-2 p-4">
            <div>
                {!user && (
                    <Link href={"/login?redirect=/checkout"}>
                        <Button variant={"link"} className="text-primary p-0 h-auto">
                            Already have an account? Sign in here
                        </Button>
                    </Link>
                )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {user && (
                        <FormField
                            control={form.control}
                            name="useExistingDetails"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-6">
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
                                                    form.setValue("customerDetails", {
                                                        email: user.email || "",
                                                        name:
                                                            user.user_metadata.name || "",
                                                        phone:
                                                            user.user_metadata.phone ||
                                                            "",
                                                    });
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none text-primary">
                                        <FormLabel>Use my account details</FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="customerDetails.name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-primary">Full Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name for pickup"
                                        {...field}
                                        disabled={
                                            (user && form.watch("useExistingDetails")) ||
                                            false
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="customerDetails.phone"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-primary">
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="tel"
                                        placeholder="We'll text you when your order is ready"
                                        {...field}
                                        disabled={
                                            (user && form.watch("useExistingDetails")) ||
                                            false
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="customerDetails.email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-primary">Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="For your receipt"
                                        {...field}
                                        disabled={
                                            (user && form.watch("useExistingDetails")) ||
                                            false
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!user && (
                        <>
                            <FormField
                                control={form.control}
                                name="createAccount"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(
                                                    checked: CheckboxPrimitive.CheckedState,
                                                ) => field.onChange(checked === true)}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-primary">
                                                Create an account for faster checkout next
                                                time
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {form.watch("createAccount") && (
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Create a password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </>
                    )}

                    {user && userPoints > 0 && (
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="usePoints"
                                render={({field}) => (
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(
                                                    checked: CheckboxPrimitive.CheckedState,
                                                ) => field.onChange(checked === true)}
                                            />
                                        </FormControl>
                                        <div className="leading-none text-primary flex gap-3 items-center">
                                            <FormLabel>
                                                Use Sustainability Points
                                            </FormLabel>
                                            <div className="text-primary text-sm">
                                                Available: {userPoints} (Usable:{" "}
                                                {calculateMaxPointsToUse()})
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {form.watch("usePoints") && calculateMaxPointsToUse() > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                    <div className="text-primary font-semibold">
                                        Points Discount
                                    </div>
                                    <div className="text-primary text-xl font-bold">
                                        -$
                                        {(calculateMaxPointsToUse() / 25).toFixed(2)}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between items-center text-lg font-semibold border-t-2 pt-4">
                        <div className="text-primary text-xl">Total:</div>
                        <div className="text-primary text-2xl font-bold">
                            ${calculateTotal().toFixed(2)}
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-2">
                        Continue to Payment
                        <ArrowRight size={18} />
                    </Button>
                    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-primary text-2xl">
                                    IMPORTANT
                                </DialogTitle>
                            </DialogHeader>
                            <p className="text-sm text-primary mb-4">
                                To complete a purchase, use 4242-4242-4242-4242 as your
                                card number, and enter any date, CVC, name, or zipcode
                                when prompted.
                            </p>
                            <DialogFooter>
                                <Button
                                    onClick={() => handleCheckout(checkoutValues!)}
                                    className="w-full"
                                >
                                    Continue
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </form>
            </Form>
        </div>
    );
}
