import {Metadata} from "next";
import React from "react";
import Impact from "./impact";
import Mission from "./mission";
import Preparation from "./preparation";
import Research from "./research";
import Story from "./story";
import Tsa from "./tsa";

export const metadata: Metadata = {
    title: "About | Sprout & About",
    description: "Learn about our journey, mission, and impact in sustainable dining",
};

export default function AboutPage(): React.JSX.Element {
    return (
        <div className="container mx-auto pt-16">
            <div className="text-6xl font-bold text-primary pb-6 border-b-2 mb-6">
                ABOUT US
            </div>
            <div className="grid md:grid-cols-4 gap-6">
                <Story />
                <Mission />
                <Preparation />
                <Impact />
                <Research />
                <Tsa />
            </div>
        </div>
    );
}
