import {Button} from "@/components/ui/button";
import {Metadata} from "next";
import Link from "next/link";
import React from "react";
import ImpactChart from "@/features/about/impact-chart";
import FarmMap from "@/features/about/farm-map";

export const metadata: Metadata = {
    title: "About | Sprout & About",
    description: "Learn about our journey, mission, and impact in sustainable dining",
};

const impactData = [
    {month: "Jan", co2: 1250, water: 45000},
    {month: "Feb", co2: 1320, water: 47500},
    {month: "Mar", co2: 1400, water: 50000},
    {month: "Apr", co2: 1550, water: 52000},
    {month: "May", co2: 1680, water: 55000},
    {month: "Jun", co2: 1800, water: 58000},
    {month: "Jul", co2: 1950, water: 62000},
    {month: "Aug", co2: 2100, water: 65000},
    {month: "Sep", co2: 1950, water: 61000},
    {month: "Oct", co2: 1800, water: 57000},
    {month: "Nov", co2: 1650, water: 53000},
    {month: "Dec", co2: 1500, water: 49000},
];

const farmLocations = [
    {
        name: "LINC Foods",
        address: "3808 N Sullivan Rd #12p, Spokane Valley, WA 99216",
        description:
            "A worker-owned cooperative connecting local farms to our kitchen, providing us with seasonal vegetables and fruits.",
        position: [47.6901, -117.1895],
    },
    {
        name: "PNW Coop",
        address: "6109 E Desmet Spokane Valley, WA 99212",
        description:
            "Specializing in organic grains and legumes, this farm cooperative helps us create our signature plant-based proteins.",
        position: [47.6923, -117.2698],
    },
    {
        name: "Vinegar Flats",
        address: "2121 S Cherry St, Spokane, WA 99224",
        description:
            "An urban farm providing us with year-round greens and specialty herbs for our most popular dishes.",
        position: [47.6373, -117.4018],
    },
    {
        name: "Cedar + Taylor Farm",
        address: "9616 South Cedar Road Spokane, WA 99224",
        description:
            "A family-owned farm that supplies us with heirloom varieties of vegetables and organic berries.",
        position: [47.5963, -117.4467],
    },
];

export default function AboutPage(): React.JSX.Element {
    return (
        <main className="relative min-h-screen pb-20">
            <div className="container mx-auto px-4 py-16">
                <div className="mb-10">
                    <div className="flex items-center justify-center mb-2">
                        <h2 className="text-4xl font-bold text-green-800 text-center">
                            Our Story
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto p-8 rounded-lg ">
                        <p className=" mb-6 text-lg ">
                            Founded in 1969 in the rolling hills outside of Spokane,
                            Sprout & About began as a family's passionate quest to create
                            sustainable food for our local community. What started as a
                            small farm stand has blossomed into a beloved institution that
                            has been family-run for over five decades.
                        </p>
                        <p className=" mb-6 text-lg ">
                            Each dish we serve carries with it generations of love,
                            knowledge, and passion for plant-based cuisine. Throughout our
                            journey, we've remained committed to our original vision:
                            creating delicious, sustainable food that nourishes both
                            people and planet.
                        </p>
                        <p className=" text-lg ">
                            Today, the third generation of our family continues to
                            innovate while honoring traditional practices that respect the
                            land and celebrate the bounty of the Pacific Northwest. Our
                            recipes have evolved, but our commitment to quality,
                            sustainability, and community has remained unwavering.
                        </p>
                    </div>
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-center mb-2">
                        <h2 className="text-4xl font-bold text-green-800 text-center">
                            Our Mission
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto p-8 rounded-lg  ">
                        <p className=" mb-6 text-lg ">
                            At Sprout & About, our mission extends beyond serving
                            delicious plant-based meals. We're committed to making
                            sustainable food more accessible and common for everyone in
                            our community. We believe that good food should be available
                            to all, regardless of dietary preferences or restrictions.
                        </p>
                        <p className=" mb-6 text-lg ">
                            We believe in transparency and education, which is why we
                            openly share the recipes for all our menu items. We want you
                            to be able to recreate our dishes at home and incorporate more
                            plant-based meals into your daily life. Our cooking classes
                            and community workshops further this mission by empowering
                            people with the skills to prepare nutritious, sustainable
                            meals.
                        </p>
                        <p className=" text-lg">
                            Our business isn't driven by profit margins but by a deep
                            responsibility to make our earth greener and our community
                            healthier. Every meal served is a step toward a more
                            sustainable future, and we're proud to be part of the solution
                            to our planet's environmental challenges.
                        </p>
                    </div>
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-center mb-4">
                        <h2 className="text-4xl font-bold text-green-800 text-center">
                            Our Commitment to Sustainability
                        </h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-lg">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-green-700 text-2xl">♻️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                    Zero Waste Kitchen
                                </h3>
                                <p className=" text-center">
                                    We compost all food scraps, use minimal packaging, and
                                    have implemented water and energy conservation
                                    measures throughout our facility. Our goal is to send
                                    nothing to landfill by 2026.
                                </p>
                            </div>
                            <div className="p-8 rounded-lg">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-green-700 text-2xl">🌱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                    Local First Policy
                                </h3>
                                <p className=" text-center">
                                    Over 90% of our ingredients come from within 50 miles
                                    of our kitchen, minimizing transportation emissions
                                    and supporting our local economy. We work directly
                                    with farmers to ensure fair prices.
                                </p>
                            </div>
                            <div className="p-8 rounded-lg">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-green-700 text-2xl">☀️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                    Renewable Energy
                                </h3>
                                <p className=" text-center">
                                    Our kitchen and dining areas are powered by renewable
                                    energy sources, and we're working toward carbon
                                    neutrality by 2025. Our rooftop solar array provides
                                    60% of our electricity needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-center mb-4">
                        <h2 className="text-4xl font-bold text-green-800 text-center">
                            Our Partner Farms
                        </h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <p className=" mb-8 text-lg text-center max-w-3xl mx-auto">
                            We're proud to work with the finest local farms in the Spokane
                            region. Every ingredient on your plate can be traced back to
                            these sustainable and ethically-operated farms.
                        </p>

                        <div className="h-[450px] rounded-lg overflow-hidden mb-10">
                            <FarmMap locations={farmLocations} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {farmLocations.map((farm, index) => (
                                <div key={index} className="p-6 rounded-lg">
                                    <h3 className="text-xl font-semibold text-green-700 mb-2">
                                        {farm.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-3">
                                        {farm.address}
                                    </p>
                                    <p className="">{farm.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-10">
                    <div className="flex items-center justify-center mb-10">
                        <h2 className="text-4xl font-bold text-green-800 text-center">
                            Our Impact
                        </h2>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <p className="text-gray-700 mb-8 text-lg text-center max-w-3xl mx-auto">
                            By choosing plant-based ingredients and sustainable practices,
                            we're making a measurable difference in our environmental
                            footprint. Here's how our efforts translate into real-world
                            savings compared to conventional restaurants.
                        </p>

                        <div className="mb-6">
                            <ImpactChart data={impactData} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <div className="p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-700 mb-3">
                                    CO2 Savings
                                </h3>
                                <p className="text-gray-700">
                                    Our plant-based menu saves approximately 18,000 kg of
                                    CO2 emissions annually compared to restaurants serving
                                    conventional animal products. That's equivalent to
                                    taking 4 cars off the road for an entire year.
                                </p>
                            </div>
                            <div className="p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-green-700 mb-3">
                                    Water Conservation
                                </h3>
                                <p className="text-gray-700">
                                    By focusing on plant-based ingredients, we save over
                                    600,000 gallons of water annually compared to
                                    restaurants serving conventional animal products.
                                    That's enough water to fill an Olympic-sized swimming
                                    pool 1.5 times.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex flex-wrap justify-center gap-6 mt-16 pt-8 border-t border-green-100">
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
                </div>
            </div>
        </main>
    );
}
