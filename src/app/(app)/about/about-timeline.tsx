"use client";

import {Timeline} from "@/components/ui/timeline";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import ImpactChart from "@/features/about/impact-chart";
import {Atom, Bike, Droplet, Flame, Recycle, Sun, Zap} from "lucide-react";
import {motion} from "motion/react";
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
const FarmMap = dynamic(() => import("@/features/about/farm-map"), {ssr: false});

const farmLocations = [
    {
        name: "LINC Foods",
        address: "3808 N Sullivan Rd, Spokane Valley, WA 99216",
        href: "https://www.lincfoods.com/",
        description:
            "A worker-owned cooperative connecting local farms to our kitchen, providing us with seasonal vegetables and fruits.",
        position: [47.6901, -117.1895],
    },
    {
        name: "PNW Co-op",
        address: "6109 E Desmet Spokane Valley, WA 99212",
        href: "https://www.pnw.coop/",
        description:
            "Specializing in organic grains and legumes, this farm cooperative helps us create our signature plant-based proteins.",
        position: [47.6923, -117.2698],
    },
    {
        name: "Vinegar Flats Farm",
        address: "2121 S Cherry St, Spokane, WA 99224",
        href: "https://www.vinegarflatsfarm.com/",
        description:
            "An urban farm providing us with year-round greens and specialty herbs for our most popular dishes.",
        position: [47.6373, -117.4018],
    },
    {
        name: "Cedar Taylor Farm",
        address: "9616 South Cedar Road Spokane, WA 99224",
        href: "https://eatlocalfirst.org/listing/spokane/cedar-taylor-farm/",
        description:
            "A family-owned farm that supplies us with heirloom varieties of vegetables and organic berries.",
        position: [47.5963, -117.4467],
    },
];

const farmInfo = [
    {
        quote: "A worker-owned cooperative connecting local farms to our kitchen, providing us with seasonal vegetables and fruits.",
        name: "LINC Foods",
        designation: "3808 N Sullivan Rd, Spokane Valley, WA 99216",
        src: "/about/prep.jpg",
        logo: "/about/logos/linc.png",
        href: "https://www.lincfoods.com/",
    },
    {
        quote: "Specializing in organic grains and legumes, this farm cooperative helps us create our signature plant-based proteins.",
        name: "PNW Co-op",
        designation: "6109 E Desmet Spokane Valley, WA 99212",
        src: "/pnwcoop.jpg",
        logo: "/about/logos/pnwcoop.png",
        href: "https://www.pnw.coop/",
    },
    {
        quote: "An urban farm providing us with year-round greens and specialty herbs for our most popular dishes.",
        name: "Vinegar Flats Farm",
        designation: "2121 S Cherry St, Spokane, WA 99224",
        src: "/vinegarflatsfarm.jpg",
        logo: "/about/logos/vinegarflats.png",
        href: "https://www.vinegarflatsfarm.com/",
    },
    {
        quote: "A family-owned farm that supplies us with heirloom varieties of vegetables and organic berries.",
        name: "Cedar Taylor Farm",
        designation: "9616 South Cedar Road Spokane, WA 99224",
        src: "/cedartaylorfarm.jpg",
        logo: "/about/logos/cedartaylor.jpg",
        href: "https://eatlocalfirst.org/listing/spokane/cedar-taylor-farm/",
    },
];

export function AboutTimeline({
    farmTableRef,
    preparationRef,
}: {
    farmTableRef: React.RefObject<HTMLDivElement>;
    preparationRef: React.RefObject<HTMLDivElement>;
}): React.ReactNode {
    const data = [
        {
            title: "Our Story",
            content: (
                <div className="mb-32">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70}}
                        className="relative overflow-hidden rounded-lg shadow-xl h-[500px] border-2"
                    >
                        <Image
                            src="/about/story.jpg"
                            alt="Our story"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="mt-4 font-medium italic text-lg mb-8"
                    >
                        Spokane, Washington: Where it all started.
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.2}}
                        className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg"
                    >
                        <p className="mb-6">
                            Founded in 2010 in the rolling hills outside of Spokane,
                            Sprout & About began as a family's passionate quest to create
                            sustainable food for our local community. What started as a
                            small farm stand has blossomed into a beloved institution that
                            has been family-run for over a decade.
                        </p>
                        <p className="mb-6">
                            Each dish we serve carries with it generations of love,
                            knowledge, and passion for plant-based cuisine. Throughout our
                            journey, we've remained committed to our original vision:
                            creating delicious, sustainable food that nourishes both
                            people and planet.
                        </p>
                        <p className="">
                            Our family continues to innovate while honoring traditional
                            practices that respect the land and celebrate the bounty of
                            the Pacific Northwest. Our recipes have evolved, but our
                            commitment to quality, sustainability, and community has
                            remained unwavering.
                        </p>
                    </motion.div>
                </div>
            ),
        },
        {
            title: "Our Mission",
            content: (
                <div className="grid items-center mb-32">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70}}
                        className="relative overflow-hidden rounded-lg shadow-xl h-[500px] border-2"
                    >
                        <Image
                            src="/about/mission.jpg"
                            alt="Our mission"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="mt-4 font-medium italic text-lg mb-8"
                    >
                        We aim to spread the gifts of sustainable food to all.
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.2}}
                        className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg"
                    >
                        <p className="mb-6 text-lg">
                            At Sprout & About, our mission extends beyond serving
                            delicious plant-based meals. We're committed to making
                            sustainable food more accessible and common for everyone in
                            our community. We believe that good food should be available
                            to all, regardless of dietary preferences or restrictions.
                        </p>
                        <p className="mb-6 text-lg">
                            We believe in transparency and education,{" "}
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <span className="text-primary underline font-semibold">
                                        which is why we openly share the recipes for all
                                        our menu items
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-[300px] text-center">
                                    Click on the sustainability info button on the page of
                                    any menu item to view recipes, ingredients, and more!
                                </TooltipContent>
                            </Tooltip>
                            . We want you to be able to recreate our dishes at home and
                            incorporate more plant-based meals into your daily life. Our
                            cooking classes and community workshops further this mission
                            by empowering people with the skills to prepare nutritious,
                            sustainable meals.
                        </p>
                        <p className="text-lg">
                            Our business isn't driven by profit margins but by a deep
                            responsibility to make our earth greener and our community
                            healthier. Every meal served is a step toward a more
                            sustainable future, and we're proud to be part of the solution
                            to our planet's environmental challenges.
                        </p>
                    </motion.div>
                </div>
            ),
        },
        {
            title: "Our Impact",
            content: (
                <div className="mb-32">
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="mb-8 hidden md:flex"
                    >
                        <ImpactChart />
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg mb-8"
                    >
                        By choosing plant-based ingredients and sustainable practices,
                        we're making a measurable difference in our environmental
                        footprint. Here's how our efforts translate into real-world
                        savings compared to conventional restaurants.
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mx-auto mb-8">
                        <motion.div
                            className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg"
                            initial={{x: -50, opacity: 0}}
                            whileInView={{x: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                        >
                            <h3 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-3">
                                <div className="p-2 border rounded-full">
                                    <Atom />
                                </div>
                                CO2 Savings
                            </h3>
                            <p className="text-sm">
                                Our plant-based menu saves approximately 18,000 kg of CO2
                                emissions annually compared to restaurants serving
                                conventional animal products. That's equivalent to taking
                                4 cars off the road for an entire year.
                            </p>
                        </motion.div>
                        <motion.div
                            className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg"
                            initial={{x: 50, opacity: 0}}
                            whileInView={{x: 0, opacity: 1}}
                            transition={{duration: 0.5, delay: 0.2}}
                            viewport={{once: true}}
                        >
                            <h3 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-3">
                                <div className="p-2 border rounded-full">
                                    <Droplet />
                                </div>
                                Water Conservation
                            </h3>
                            <p className="text-sm">
                                By focusing on plant-based ingredients, we save over
                                600,000 gallons of water annually compared to restaurants
                                serving conventional animal products. That's enough water
                                to fill an Olympic-sized swimming pool 1.5 times.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="relative overflow-hidden rounded-lg shadow-xl h-[500px] border-2"
                    >
                        <Image
                            src="/process-ss.png"
                            alt="Our mission"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.2}}
                        className="mt-4 font-medium italic text-lg mb-8"
                    >
                        Positive environmental impacts for each specific dish can be
                        viewed on our website!
                    </motion.div>
                </div>
            ),
        },
        {
            title: "Farm to Table",
            content: (
                <div className="mb-32" ref={farmTableRef}>
                    <motion.h3
                        className="text-3xl font-semibold text-primary mb-8 text-center flex md:flex-row flex-col items-center gap-3 justify-center"
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                    >
                        <span className="rounded-xl px-4 py-1 bg-primary text-white">
                            Step 1:
                        </span>
                        Sourcing Ingredients
                    </motion.h3>

                    <motion.p
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg mb-8"
                    >
                        We're proud to work with the finest local farms in the Spokane
                        region. Every ingredient on your plate can be traced back to these
                        sustainable and ethically-operated farms. In working with these
                        farms, we not only reduce harmful emissions from long
                        transportation and packaging, but we also support local businesses
                        and promote sustainable agricultural practices.
                    </motion.p>

                    <motion.div
                        className="h-[450px] rounded-lg overflow-hidden"
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                    >
                        <FarmMap locations={farmLocations} />
                    </motion.div>

                    <div className="mt-4 font-medium italic text-lg mb-8">
                        All 4 locations of our partner farms. All 4 are very close to our
                        restaurant!
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {farmInfo.map((farm, index) => (
                            <div key={index}>
                                <motion.div
                                    initial={{opacity: 0, x: index % 2 === 0 ? -50 : 50}}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 70,
                                        delay: 0.1,
                                    }}
                                    className="relative overflow-hidden rounded-lg shadow-xl h-[200px] border-2 mb-8"
                                >
                                    <Image
                                        src={farm.src}
                                        alt="Our mission"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div
                                    className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg"
                                    initial={{opacity: 0, x: index % 2 === 0 ? -50 : 50}}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 70,
                                        delay: 0.1,
                                    }}
                                >
                                    <a
                                        href={farm.href}
                                        referrerPolicy="no-referrer"
                                        target="_blank"
                                        className="text-2xl font-semibold text-green-700 mb-2 underline"
                                    >
                                        {farm.name}
                                    </a>
                                    <p className="text-sm text-primary mb-3 mt-2">
                                        {farm.designation}
                                    </p>
                                    <p className="">{farm.quote}</p>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="relative overflow-hidden rounded-lg shadow-xl h-[500px] border-2"
                    >
                        <Image
                            src="/source-ss.png"
                            alt="Our mission"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.2}}
                        className="mt-4 font-medium italic text-lg mb-12"
                    >
                        Souces for main ingredients for each dish can be viewed on our
                        website!
                    </motion.div>

                    <motion.h3
                        className="text-3xl font-semibold text-primary mb-8 text-center md:flex-row flex-col flex items-center gap-3 justify-center"
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                    >
                        <span className="rounded-xl px-4 py-1 bg-primary text-white">
                            Step 2:
                        </span>
                        Transporation
                    </motion.h3>

                    <motion.p
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg mb-8"
                    >
                        Since we source all our ingredients from local farms, we're able
                        to reduce emissions required for transportation heavily. We also
                        use sustainable methods of transportation to further reduce our
                        carbon footprint.
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-8 mx-auto mb-8">
                        <motion.div
                            className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg"
                            initial={{x: -50, opacity: 0}}
                            whileInView={{x: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                        >
                            <h3 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-3">
                                <div className="p-2 border rounded-full">
                                    <Zap />
                                </div>
                                Electric Vehicles
                            </h3>
                            <p className="text-sm">
                                Our delivery fleet is 100% electric, reducing our carbon
                                emissions by over 50% compared to conventional vehicles,
                                according to the IEA,. We're proud to be part of the
                                movement toward sustainable transportation.
                            </p>
                        </motion.div>
                        <motion.div
                            className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg"
                            initial={{x: 50, opacity: 0}}
                            whileInView={{x: 0, opacity: 1}}
                            transition={{duration: 0.5, delay: 0.2}}
                            viewport={{once: true}}
                        >
                            <h3 className="text-2xl font-semibold text-green-700 mb-3 flex items-center gap-3">
                                <div className="p-2 border rounded-full">
                                    <Bike />
                                </div>
                                Bicycles
                            </h3>
                            <p className="text-sm">
                                For smaller deliveries and catering orders, we use
                                bicycles to transport our food. This not only reduces
                                emissions but also allows us to navigate the city more
                                efficiently.
                            </p>
                        </motion.div>
                    </div>
                </div>
            ),
        },
        {
            title: "Preparation",
            content: (
                <div className="mb-32" ref={preparationRef}>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="relative overflow-hidden rounded-lg shadow-xl h-[500px] border-2"
                    >
                        <Image
                            src="/about/impact.jpg"
                            alt="Our story"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.h3
                        className="text-3xl font-semibold text-primary mb-8 text-center mt-8"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                    >
                        Our Main Preparation Practices
                    </motion.h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            className="px-4 py-8 rounded-xl border-2 bg-background/40 shadow-md"
                            initial={{y: 50, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            transition={{duration: 0.5}}
                            viewport={{once: true}}
                        >
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                <span className="text-green-700 text-2xl">
                                    <Recycle />
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                Zero Waste Kitchen
                            </h3>
                            <p className="text-center text-sm">
                                We compost all food scraps, use minimal packaging, and
                                have implemented water and energy conservation measures
                                throughout our facility. Our goal is to send nothing to
                                landfill by 2026.
                            </p>
                        </motion.div>
                        <motion.div
                            className="px-4 py-8 rounded-xl border-2 bg-background/40 shadow-md"
                            initial={{y: 50, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            transition={{duration: 0.5, delay: 0.2}}
                            viewport={{once: true}}
                        >
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                <span className="text-green-700 text-2xl">
                                    <Flame />
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                Efficient Cooking
                            </h3>
                            <p className="text-center text-sm">
                                We use several methods to be more efficient with out
                                cooking, such as using induction cooktops, always cooking
                                with lids on, and cooking meals in batches.
                            </p>
                        </motion.div>
                        <motion.div
                            className="px-4 py-8 rounded-xl border-2 bg-background/40 shadow-md"
                            initial={{y: 50, opacity: 0}}
                            whileInView={{y: 0, opacity: 1}}
                            transition={{duration: 0.5, delay: 0.4}}
                            viewport={{once: true}}
                        >
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                <span className="text-green-700 text-2xl">
                                    <Sun />
                                </span>
                            </div>
                            <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                Renewable Energy
                            </h3>
                            <p className="text-center text-sm">
                                Our kitchen and dining areas are powered by renewable
                                energy sources, and we're working toward carbon neutrality
                                by 2025. Our rooftop solar array provides 60% of our
                                electricity needs.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="border-2 rounded-xl bg-background/40 shadow-md p-8 font-medium text-lg mb-8"
                    >
                        At Sprout & About, we heavily focus on sustainable preparation
                        practices.{" "}
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <span className="text-primary underline font-semibold">
                                    For each of our menu items, we provide a detailed
                                    breakdown of the ingredients, their sources, and the
                                    preparation process.
                                </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-[300px] text-center">
                                Click on the sustainability info button on the page of any
                                menu item to view recipes, ingredients, and more!
                            </TooltipContent>
                        </Tooltip>{" "}
                        We're proud to work with local farmers and suppliers who share our
                        commitment to sustainability.
                    </motion.div>

                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.1}}
                        className="relative overflow-hidden rounded-lg shadow-xl h-[500px] border-2"
                    >
                        <Image
                            src="/practice-ss.png"
                            alt="Our mission"
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 30}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{type: "spring", stiffness: 70, delay: 0.2}}
                        className="mt-4 font-medium italic text-lg mb-12"
                    >
                        Our preferred sustainable preparation methods for each dish can be
                        viewed on our website!
                    </motion.div>
                </div>
            ),
        },
    ];
    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
