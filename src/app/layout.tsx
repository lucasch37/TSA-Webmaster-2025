import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import localFont from "next/font/local";
import {CursorEffects} from "@/components/cursor-effects";
import Footer from "@/components/footer";
import React from "react";
import {Toaster} from "sonner";

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
                <Toaster richColors position="top-center" />
                {/* <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-green-100/40 via-yellow-100/40 to-emerald-100/40 will-change-transform scale-110" />

                    <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow will-change-transform" />
                    <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000 will-change-transform" />
                    <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-4000 will-change-transform" />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:32px_32px] opacity-30 animate-subtle-drift" />
                </div> */}
                <CursorEffects />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
