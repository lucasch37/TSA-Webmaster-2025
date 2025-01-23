"use client";

import {motion} from "framer-motion";
import {
    Calendar,
    Home,
    MessageCircleQuestion,
    ShoppingBasket,
    SquareMenu,
    User,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {getCart} from "@/lib/cart";
import {createClient} from "@/lib/supabase/client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {toast} from "sonner";
import {User as SupabaseUser} from "@supabase/supabase-js";
import {getUser} from "@/lib/actions/getUser";
import {User as AppUser} from "@/types";

// Main navigation bar component
const Navbar = (): React.JSX.Element => {
    const [cartCount, setCartCount] = useState(0);
    const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
    const [userData, setUserData] = useState<AppUser | null>(null);
    const [dialogState, setDialogState] = useState({
        signIn: false,
        dropdown: false,
        email: "",
        password: "",
        loading: false,
    });
    const router = useRouter();
    const supabase = createClient();

    // Initialize cart count and auth state
    useEffect(() => {
        const updateCartCount = async (): Promise<void> => {
            const cart = await getCart();
            setCartCount(cart.items.length);
        };

        const checkUser = async (): Promise<void> => {
            const user = await getUser();
            setAuthUser(user);
            if (user) {
                const {data} = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", user.id)
                    .single();
                setUserData(data);
            }
        };

        checkUser();
        updateCartCount();

        // Set up auth state listener
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange(async (_event, session): Promise<void> => {
            setAuthUser(session?.user ?? null);
            if (session?.user) {
                const {data} = await supabase
                    .from("users")
                    .select("*")
                    .eq("id", session.user.id)
                    .single();
                setUserData(data);
            } else {
                setUserData(null);
            }
        });

        return (): void => {
            subscription.unsubscribe();
        };
    }, [supabase.auth]);

    // Handle user sign out
    const handleSignOut = async (): Promise<void> => {
        await supabase.auth.signOut();
        setDialogState(prev => ({...prev, dropdown: false}));
        router.push("/");
    };

    // Handle user sign in
    const handleSignIn = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        setDialogState(prev => ({...prev, loading: true}));

        try {
            const {error} = await supabase.auth.signInWithPassword({
                email: dialogState.email,
                password: dialogState.password,
            });

            if (error) {
                throw error;
            }

            setDialogState(prev => ({
                ...prev,
                signIn: false,
                dropdown: false,
                email: "",
                password: "",
            }));
            toast.success("Signed in successfully!");
        } catch {
            toast.error("Failed to sign in. Please check your credentials.");
        } finally {
            setDialogState(prev => ({...prev, loading: false}));
        }
    };

    return (
        <div className="inset-x-0 top-0 z-0 h-fit py-6">
            <div className="flex items-center justify-between h-full gap-2 container">
                {/* Logo */}
                <Link href={"/"} className="flex items-center gap-2 w-32">
                    <div className="font-bold text-2xl text-center text-primary font-homemade-apple">
                        Sprout &<br />
                        About
                    </div>
                </Link>

                {/* Navigation links */}
                <motion.div
                    initial={{scale: 0.9}}
                    animate={{scale: 1}}
                    whileHover={{scale: 1.05}}
                    transition={{type: "spring", stiffness: 80}}
                    className="border border-primary rounded-full py-2 px-6 hidden md:flex gap-8 text-primary"
                >
                    <Link href={"/"} className="flex gap-2 items-center nav-link">
                        <Home size={20} /> HOME
                    </Link>
                    <Link href={"/menu"} className="flex gap-2 items-center nav-link">
                        <SquareMenu size={20} /> MENU
                    </Link>
                    <Link href={"/about"} className="flex gap-2 items-center nav-link">
                        <MessageCircleQuestion size={20} /> ABOUT
                    </Link>
                    <Link href={"/reserve"} className="flex gap-2 items-center nav-link">
                        <Calendar size={20} /> RESERVE
                    </Link>
                </motion.div>

                {/* User menu and cart */}
                <div className="flex items-center gap-4 w-32">
                    {/* User dropdown */}
                    <DropdownMenu 
                        open={dialogState.dropdown} 
                        onOpenChange={(open) => setDialogState(prev => ({...prev, dropdown: open}))}
                    >
                        <DropdownMenuTrigger asChild>
                            <motion.button
                                initial={{scale: 0.9}}
                                animate={{scale: 1}}
                                transition={{type: "spring", stiffness: 80}}
                                className="rounded-full border border-primary hover:bg-primary hover:text-white transition ease-in-out duration-150 text-primary p-3"
                            >
                                <User />
                            </motion.button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {authUser ? (
                                <>
                                    <DropdownMenuItem disabled>
                                        {authUser.user_metadata.name || authUser.email}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account">
                                            <User className="mr-2 h-4 w-4" />
                                            Account
                                        </Link>
                                    </DropdownMenuItem>
                                    {userData?.is_admin && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin">
                                                <User className="mr-2 h-4 w-4" />
                                                Admin Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign out
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <DropdownMenuItem
                                    onClick={() => {
                                        setDialogState(prev => ({
                                            ...prev,
                                            signIn: true,
                                            dropdown: false,
                                        }));
                                    }}
                                >
                                    Sign in
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Cart button with count */}
                    <Link href="/cart">
                        <motion.div
                            initial={{scale: 0.9}}
                            animate={{scale: 1}}
                            transition={{type: "spring", stiffness: 80}}
                            className="rounded-full border border-primary hover:bg-primary hover:text-white transition ease-in-out duration-150 text-primary p-3 relative"
                        >
                            <ShoppingBasket />
                            {cartCount > 0 && (
                                <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                    {cartCount}
                                </div>
                            )}
                        </motion.div>
                    </Link>
                </div>
            </div>

            {/* Sign in dialog */}
            <Dialog 
                open={dialogState.signIn} 
                onOpenChange={(open) => setDialogState(prev => ({...prev, signIn: open}))}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Sign In</DialogTitle>
                        <DialogDescription>
                            Sign in to your account to view orders and checkout faster
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div>
                            <Label htmlFor="signInEmail">Email</Label>
                            <Input
                                id="signInEmail"
                                type="email"
                                value={dialogState.email}
                                onChange={(e) => setDialogState(prev => ({...prev, email: e.target.value}))}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="signInPassword">Password</Label>
                            <Input
                                id="signInPassword"
                                type="password"
                                value={dialogState.password}
                                onChange={(e) => setDialogState(prev => ({...prev, password: e.target.value}))}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={dialogState.loading}>
                            {dialogState.loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Navbar;
