import {Calendar, SquareMenu, Link as Lucide_Link} from "lucide-react";
import Link from "next/link";
import React from "react";

export function Footer(): React.JSX.Element {
    return (
        <footer className="mt-24 border-t border-primary bg-background/40">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-0">
                    {/* Contact section with phone and email */}
                    <div className="flex justify-start">
                        <div className="font-bold text-xl text-center text-primary font-homemade-apple">
                            Sprout &<br />
                            About
                        </div>
                    </div>

                    {/* Physical address section */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-primary tracking-wider uppercase">
                            Visit Us
                        </h3>
                        <div className="text-primary flex items-start gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mt-1 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span>
                                334 W Spokane Falls Blvd
                                <br />
                                Spokane, WA 99201
                            </span>
                        </div>
                    </div>

                    {/* Site navigation links */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-primary tracking-wider uppercase">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/menu"
                                    className="text-primary hover:text-primary transition-colors duration-200 flex items-center gap-2"
                                >
                                    <SquareMenu className="w-4 h-4" />
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-primary hover:text-primary transition-colors duration-200 flex items-center gap-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/reserve"
                                    className="text-primary hover:text-primary transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Reserve
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/references"
                                    className="text-primary hover:text-primary transition-colors duration-200 flex items-center gap-2"
                                >
                                    <Lucide_Link className="w-4 h-4" />
                                    References
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Restaurant mission statement */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-bold text-primary tracking-wider uppercase">
                            Our Mission
                        </h3>
                        <p className="text-primary">
                            To cultivate a sustainable and delightful dining experience,
                            while allowing sustainable food to be accessible to all.
                        </p>
                    </div>
                </div>

                {/* Copyright footer */}
                <div className="mt-8 pt-6 border-t border-primary/40">
                    <p className="text-center text-primary/80 text-sm">
                        © {new Date().getFullYear()} Sprout & About. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
