"use client";

import * as React from "react";
import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThemeToggle = (): React.JSX.Element => {
    const {theme, setTheme} = useTheme();
    const isLightMode =
        theme === "light" ||
        (theme === "system" &&
            window.matchMedia("(prefers-color-scheme: light)").matches);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun
                        className={`h-[1.2rem] w-[1.2rem] transition-all ${isLightMode ? "text-black" : "text-yellow-500"} dark:rotate-0 dark:scale-0`}
                    />
                    <Moon
                        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${isLightMode ? "text-gray-600" : "text-white"} rotate-90 scale-0 dark:rotate-0 dark:scale-100`}
                    />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
