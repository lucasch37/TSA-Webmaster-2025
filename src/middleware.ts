import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getUser} from "./features/user/actions/getUser";
import createIntlMiddleware from "next-intl/middleware";
import {routing} from "./il8n/routing";

// Create the i18n middleware
const intlMiddleware = createIntlMiddleware(routing);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
    // First handle i18n
    const response = await intlMiddleware(request);

    // Then handle authentication
    const user = await getUser();
    if (request.nextUrl.pathname.startsWith("/account")) {
        if (!user) {
            return NextResponse.rewrite(new URL("/login", request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith("/login")) {
        if (user) {
            return NextResponse.rewrite(new URL("/account", request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith("/admin")) {
        if (!user) {
            return NextResponse.rewrite(new URL("/login", request.url));
        }
    }
    return response;
}

// Combine both matcher configurations
export const config = {
    matcher: [
        // Match all pathnames except for
        // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
        // - … the ones containing a dot (e.g. `favicon.ico`)
        "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
        // Also match specific routes for authentication
        "/login",
        "/account",
        "/admin/:path",
    ],
};
