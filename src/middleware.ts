import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {getUser} from "./features/user/actions/getUser";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest): Promise<NextResponse> {
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
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/login", "/account"],
};
