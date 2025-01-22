"use client";

import {motion} from "framer-motion";
import {ArrowLeft, UserRoundCog} from "lucide-react";
import Link from "next/link";
import React from "react";

// Admin navigation bar component
const AdminNavbar = (): React.JSX.Element => {
    return (
        <div className="inset-x-0 top-0 z-0 h-fit py-6">
            <div className="flex items-center justify-between h-full gap-2 container">
                {/* Logo and brand name */}
                <Link href={"/"} className="flex items-center gap-2 w-32">
                    <div className="font-bold text-2xl text-center text-primary font-homemade-apple">
                        Sprout &<br />
                        About
                    </div>
                </Link>

                {/* Navigation buttons */}
                <div className="flex gap-8">
                    {/* Admin portal label */}
                    <button className="flex gap-2 items-center text-primary text-lg font-medium">
                        <UserRoundCog size={20} /> ADMIN PORTAL
                    </button>

                    {/* Return to main site button */}
                    <motion.div
                        initial={{scale: 0.9}}
                        animate={{scale: 1}}
                        whileHover={{scale: 1.05}}
                        transition={{type: "spring", stiffness: 80}}
                        className="border border-primary rounded-full py-1 px-4 flex text-primary"
                    >
                        <Link href={"/"}>
                            <button className="flex gap-2 items-center nav-link">
                                <ArrowLeft size={20} /> RETURN
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
