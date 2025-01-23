"use server";

import {createClient} from "@/lib/supabase/server";
import {CustomerDetails} from "@/types";

// Result type for auth operations
interface AuthResult {
    success: boolean;
    error?: string;
}

// Create new account and sign in user
export async function createAccountAndSignIn(
    customerDetails: CustomerDetails,
    password: string,
): Promise<AuthResult> {
    try {
        const supabase = createClient();

        // Create new user account
        const {data: authData, error: signUpError} = await supabase.auth.signUp({
            email: customerDetails.email,
            password: password,
            options: {
                data: {
                    name: customerDetails.name,
                    phone: customerDetails.phone,
                },
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });

        if (signUpError) {
            throw signUpError;
        }

        if (!authData.user) {
            throw new Error("Failed to create user account");
        }

        // Create user record in our database
        const {error: createUserError} = await supabase.from("users").insert({
            id: authData.user.id,
            is_admin: false,
        });

        if (createUserError) {
            throw createUserError;
        }

        // Sign in the new user
        const {error: signInError} = await supabase.auth.signInWithPassword({
            email: customerDetails.email,
            password: password,
        });

        if (signInError) {
            throw signInError;
        }

        return {success: true};
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create account and sign in",
        };
    }
}

export async function logoutUser(): Promise<{
    success: boolean;
    message: string;
    data: null;
}> {
    try {
        const supabase = createClient();
        const response = await supabase.auth.signOut();
        console.log(response);
        if (response.error !== null) {
            return {success: false, message: response.error.message, data: null};
        }
        return {success: true, message: "Logged Out Successfully", data: null};
    } catch {
        return {success: false, message: "Failed to Log Out", data: null};
    }
}
