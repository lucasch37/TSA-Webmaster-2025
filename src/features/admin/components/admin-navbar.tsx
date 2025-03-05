"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {ArrowLeft, BookOpen, ShoppingBag, UserRoundCog} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export function AdminNavbar(): React.JSX.Element {
    const pathname = usePathname();

    const navItems = [
        {
            name: "Menu Editor",
            href: "/admin",
            icon: BookOpen,
            active: pathname === "/admin",
        },
        {
            name: "Orders",
            href: "/admin/orders",
            icon: ShoppingBag,
            active: pathname === "/admin/orders",
        },
    ];

    return (
        <header className="border-b">
            <div className="h-fit py-6">
                <div className="flex items-center justify-between h-full gap-2 container">
                    <Link href={"/"} className="flex items-center gap-2 w-32">
                        <div className="font-bold text-2xl text-center text-primary font-homemade-apple">
                            Sprout &<br />
                            About
                        </div>
                    </Link>

                    <div className="flex gap-8">
                        <div className="flex gap-2 items-center text-primary text-lg font-medium">
                            <UserRoundCog size={20} /> ADMIN PORTAL
                        </div>

                        <Link href={"/"}>
                            <Button>
                                <ArrowLeft size={20} className="" /> RETURN
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-background py-4">
                <nav className="container mx-auto flex space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                                item.active
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}

export default AdminNavbar;
