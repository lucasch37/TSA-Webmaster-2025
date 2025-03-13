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

                    <div className="border border-primary rounded-full py-2 px-6 hidden md:flex gap-8 text-primary justify-center w-fit">
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

                    <Link href={"/account"} className="w-32">
                        <Button>
                            <ArrowLeft size={20} className="" /> RETURN
                        </Button>
                    </Link>
                </div>
                <div className="mt-6 mx-auto border border-primary rounded-full py-1 px-4 flex md:hidden gap-3 text-primary justify-center w-fit">
                    <Link
                        href={"/admin"}
                        className="flex gap-1 items-center nav-link text-xs"
                    >
                        <CircleGauge size={15} /> DASHBOARD
                    </Link>
                    <Link
                        href={"/admin/menu"}
                        className="flex gap-1 items-center nav-link text-xs"
                    >
                        <Edit size={15} /> MENU EDITOR
                    </Link>
                    <Link
                        href={"/admin/orders"}
                        className="flex gap-1 items-center nav-link text-xs"
                    >
                        <ListCheck size={15} /> ORDERS
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default AdminNavbar;
