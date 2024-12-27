import {createBrowserClient} from "@supabase/ssr";

export const createClient = (): void => {
    createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
};
