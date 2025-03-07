import {CursorEffects} from "@/components/cursor-effects";
import {Toaster} from "@/components/ui/sonner";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import localFont from "next/font/local";
import React from "react";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Sprout & About",
    description: "TSA Webmaster 2024-2025 Project",
};

const homemadeApple = localFont({
    src: "./fonts/HomemadeApple-Regular.ttf",
    variable: "--font-homemade-apple",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): React.JSX.Element {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${homemadeApple.variable} antialiased min-h-screen flex flex-col`}
                suppressHydrationWarning
            >
                <Toaster richColors />
                <CursorEffects />
                <main className="flex-grow">{children}</main>
            </body>
        </html>
    );
}
