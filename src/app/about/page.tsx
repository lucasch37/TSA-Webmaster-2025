import React from "react";
import {Metadata} from "next";
import AboutClient from "@/components/about/about-client";

export const metadata: Metadata = {
    title: "About | Sprout & About",
    description: "Learn about our journey, mission, and impact in sustainable dining",
};

export default function AboutPage(): React.JSX.Element {
    return <AboutClient />;
}
