import {Toaster} from "@/components/ui/sonner";
import {Analytics} from "@vercel/analytics/next";
import type {Metadata} from "next";
import {Ubuntu} from "next/font/google";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
    title: "Sprout & About",
    description: "TSA Webmaster 2024-2025 Project",
};

const homemadeApple = localFont({
    src: "./fonts/HomemadeApple-Regular.ttf",
    variable: "--font-homemade-apple",
});

const ubuntu = Ubuntu({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    variable: "--font-ubuntu",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element {
    return (
        <html lang="en">
            <body
                className={`${ubuntu.className} ${homemadeApple.variable} antialiased min-h-screen flex flex-col`}
                suppressHydrationWarning
            >
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-[20]">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-100/30 via-yellow-100/30 to-emerald-100/30 scale-110" />

                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-200/80 rounded-full blur-3xl opacity-30" />
                    <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-yellow-300 rounded-full blur-3xl opacity-20" />
                    <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-emerald-200 rounded-full blur-3xl opacity-30" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:32px_32px] opacity-30" />
                </div>
                <Toaster richColors />
                {/* <CursorEffects /> */}
                <main className="flex-grow">{children}</main>
                <Analytics />
            </body>
        </html>
    );
}
