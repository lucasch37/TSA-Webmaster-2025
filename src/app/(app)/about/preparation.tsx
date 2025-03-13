"use client";

import {
    MorphingDialog,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogImage,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {PlusIcon} from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
const FarmMap = dynamic(() => import("@/features/about/farm-map"), {ssr: false});

const farmLocations = [
    {
        name: "LINC Foods",
        address: "3808 N Sullivan Rd #12p, Spokane Valley, WA 99216",
        href: "https://www.lincfoods.com/",
        description:
            "A worker-owned cooperative connecting local farms to our kitchen, providing us with seasonal vegetables and fruits.",
        position: [47.6901, -117.1895],
    },
    {
        name: "PNW Coop",
        address: "6109 E Desmet Spokane Valley, WA 99212",
        href: "https://www.pnw.coop/",
        description:
            "Specializing in organic grains and legumes, this farm cooperative helps us create our signature plant-based proteins.",
        position: [47.6923, -117.2698],
    },
    {
        name: "Vinegar Flats",
        address: "2121 S Cherry St, Spokane, WA 99224",
        href: "https://www.vinegarflatsfarm.com/",
        description:
            "An urban farm providing us with year-round greens and specialty herbs for our most popular dishes.",
        position: [47.6373, -117.4018],
    },
    {
        name: "Cedar + Taylor Farm",
        address: "9616 South Cedar Road Spokane, WA 99224",
        href: "https://eatlocalfirst.org/listing/spokane/cedar-taylor-farm/",
        description:
            "A family-owned farm that supplies us with heirloom varieties of vegetables and organic berries.",
        position: [47.5963, -117.4467],
    },
];

const Preparation = (): React.ReactNode => {
    return (
        <MorphingDialog>
            <MorphingDialogTrigger
                style={{
                    borderRadius: "12px",
                }}
                className="flex flex-col overflow-hidden border"
            >
                <MorphingDialogImage
                    src="/about/prep.jpg"
                    alt="our story"
                    className="h-56 w-full object-cover"
                />
                <div className="flex grow flex-row items-center justify-between px-3 py-3 border-t">
                    <div>
                        <MorphingDialogTitle className="text-xl font-semibold text-primary">
                            PREPARATION
                        </MorphingDialogTitle>
                    </div>
                    <button
                        type="button"
                        className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border text-primary hover:bg-primary/10 transition-all"
                        aria-label="Open dialog"
                    >
                        <PlusIcon size={12} />
                    </button>
                </div>
            </MorphingDialogTrigger>
            <MorphingDialogContainer className="relative">
                <MorphingDialogContent
                    style={{
                        borderRadius: "24px",
                    }}
                    className="pointer-events-auto relative flex h-auto w-full flex-col border-2 bg-background max-w-[400px] md:max-w-[900px] max-h-[400px] md:max-h-[800px]  overflow-auto p-6"
                >
                    <MorphingDialogImage
                        src="/about/prep.jpg"
                        alt="our story"
                        className="h-[500px] w-full object-cover rounded-2xl border-2"
                    />
                    <div className="py-8 px-2">
                        <MorphingDialogTitle className="text-4xl font-bold text-primary">
                            PREPARATION
                        </MorphingDialogTitle>
                        <MorphingDialogDescription
                            disableLayoutAnimation
                            variants={{
                                initial: {opacity: 0, scale: 0.8, y: 100},
                                animate: {opacity: 1, scale: 1, y: 0},
                                exit: {opacity: 0, scale: 0.8, y: 100},
                            }}
                            className="mt-6"
                        >
                            <div className="mb-10">
                                <div className="text-lg">
                                    At Sprout & About, we heavily focus on sustainable
                                    preparation practices.{" "}
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <span className="text-primary underline font-medium">
                                                For each of our menu items, we provide a
                                                detailed breakdown of the ingredients,
                                                their sources, and the preparation
                                                process.
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-[300px] text-center">
                                            Click on the sustainability info button on the
                                            page of any menu item to view recipes,
                                            ingredients, and more!
                                        </TooltipContent>
                                    </Tooltip>{" "}
                                    We're proud to work with local farmers and suppliers
                                    who share our commitment to sustainability.
                                </div>
                                <div className="flex mb-8 mt-12">
                                    <h2 className="text-3xl font-semibold text-primary">
                                        Our Main Practices
                                    </h2>
                                </div>

                                <div className="max-w-5xl mx-auto">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="px-4 py-8 rounded-xl border-2 bg-green-50">
                                            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                                <span className="text-green-700 text-2xl">
                                                    ♻️
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                                Zero Waste Kitchen
                                            </h3>
                                            <p className=" text-center text-sm">
                                                We compost all food scraps, use minimal
                                                packaging, and have implemented water and
                                                energy conservation measures throughout
                                                our facility. Our goal is to send nothing
                                                to landfill by 2026.
                                            </p>
                                        </div>
                                        <div className="px-4 py-8 rounded-xl border-2 bg-green-50">
                                            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                                <span className="text-green-700 text-2xl">
                                                    🌱
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                                Local First Policy
                                            </h3>
                                            <p className=" text-center text-sm">
                                                Over 90% of our ingredients come from
                                                within 50 miles of our kitchen, minimizing
                                                transportation emissions and supporting
                                                our local economy. We work directly with
                                                farmers to ensure fair prices.
                                            </p>
                                        </div>
                                        <div className="px-4 py-8 rounded-xl border-2 bg-green-50">
                                            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                                <span className="text-green-700 text-2xl">
                                                    ☀️
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                                Renewable Energy
                                            </h3>
                                            <p className=" text-center text-sm">
                                                Our kitchen and dining areas are powered
                                                by renewable energy sources, and we're
                                                working toward carbon neutrality by 2025.
                                                Our rooftop solar array provides 60% of
                                                our electricity needs.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="flex mb-4 mt-16">
                                    <h2 className="text-3xl font-semibold text-primary">
                                        Our Partner Farms
                                    </h2>
                                </div>

                                <div className="max-w-5xl mx-auto">
                                    <p className=" mb-8 text-lg">
                                        We're proud to work with the finest local farms in
                                        the Spokane region. Every ingredient on your plate
                                        can be traced back to these sustainable and
                                        ethically-operated farms.
                                    </p>

                                    <div className="h-[450px] rounded-lg overflow-hidden mb-10">
                                        <FarmMap locations={farmLocations} />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        {farmLocations.map((farm, index) => (
                                            <div
                                                key={index}
                                                className="p-6 rounded-lg border-2 bg-green-50"
                                            >
                                                <a
                                                    href={farm.href}
                                                    referrerPolicy="no-referrer"
                                                    target="_blank"
                                                    className="text-xl font-semibold text-green-700 mb-2 underline"
                                                >
                                                    {farm.name}
                                                </a>
                                                <p className="text-sm text-primary mb-3">
                                                    {farm.address}
                                                </p>
                                                <p className="">{farm.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MorphingDialogDescription>
                    </div>
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>
    );
};

export default Preparation;
