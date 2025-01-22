"use client";

import React from "react";
import { CustomerDetails, Cart } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { createClient } from "@/lib/supabase/client";
import { createCheckoutSession } from "@/lib/actions/checkout";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { z } from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { getUser } from "@/lib/actions/getUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { createAccountAndSignIn } from "@/lib/actions/auth";

// Validation schemas
const customerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number"),
});

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
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
    subtotal: number;
    user: User | null;
    userPoints: number;
}

export default function CheckoutForm({
    cart,
    subtotal,
    user,
    userPoints,
}: CheckoutFormProps): React.JSX.Element {
    const [signInOpen, setSignInOpen] = React.useState(false);
    const [signInLoading, setSignInLoading] = React.useState(false);

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

    const signInForm = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

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

    const onSubmit = async (values: CheckoutFormValues) => {
        try {
            // If user wants to create an account, do it before checkout
            if (!user && values.createAccount && values.password) {
                const result = await createAccountAndSignIn(
                    values.customerDetails,
                    values.password
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

    const onSignInSubmit = async (values: z.infer<typeof signInSchema>) => {
        setSignInLoading(true);

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });

            if (error) {
                throw error;
            }

            const user = await getUser();

            if (user?.user_metadata) {
                form.setValue("customerDetails", {
                    email: user.email || "",
                    name: user.user_metadata.name || "",
                    phone: user.user_metadata.phone || "",
                });
            }

            setSignInOpen(false);
            toast.success("Signed in successfully!");
            window.location.reload();
        } catch {
            toast.error("Failed to sign in. Please check your credentials.");
        } finally {
            setSignInLoading(false);
            signInForm.reset();
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Details</CardTitle>
                <CardDescription className="space-y-2">
                    <p>We'll use these details to notify you when your order is ready</p>
                    {!user && (
                        <Dialog open={signInOpen} onOpenChange={setSignInOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="link"
                                    className="text-primary p-0 h-auto"
                                >
                                    Already have an account? Sign in here
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Sign In</DialogTitle>
                                    <DialogDescription>
                                        Sign in to your account for faster checkout
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...signInForm}>
                                    <form onSubmit={signInForm.handleSubmit(onSignInSubmit)} className="space-y-4">
                                        <FormField
                                            control={signInForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={signInForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Password" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full" disabled={signInLoading}>
                                            {signInLoading ? "Signing in..." : "Sign In"}
                                        </Button>
                                    </form>
                                </Form>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {user && (
                            <FormField
                                control={form.control}
                                name="useExistingDetails"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked: CheckboxPrimitive.CheckedState) => {
                                                    field.onChange(checked === true);
                                                    if (checked === true && user.user_metadata) {
                                                        form.setValue("customerDetails", {
                                                            email: user.email || "",
                                                            name: user.user_metadata.name || "",
                                                            phone: user.user_metadata.phone || "",
                                                        });
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Use my account details</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="customerDetails.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Name for pickup"
                                            {...field}
                                            disabled={user && form.watch("useExistingDetails")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="customerDetails.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            placeholder="We'll text you when your order is ready"
                                            {...field}
                                            disabled={user && form.watch("useExistingDetails")}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="customerDetails.email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="For your receipt"
                                            {...field}
                                            disabled={user && form.watch("useExistingDetails")}
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
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked: CheckboxPrimitive.CheckedState) => field.onChange(checked === true)}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Create an account for faster checkout next time</FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {form.watch("createAccount") && (
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
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
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={(checked: CheckboxPrimitive.CheckedState) => field.onChange(checked === true)}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Use Sustainability Points</FormLabel>
                                                <FormDescription>
                                                    Available: {userPoints} (Usable: {calculateMaxPointsToUse()})
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                {form.watch("usePoints") && calculateMaxPointsToUse() > 0 && (
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Points Discount</span>
                                        <span className="text-green-600">
                                            -${(calculateMaxPointsToUse() / 25).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
                            <span>Total</span>
                            <span className="text-primary">${calculateTotal().toFixed(2)}</span>
                        </div>

                        <Button type="submit" className="w-full">
                            Continue to Payment
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
