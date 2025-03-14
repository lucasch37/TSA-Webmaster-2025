"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ImpactChart from "@/features/about/impact-chart";
import dynamic from "next/dynamic";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// Dynamically import the farm map component
const FarmMap = dynamic(() => import("@/features/about/farm-map"), {ssr: false});

// Data from the original components
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

// Animation variants for text fade-in
const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
            duration: 0.6, 
            ease: "easeOut" 
        }
    }
};

// Animation variants for text reveal
const textReveal = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.04 * i,
        }
    })
};

const letterAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

export default function AboutContent(): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ 
        target: containerRef,
        offset: ["start start", "end end"] 
    });
    
    // Create parallax effect for images
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    
    return (
        <div ref={containerRef} className="relative">
            {/* Hero Section with Background Image */}
            <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <motion.div 
                    className="absolute inset-0 z-0"
                    style={{ y: y1 }}
                >
                    <Image 
                        src="/about/story.jpg" 
                        alt="Sprout & About story" 
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>
                
                <div className="container relative z-10 text-white">
                    <motion.h1 
                        className="text-6xl md:text-8xl font-bold text-center mb-5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        ABOUT US
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Our journey from farm to table and our commitment to sustainable dining
                    </motion.p>
                </div>
            </div>
            
            {/* Story Section */}
            <section className="py-20">
                <div className="container mx-auto">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-12 text-center">OUR STORY</h2>
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <p className="mb-6 text-lg">
                                    Founded in 2010 in the rolling hills outside of Spokane,
                                    Sprout & About began as a family's passionate quest to
                                    create sustainable food for our local community. What
                                    started as a small farm stand has blossomed into a beloved
                                    institution that has been family-run for over five
                                    decades.
                                </p>
                                <p className="mb-6 text-lg">
                                    Each dish we serve carries with it generations of love,
                                    knowledge, and passion for plant-based cuisine. Throughout
                                    our journey, we've remained committed to our original
                                    vision: creating delicious, sustainable food that
                                    nourishes both people and planet.
                                </p>
                                <p className="text-lg">
                                    Today, our family continues to innovate while honoring
                                    traditional practices that respect the land and celebrate
                                    the bounty of the Pacific Northwest. Our recipes have
                                    evolved, but our commitment to quality, sustainability,
                                    and community has remained unwavering.
                                </p>
                            </div>
                            <div className="relative overflow-hidden rounded-lg shadow-xl h-[500px]">
                                <Image 
                                    src="/about/story.jpg" 
                                    alt="Our story" 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Mission Section */}
            <section className="py-20 border-t border-b">
                <div className="container mx-auto">
                    <motion.div 
                        className="max-w-6xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-12 text-center">OUR MISSION</h2>
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="order-2 md:order-1 relative overflow-hidden rounded-lg shadow-xl h-[500px]">
                                <Image 
                                    src="/about/mission.jpg" 
                                    alt="Our mission" 
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="order-1 md:order-2">
                                <p className="mb-6 text-lg">
                                    At Sprout & About, our mission extends beyond serving
                                    delicious plant-based meals. We're committed to making
                                    sustainable food more accessible and common for everyone
                                    in our community. We believe that good food should be
                                    available to all, regardless of dietary preferences or
                                    restrictions.
                                </p>
                                <p className="mb-6 text-lg">
                                    We believe in transparency and education,{" "}
                                    <Tooltip delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <span className="text-primary underline font-medium">
                                                which is why we openly share the recipes for
                                                all our menu items
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-[300px] text-center">
                                            Click on the sustainability info button on the
                                            page of any menu item to view recipes,
                                            ingredients, and more!
                                        </TooltipContent>
                                    </Tooltip>
                                    . We want you to be able to recreate our dishes at home
                                    and incorporate more plant-based meals into your daily
                                    life. Our cooking classes and community workshops further
                                    this mission by empowering people with the skills to
                                    prepare nutritious, sustainable meals.
                                </p>
                                <p className="text-lg">
                                    Our business isn't driven by profit margins but by a deep
                                    responsibility to make our earth greener and our community
                                    healthier. Every meal served is a step toward a more
                                    sustainable future, and we're proud to be part of the
                                    solution to our planet's environmental challenges.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Impact Section */}
            <section className="py-20">
                <div className="container mx-auto">
                    <motion.div 
                        className="max-w-5xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-12 text-center">OUR IMPACT</h2>
                        <p className="mb-12 text-lg text-center max-w-3xl mx-auto">
                            By choosing plant-based ingredients and sustainable
                            practices, we're making a measurable difference in our
                            environmental footprint. Here's how our efforts
                            translate into real-world savings compared to
                            conventional restaurants.
                        </p>

                        <div className="mb-12">
                            <ImpactChart data={impactData} />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            <motion.div 
                                className="p-6 rounded-lg border-2"
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-green-700 mb-3">
                                    CO2 Savings
                                </h3>
                                <p className="">
                                    Our plant-based menu saves approximately
                                    18,000 kg of CO2 emissions annually compared
                                    to restaurants serving conventional animal
                                    products. That's equivalent to taking 4 cars
                                    off the road for an entire year.
                                </p>
                            </motion.div>
                            <motion.div 
                                className="p-6 rounded-lg border-2"
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold text-green-700 mb-3">
                                    Water Conservation
                                </h3>
                                <p className="">
                                    By focusing on plant-based ingredients, we
                                    save over 600,000 gallons of water annually
                                    compared to restaurants serving conventional
                                    animal products. That's enough water to fill
                                    an Olympic-sized swimming pool 1.5 times.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Preparation Section with Farm Map */}
            <section className="py-20 border-t border-b">
                <div className="container mx-auto">
                    <motion.div 
                        className="max-w-5xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-12 text-center">PREPARATION</h2>
                        <div className="mb-10">
                            <div className="text-lg text-center max-w-3xl mx-auto mb-16">
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
                            
                            <motion.h3 
                                className="text-3xl font-semibold text-primary mb-8 text-center"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                Our Main Practices
                            </motion.h3>

                            <div className="max-w-5xl mx-auto">
                                <div className="grid md:grid-cols-3 gap-6">
                                    <motion.div 
                                        className="px-4 py-8 rounded-xl border-2"
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                            <span className="text-green-700 text-2xl">
                                                ♻️
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                            Zero Waste Kitchen
                                        </h3>
                                        <p className="text-center text-sm">
                                            We compost all food scraps, use minimal
                                            packaging, and have implemented water and
                                            energy conservation measures throughout
                                            our facility. Our goal is to send nothing
                                            to landfill by 2026.
                                        </p>
                                    </motion.div>
                                    <motion.div 
                                        className="px-4 py-8 rounded-xl border-2"
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                            <span className="text-green-700 text-2xl">
                                                🌱
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                            Local First Policy
                                        </h3>
                                        <p className="text-center text-sm">
                                            Over 90% of our ingredients come from
                                            within 50 miles of our kitchen, minimizing
                                            transportation emissions and supporting
                                            our local economy. We work directly with
                                            farmers to ensure fair prices.
                                        </p>
                                    </motion.div>
                                    <motion.div 
                                        className="px-4 py-8 rounded-xl border-2"
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4 mx-auto border">
                                            <span className="text-green-700 text-2xl">
                                                ☀️
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-green-700 mb-4 text-center">
                                            Renewable Energy
                                        </h3>
                                        <p className="text-center text-sm">
                                            Our kitchen and dining areas are powered
                                            by renewable energy sources, and we're
                                            working toward carbon neutrality by 2025.
                                            Our rooftop solar array provides 60% of
                                            our electricity needs.
                                        </p>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-24">
                            <motion.h3 
                                className="text-3xl font-semibold text-primary mb-8 text-center"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                Our Partner Farms
                            </motion.h3>

                            <div className="max-w-5xl mx-auto">
                                <p className="mb-8 text-lg text-center">
                                    We're proud to work with the finest local farms in
                                    the Spokane region. Every ingredient on your plate
                                    can be traced back to these sustainable and
                                    ethically-operated farms.
                                </p>

                                <motion.div 
                                    className="h-[450px] rounded-lg overflow-hidden mb-10"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <FarmMap locations={farmLocations} />
                                </motion.div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {farmLocations.map((farm, index) => (
                                        <motion.div
                                            key={index}
                                            className="p-6 rounded-lg border-2"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1, duration: 0.5 }}
                                            viewport={{ once: true }}
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
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* Research Section */}
            <section className="py-20">
                <div className="container mx-auto">
                    <motion.div 
                        className="max-w-4xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-12 text-center">RESEARCH</h2>
                        <div className="mb-16">
                            <p className="mb-8 text-lg text-center">
                                At Sprout & About, we celebrate a plant-powered
                                lifestyle that delights your palate while protecting
                                our planet. Below is a comprehensive review of
                                research from reputable sources detailing the
                                environmental, health, social, and economic benefits
                                of adopting vegan and vegetarian diets.
                            </p>
                        </div>
                        
                        <div className="space-y-16">
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Introduction
                                </h3>
                                <p className="mb-4 text-lg">
                                    Our modern food system is one of the largest
                                    contributors to global greenhouse gas (GHG)
                                    emissions, excessive land use, and water
                                    depletion. Animal agriculture alone is
                                    responsible for a significant percentage of
                                    these emissions. Transitioning to a
                                    plant-based diet isn't merely a personal
                                    health choice—it is an environmental
                                    imperative.
                                </p>
                                <p className="text-lg">
                                    This research brings together extensive
                                    information from diverse sources including
                                    academic studies, governmental reports, and
                                    reputable media outlets. It offers an in-depth
                                    look at how vegan and vegetarian diets can
                                    help reduce emissions, conserve natural
                                    resources, and improve public health.
                                </p>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Environmental Impact of Animal Agriculture
                                </h3>
                                <p className="mb-4 text-lg">
                                    Animal-based foods, particularly beef and
                                    dairy, generate substantial greenhouse gas
                                    emissions, require vast amounts of land, and
                                    consume enormous quantities of water. Research
                                    has shown that beef production can produce up
                                    to nearly 100 kg of CO₂-equivalent per
                                    kilogram, while plant-based proteins have a
                                    fraction of that impact.
                                </p>
                                <p className="mb-4 text-lg">
                                    Studies reveal that plant-based diets can
                                    reduce GHG emissions by 50–75%, decrease land
                                    use by up to 76%, and lower water consumption
                                    by 14–21% compared to diets heavy in animal
                                    products. By reducing the environmental
                                    footprint of our food, we can help mitigate
                                    climate change and preserve ecosystems.
                                </p>
                                <ul className="list-disc ml-8 space-y-2 text-lg">
                                    <li>
                                        <strong>Greenhouse Gas Emissions:</strong>{" "}
                                        Transitioning to plant-based diets
                                        significantly lowers carbon footprints.
                                    </li>
                                    <li>
                                        <strong>Land Use & Biodiversity:</strong>{" "}
                                        Reduced meat consumption spares land for
                                        forests and natural habitats.
                                    </li>
                                    <li>
                                        <strong>Water Use:</strong> Plant-based
                                        food production requires much less water
                                        than raising livestock.
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Health Benefits of Plant-Based Diets
                                </h3>
                                <p className="mb-4 text-lg">
                                    Numerous studies have demonstrated that
                                    well-planned vegan and vegetarian diets are
                                    associated with lower risks of chronic
                                    diseases such as heart disease, type 2
                                    diabetes, and certain cancers. In addition to
                                    their reduced environmental impact, these
                                    diets offer high intakes of fiber,
                                    antioxidants, vitamins, and minerals.
                                </p>
                                <p className="mb-4 text-lg">
                                    Key health benefits include:
                                </p>
                                <ul className="list-disc ml-8 space-y-2 text-lg">
                                    <li>
                                        <strong>Reduced Chronic Disease:</strong>{" "}
                                        Lower risk of heart disease, diabetes, and
                                        some cancers.
                                    </li>
                                    <li>
                                        <strong>Weight Management:</strong>{" "}
                                        Improved body weight control and lower
                                        obesity rates.
                                    </li>
                                    <li>
                                        <strong>Nutritional Advantages:</strong>{" "}
                                        High in fiber, antioxidants, and essential
                                        nutrients.
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Economic & Social Benefits
                                </h3>
                                <p className="mb-4 text-lg">
                                    Adopting plant-based diets can lead to
                                    significant economic and social benefits. For
                                    instance, lower healthcare costs can result
                                    from reduced rates of chronic diseases.
                                    Moreover, the growing market for plant-based
                                    products drives innovation and job creation
                                    within sustainable food sectors.
                                </p>
                                <ul className="list-disc ml-8 space-y-2 text-lg">
                                    <li>
                                        <strong>Cost Savings:</strong> Unprocessed
                                        plant-based foods are often more
                                        affordable than animal products.
                                    </li>
                                    <li>
                                        <strong>
                                            Job Creation & Innovation:
                                        </strong>{" "}
                                        Expansion of plant-based alternatives
                                        spurs economic growth and innovation.
                                    </li>
                                    <li>
                                        <strong>Social Equity:</strong> Improved
                                        access to nutritious, sustainable food
                                        options promotes social justice.
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Barriers, Myths & Misconceptions
                                </h3>
                                <p className="mb-4 text-lg">
                                    Despite compelling evidence, several myths and
                                    barriers persist regarding plant-based diets.
                                    Common misconceptions include the belief that
                                    vegans cannot build muscle or that all vegan
                                    foods are highly processed and unhealthy. In
                                    reality, with careful planning, vegan diets
                                    provide all essential nutrients and can
                                    support robust athletic performance.
                                </p>
                                <p className="text-lg">
                                    Other challenges include cultural resistance,
                                    issues of accessibility, and the higher cost
                                    of some trendy processed alternatives.
                                    Educating consumers and supporting policy
                                    measures are key to overcoming these hurdles.
                                </p>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true, amount: 0.5 }}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Policy & Future Trends
                                </h3>
                                <p className="mb-4 text-lg">
                                    Governments around the world are beginning to
                                    take notice. Proposed policies include taxing
                                    high-emission animal products and subsidizing
                                    plant-based alternatives. These measures,
                                    along with initiatives to promote sustainable
                                    agriculture and reduce food waste, could lead
                                    to dramatic reductions in global emissions.
                                </p>
                                <p className="text-lg">
                                    As awareness grows and technology advances,
                                    the plant-based and cellular agriculture
                                    sectors are poised for unprecedented growth.
                                    Innovations in alternative proteins,
                                    sustainable packaging, and food distribution
                                    continue to create opportunities for
                                    environmentally conscious businesses.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* References Section */}
            <section className="py-16 border-t">
                <div className="container mx-auto">
                    <motion.div 
                        className="text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-8">REFERENCES</h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Visit our references page to learn more about the research and sources behind our sustainability claims.
                        </p>
                        <Link 
                            href="/references" 
                            className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            View References
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 