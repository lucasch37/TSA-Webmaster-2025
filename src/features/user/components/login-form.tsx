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
        <div className="max-w-[30rem] mx-auto w-full shadow-input px-8 py-10 text-primary bg-background rounded-[2rem]">
            <div className="flex justify-center font-semibold text-4xl tracking-tight">
                Welcome Back
            </div>
            <div className="text-center mt-6 text-base font-medium">
                Log in to view summaries of past orders, gain reward points, and track
                your reservations.
            </div>
            <form className="mt-6" onSubmit={signIn}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">EMAIL</Label>
                    <Input
                        id="email"
                        placeholder="Email"
                        type="email"
                        className="bg-background "
                    />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">PASSWORD</Label>
                    <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        className="bg-background"
                    />
                </LabelInputContainer>

                <Button type="submit" className="w-full mt-4">
                    Continue
                    <ArrowRight size={18} />
                </Button>
                {/* <div className="flex mt-8 text-base font-medium text-primary items-center justify-center">
                    Don't have an account?{" "}
                    <span className="underline mx-1 font-semibold">
                        <Link href={"/signup"}>Sign up</Link>
                    </span>{" "}
                    <ArrowRight size={16} />
                </div> */}
            </form>
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
