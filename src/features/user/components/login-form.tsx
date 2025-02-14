"use client";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {createClient} from "@/lib/supabase/client";
import {cn} from "@/lib/utils";
import {ArrowRight} from "lucide-react";
import {useSearchParams} from "next/navigation";
import React from "react";
import {toast} from "sonner";

export default function LoginForm(): React.JSX.Element {
    const searchParams = useSearchParams();
    const signIn = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const email = (e.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (e.currentTarget.elements[1] as HTMLInputElement).value;

        const supabase = createClient();
        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error("There was a problem signing you in. Please try again.");
        } else {
            window.location.href = searchParams.get("redirect") || "/account";
        }
    };

    return (
        <div>
            <div className="max-w-lg mx-auto w-full shadow-input px-8 md:px-0">
                <div className="flex justify-center font-semibold text-4xl text-primary tracking-tight">
                    Sign In
                </div>
                <div className="text-center mt-4 text-base">
                    Enter your details to sign in.
                </div>
                <form className="mt-6" onSubmit={signIn}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="Email" type="email" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="••••••••" type="password" />
                    </LabelInputContainer>

                    <Button type="submit" className="w-full mt-4">
                        Continue
                        <ArrowRight size={20} />
                    </Button>
                </form>
            </div>
        </div>
    );
}

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}): React.JSX.Element => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
    );
};
