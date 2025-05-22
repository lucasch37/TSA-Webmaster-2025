"use client";

import {Button} from "@/components/ui/button";
import {ArrowLeft, CircleGauge, Edit, ListCheck} from "lucide-react";
import Link from "next/link";

export function AdminNavbar(): React.JSX.Element {
    return (
        <header>
            <div className="h-fit py-6">
                <div className="flex justify-between items-center h-full container">
                    <Link href={"/admin"} className="w-32 flex flex-col justify-center">
                        <div className="font-bold text-base text-center text-primary font-homemade-apple">
                            Sprout &<br />
                            About
                        </div>
                        <div className="text-primary text-center font-bold">
                            ADMIN PORTAL
                        </div>
                    </Link>

                    <div
                        id="navbar"
                        className="border border-primary rounded-full py-2 px-6 hidden lg:flex gap-8 text-primary justify-center w-fit"
                    >
                        <Link
                            href={"/admin"}
                            className="flex gap-2 items-center nav-link"
                        >
                            <CircleGauge size={20} /> DASHBOARD
                        </Link>
                        <Link
                            href={"/admin/menu"}
                            className="flex gap-2 items-center nav-link"
                        >
                            <Edit size={20} /> MENU EDITOR
                        </Link>
                        <Link
                            href={"/admin/orders"}
                            className="flex gap-2 items-center nav-link"
                        >
                            <ListCheck size={20} /> ORDERS
                        </Link>
                    </div>

                    <Link href={"/account"} className="w-32" id="return">
                        <Button>
                            <ArrowLeft size={20} className="" /> RETURN
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Bottom navbar for mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-primary shadow-lg p-2 z-50">
                <div className="flex justify-around items-center text-primary">
                    <Link
                        href="/admin"
                        className="flex flex-col items-center nav-link text-xs p-1 hover:bg-primary/10 rounded-md"
                    >
                        <CircleGauge size={20} />
                        <span className="mt-1">DASHBOARD</span>
                    </Link>
                    <Link
                        href="/admin/menu"
                        className="flex flex-col items-center nav-link text-xs p-1 hover:bg-primary/10 rounded-md"
                    >
                        <Edit size={20} />
                        <span className="mt-1">MENU EDITOR</span>
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex flex-col items-center nav-link text-xs p-1 hover:bg-primary/10 rounded-md"
                    >
                        <ListCheck size={20} />
                        <span className="mt-1">ORDERS</span>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default AdminNavbar;
