import {createClient} from "@/lib/supabase/client";
import {CustomerDetails} from "@/types";

interface AuthResult {
    success: boolean;
    error?: string;
}

export async function createAccountAndSignIn(
    customerDetails: CustomerDetails,
    password: string,
): Promise<AuthResult> {
    try {
        const supabase = createClient();

        const {error: signUpError} = await supabase.auth.signUp({
            email: customerDetails.email,
            password: password,
            options: {
                data: {
                    name: customerDetails.name,
                    phone: customerDetails.phone,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (signUpError) {
            throw signUpError;
        }

        const {error: signInError} = await supabase.auth.signInWithPassword({
            email: customerDetails.email,
            password: password,
        });

        if (signInError) {
            throw signInError;
        }

        return {success: true};
    } catch (error) {
        console.error("Auth error:", error);
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create account and sign in",
        };
    }
}
