"use client";

import {useState, useEffect} from "react";
import {CustomerDetails, MenuItem} from "@/types";
import {getCart} from "@/lib/cart";
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
import Navbar from "@/components/navbar";
import {createClient} from "@/lib/supabase/client";
import {createCheckoutSession} from "@/lib/actions/checkout";
import {toast} from "sonner";
import {getMenu} from "@/lib/actions/getMenu";
import Image from "next/image";
import {Clock} from "lucide-react";
import {createAccountAndSignIn} from "@/lib/actions/auth";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {User} from "@supabase/supabase-js";
import {z} from "zod";

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

export default function CheckoutPage(): React.JSX.Element {
    const [loading, setLoading] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);
    const [password, setPassword] = useState("");
    const cart = getCart();
    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [useExistingDetails, setUseExistingDetails] = useState(true);
    const [signInOpen, setSignInOpen] = useState(false);
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPassword, setSignInPassword] = useState("");
    const [signInLoading, setSignInLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        email: "",
        name: "",
        phone: "",
    });

    useEffect(() => {
        const loadMenu = async (): Promise<void> => {
            const menuData = await getMenu();
            setMenu(menuData.data || []);
        };

        const checkUser = async (): Promise<void> => {
            const supabase = createClient();
            const {
                data: {user},
            } = await supabase.auth.getUser();
            setUser(user);

            if (user?.user_metadata) {
                const userDetails = {
                    email: user.email || "",
                    name: user.user_metadata.name || "",
                    phone: user.user_metadata.phone || "",
                };
                setCustomerDetails(userDetails);
            }
        };

        loadMenu();
        checkUser();
    }, []);

    const getMenuItem = (id: number): MenuItem | undefined =>
        menu.find((item) => item.id === id);

    const calculateTotal = (): number => {
        return cart.items.reduce((total, item) => {
            const menuItem = getMenuItem(item.menuItemId);
            if (!menuItem) {
                return total;
            }
            return (
                total +
                menuItem.price * item.quantity * (1 - menuItem.sale_percentage / 100)
            );
        }, 0);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setCustomerDetails((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev: ValidationErrors) => ({...prev, [name]: undefined}));
    };

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

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setLoading(true);

        try {
            if (!user && createAccount) {
                const {success, error} = await createAccountAndSignIn(
                    customerDetails,
                    password,
                );
                if (!success) {
                    throw new Error(error);
                }
                toast.success("Account created successfully!");
            }

            const result = await createCheckoutSession(cart, customerDetails);

            if (!result.success || !result.url) {
                throw new Error(result.error || "Failed to create checkout session");
            }

            window.location.href = result.url;
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to process checkout. Please try again.",
            );
            setLoading(false);
        }
    };

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
            setUser(user);

            if (user?.user_metadata) {
                setCustomerDetails({
                    email: user.email || "",
                    name: user.user_metadata.name || "",
                    phone: user.user_metadata.phone || "",
                });
            }

            setSignInOpen(false);
            toast.success("Signed in successfully!");
        } catch (error) {
            console.error("Sign in error:", error);
            toast.error("Failed to sign in. Please check your credentials.");
        } finally {
            setSignInLoading(false);
            setSignInEmail("");
            setSignInPassword("");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto py-8">
                <h1 className="text-4xl font-bold text-primary mb-8">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Pickup order - Ready in 15-20 minutes
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cart.items.map((item, index) => {
                                        const menuItem = getMenuItem(item.menuItemId);
                                        if (!menuItem) {
                                            return null;
                                        }

                                        return (
                                            <div
                                                key={index}
                                                className="flex gap-4 py-4 border-b last:border-0"
                                            >
                                                <div className="w-20 h-20 relative flex-shrink-0">
                                                    <Image
                                                        src={menuItem.image_url}
                                                        alt={menuItem.name}
                                                        fill
                                                        className="object-cover rounded-md"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-primary">
                                                        {menuItem.name}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                    {item.addedItems.length > 0 && (
                                                        <p className="text-sm text-primary">
                                                            Added:{" "}
                                                            {item.addedItems.join(", ")}
                                                        </p>
                                                    )}
                                                    {item.removedItems.length > 0 && (
                                                        <p className="text-sm text-primary">
                                                            Removed:{" "}
                                                            {item.removedItems.join(", ")}
                                                        </p>
                                                    )}
                                                    <p className="text-primary font-medium mt-1">
                                                        $
                                                        {(
                                                            menuItem.price *
                                                            item.quantity *
                                                            (1 -
                                                                menuItem.sale_percentage /
                                                                    100)
                                                        ).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div className="pt-4 border-t">
                                        <div className="flex justify-between items-center text-lg font-semibold">
                                            <span>Total</span>
                                            <span className="text-primary">
                                                ${calculateTotal().toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Details</CardTitle>
                                <CardDescription className="space-y-2">
                                    <p>
                                        We'll use these details to notify you when your
                                        order is ready
                                    </p>
                                    {!user && (
                                        <Dialog
                                            open={signInOpen}
                                            onOpenChange={setSignInOpen}
                                        >
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
                                                        Sign in to your account for faster
                                                        checkout
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <form
                                                    onSubmit={handleSignIn}
                                                    className="space-y-4"
                                                >
                                                    <div>
                                                        <Label htmlFor="signInEmail">
                                                            Email
                                                        </Label>
                                                        <Input
                                                            id="signInEmail"
                                                            type="email"
                                                            value={signInEmail}
                                                            onChange={(e) => {
                                                                setSignInEmail(
                                                                    e.target.value,
                                                                );
                                                                setErrors((prev) => ({
                                                                    ...prev,
                                                                    email: undefined,
                                                                }));
                                                            }}
                                                            required
                                                            className={
                                                                errors.email
                                                                    ? "border-red-500"
                                                                    : ""
                                                            }
                                                        />
                                                        {errors.email && (
                                                            <p className="text-sm text-red-500 mt-1">
                                                                {errors.email.join(", ")}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="signInPassword">
                                                            Password
                                                        </Label>
                                                        <Input
                                                            id="signInPassword"
                                                            type="password"
                                                            value={signInPassword}
                                                            onChange={(e) => {
                                                                setSignInPassword(
                                                                    e.target.value,
                                                                );
                                                                setErrors((prev) => ({
                                                                    ...prev,
                                                                    password: undefined,
                                                                }));
                                                            }}
                                                            required
                                                            className={
                                                                errors.password
                                                                    ? "border-red-500"
                                                                    : ""
                                                            }
                                                        />
                                                        {errors.password && (
                                                            <p className="text-sm text-red-500 mt-1">
                                                                {errors.password.join(
                                                                    ", ",
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <Button
                                                        type="submit"
                                                        className="w-full"
                                                        disabled={signInLoading}
                                                    >
                                                        {signInLoading
                                                            ? "Signing in..."
                                                            : "Sign In"}
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
                                                        setUseExistingDetails(
                                                            checked as boolean,
                                                        );
                                                        if (
                                                            checked &&
                                                            user.user_metadata
                                                        ) {
                                                            setCustomerDetails({
                                                                email: user.email || "",
                                                                name:
                                                                    user.user_metadata
                                                                        .name || "",
                                                                phone:
                                                                    user.user_metadata
                                                                        .phone || "",
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
                                                    className={
                                                        errors.name
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.name.join(", ")}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="phone">
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    value={customerDetails.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="We'll text you when your order is ready"
                                                    disabled={useExistingDetails}
                                                    className={
                                                        errors.phone
                                                            ? "border-red-500"
                                                            : ""
                                                    }
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
                                                    className={
                                                        errors.email
                                                            ? "border-red-500"
                                                            : ""
                                                    }
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
                                                    className={
                                                        errors.name
                                                            ? "border-red-500"
                                                            : ""
                                                    }
                                                />
                                                {errors.name && (
                                                    <p className="text-sm text-red-500 mt-1">
                                                        {errors.name.join(", ")}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="phone">
                                                    Phone Number
                                                </Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    required
                                                    value={customerDetails.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="We'll text you when your order is ready"
                                                    className={
                                                        errors.phone
                                                            ? "border-red-500"
                                                            : ""
                                                    }
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
                                                    className={
                                                        errors.email
                                                            ? "border-red-500"
                                                            : ""
                                                    }
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
                                                        setCreateAccount(
                                                            checked as boolean,
                                                        )
                                                    }
                                                />
                                                <label
                                                    htmlFor="createAccount"
                                                    className="text-sm font-medium leading-none"
                                                >
                                                    Create an account for faster checkout
                                                    next time
                                                </label>
                                            </div>

                                            {createAccount && (
                                                <div>
                                                    <Label htmlFor="password">
                                                        Password
                                                    </Label>
                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) =>
                                                            setPassword(e.target.value)
                                                        }
                                                        required={createAccount}
                                                        minLength={6}
                                                        className={
                                                            errors.password
                                                                ? "border-red-500"
                                                                : ""
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

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Processing..."
                                            : "Continue to Payment"}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
