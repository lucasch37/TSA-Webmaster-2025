import type {Metadata} from "next";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import {Inter} from "next/font/google";
import localFont from "next/font/local";
import {CursorEffects} from "@/components/cursor-effects";
import Footer from "@/components/footer";
import React from "react";

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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <CursorEffects />
                    <main className="flex-grow">{children}</main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
