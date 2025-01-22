"use client";

import React, {useState} from "react";
import {CustomerDetails, Cart} from "@/types";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {createClient} from "@/lib/supabase/client";
import {createCheckoutSession} from "@/lib/actions/checkout";
import {toast} from "sonner";
import {User} from "@supabase/supabase-js";
import {z} from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

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

const checkoutSchema = z.object({
    customerDetails: customerSchema,
    password: z
        .string()
        .optional()
        .refine(
            (val) => {
                if (typeof window !== "undefined") {
                    const createAccountCheckbox = document.getElementById(
                        "createAccount",
                    ) as HTMLInputElement;
                    if (createAccountCheckbox?.checked) {
                        return val && val.length >= 6;
                    }
                }
                return true;
            },
            {
                message:
                    "Password must be at least 6 characters when creating an account",
            },
        ),
});

type ValidationErrors = {
    [key: string]: string[] | undefined;
};

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
    const [loading, setLoading] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);
    const [password, setPassword] = useState("");
    const [usePoints, setUsePoints] = useState(false);
    const [useExistingDetails, setUseExistingDetails] = useState(true);
    const [signInOpen, setSignInOpen] = useState(false);
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signInLoading, setSignInLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        email: user?.email || "",
        name: user?.user_metadata?.name || "",
        phone: user?.user_metadata?.phone || "",
    });

    // Calculate maximum points that can be used (based on total)
    const calculateMaxPointsToUse = (): number => {
        // Maximum points that could be used (25 points = $1)
        const maxPointsPossible = Math.floor(subtotal * 25);
        // Get max points in increments of 25
        const maxPoints = Math.min(userPoints, maxPointsPossible);
        return Math.floor(maxPoints / 25) * 25;
    };

    const calculateTotal = (): number => {
        // Only apply points discount if checkbox is checked
        if (usePoints) {
            const maxPoints = calculateMaxPointsToUse();
            const pointsDiscount = maxPoints / 25;
            return Math.max(0, subtotal - pointsDiscount);
        }
        return subtotal;
    };

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setCustomerDetails((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({...prev, [name]: undefined}));
    };

    // Validate form using Zod schemas
    const validateForm = (): boolean => {
        try {
            checkoutSchema.parse({
                customerDetails,
                password: createAccount ? password : undefined,
            });
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: ValidationErrors = {};
                error.errors.forEach((err) => {
                    const field = err.path[err.path.length - 1] as string;
                    if (!fieldErrors[field]) {
                        fieldErrors[field] = [];
                    }
                    fieldErrors[field]?.push(err.message);
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            const pointsToUse = usePoints ? calculateMaxPointsToUse() : 0;
            const result = await createCheckoutSession(
                cart,
                customerDetails,
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
        } finally {
            setLoading(false);
        }
    };

    // Handle user sign in
    const handleSignIn = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        try {
            signInSchema.parse({email: signInEmail, password: signInPassword});
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: ValidationErrors = {};
                error.errors.forEach((err) => {
                    const field = err.path[err.path.length - 1] as string;
                    if (!fieldErrors[field]) {
                        fieldErrors[field] = [];
                    }
                    fieldErrors[field]?.push(err.message);
                });
                setErrors(fieldErrors);
                return;
            }
        }

        setSignInLoading(true);

        try {
            const supabase = createClient();
            const {error} = await supabase.auth.signInWithPassword({
                email: signInEmail,
                password: signInPassword,
            });

            if (error) {
                throw error;
            }

            const {
                data: {user},
            } = await supabase.auth.getUser();

            if (user?.user_metadata) {
                setCustomerDetails({
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
            setSignInEmail("");
            setSignInPassword("");
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
                                <form onSubmit={handleSignIn} className="space-y-4">
                                    <div>
                                        <Label htmlFor="signInEmail">Email</Label>
                                        <Input
                                            id="signInEmail"
                                            type="email"
                                            value={signInEmail}
                                            onChange={(e) => {
                                                setSignInEmail(e.target.value);
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    email: undefined,
                                                }));
                                            }}
                                            required
                                            className={
                                                errors.email ? "border-red-500" : ""
                                            }
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.email.join(", ")}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="signInPassword">Password</Label>
                                        <Input
                                            id="signInPassword"
                                            type="password"
                                            value={signInPassword}
                                            onChange={(e) => {
                                                setSignInPassword(e.target.value);
                                                setErrors((prev) => ({
                                                    ...prev,
                                                    password: undefined,
                                                }));
                                            }}
                                            required
                                            className={
                                                errors.password ? "border-red-500" : ""
                                            }
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-500 mt-1">
                                                {errors.password.join(", ")}
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={signInLoading}
                                    >
                                        {signInLoading ? "Signing in..." : "Sign In"}
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {user ? (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 mb-6">
                                <Checkbox
                                    id="useExisting"
                                    checked={useExistingDetails}
                                    onCheckedChange={(checked) => {
                                        setUseExistingDetails(checked as boolean);
                                        if (checked && user.user_metadata) {
                                            setCustomerDetails({
                                                email: user.email || "",
                                                name: user.user_metadata.name || "",
                                                phone: user.user_metadata.phone || "",
                                            });
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="useExisting"
                                    className="text-sm font-medium leading-none"
                                >
                                    Use my account details
                                </label>
                            </div>

                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    value={customerDetails.name}
                                    onChange={handleInputChange}
                                    placeholder="Name for pickup"
                                    disabled={useExistingDetails}
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={customerDetails.phone}
                                    onChange={handleInputChange}
                                    placeholder="We'll text you when your order is ready"
                                    disabled={useExistingDetails}
                                    className={errors.phone ? "border-red-500" : ""}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.phone.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={customerDetails.email}
                                    onChange={handleInputChange}
                                    placeholder="For your receipt"
                                    disabled={useExistingDetails}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.join(", ")}
                                    </p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    required
                                    value={customerDetails.name}
                                    onChange={handleInputChange}
                                    placeholder="Name for pickup"
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.name.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    value={customerDetails.phone}
                                    onChange={handleInputChange}
                                    placeholder="We'll text you when your order is ready"
                                    className={errors.phone ? "border-red-500" : ""}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.phone.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={customerDetails.email}
                                    onChange={handleInputChange}
                                    placeholder="For your receipt"
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.email.join(", ")}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="createAccount"
                                    checked={createAccount}
                                    onCheckedChange={(checked) =>
                                        setCreateAccount(checked as boolean)
                                    }
                                />
                                <label
                                    htmlFor="createAccount"
                                    className="text-sm font-medium leading-none"
                                >
                                    Create an account for faster checkout next time
                                </label>
                            </div>

                            {createAccount && (
                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required={createAccount}
                                        minLength={6}
                                        className={
                                            errors.password ? "border-red-500" : ""
                                        }
                                    />
                                    {errors.password && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.password.join(", ")}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {user && userPoints > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="usePoints"
                                        checked={usePoints}
                                        onCheckedChange={(checked) =>
                                            setUsePoints(checked as boolean)
                                        }
                                    />
                                    <Label
                                        className="text-sm font-medium"
                                        htmlFor="usePoints"
                                    >
                                        Use Sustainability Points
                                    </Label>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Available: {userPoints} (Usable:{" "}
                                    {calculateMaxPointsToUse()})
                                </p>
                            </div>
                            {usePoints && calculateMaxPointsToUse() > 0 && (
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">
                                        Points Discount
                                    </span>
                                    <span className="text-green-600">
                                        -${(calculateMaxPointsToUse() / 25).toFixed(2)}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between items-center text-lg font-semibold border-t pt-4">
                        <span>Total</span>
                        <span className="text-primary">
                            ${calculateTotal().toFixed(2)}
                        </span>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Processing..." : "Continue to Payment"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
