import {Button} from "@/components/ui/button";
import {Metadata} from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "About | Sprout & About",
    description: "Learn about our journey, mission, and impact in sustainable dining",
};

export default function AboutPage(): React.JSX.Element {
    return (
        <main className="relative min-h-screen container mx-auto">
            <div className="flex justify-center">
                <Link href={"/references"}>
                    <Button variant="link" className="underline text-xl">
                        References
                    </Button>
                </Link>
                <a href={"/pdf/work-log-1.pdf"} rel="noopener noreferrer">
                    <Button variant="link" className="underline text-xl">
                        Work Log 1
                    </Button>
                </a>
                <a href={"/pdf/work-log-2.pdf"} rel="noopener noreferrer">
                    <Button variant="link" className="underline text-xl">
                        Work Log 2
                    </Button>
                </a>
                <a href={"/pdf/work-log-3.pdf"} rel="noopener noreferrer">
                    <Button variant="link" className="underline text-xl">
                        Work Log 3
                    </Button>
                </a>
            </div>
        </main>
    );
}
