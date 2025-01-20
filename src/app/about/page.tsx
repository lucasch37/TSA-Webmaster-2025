"use client";

import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import Image from "next/image";
import Navbar from "@/components/navbar";

const IMAGES = {
    dinnerParty:
        // eslint-disable-next-line no-secrets/no-secrets
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=3870&auto=format&fit=crop",
    opening:
        // eslint-disable-next-line no-secrets/no-secrets
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=3870&auto=format&fit=crop",
    garden:
        // eslint-disable-next-line no-secrets/no-secrets
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=3870&auto=format&fit=crop",
    award:
        // eslint-disable-next-line no-secrets/no-secrets
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=3870&auto=format&fit=crop",
};

export default function AboutPage(): JSX.Element {
    const containerRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <main ref={containerRef} className="relative min-h-screen bg-[hsl(55,92%,95%)]">
            {/* Enhanced Breathing Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Larger breathing gradient background */}
                <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-green-100/40 via-yellow-100/40 to-emerald-100/40 will-change-transform scale-110" />

                {/* Larger floating blobs with more pronounced animation */}
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow will-change-transform" />
                <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000 will-change-transform" />
                <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-4000 will-change-transform" />

                {/* Enhanced pattern overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:32px_32px] opacity-30 animate-subtle-drift" />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="pt-16">
                {/* Hero Section */}
                <section className="relative py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            className="max-w-3xl mx-auto text-center space-y-3"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold text-sage-950 leading-tight">
                                Our Story
                            </h1>
                            <p className="text-lg md:text-xl text-sage-800 leading-snug">
                                Crafting a sustainable future through innovative
                                vegetarian cuisine
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission Statement */}
                <section className="relative py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            viewport={{once: true}}
                            className="max-w-3xl mx-auto text-center space-y-4"
                        >
                            <h2 className="text-3xl font-bold text-sage-950">
                                Redefining Plant-Based Dining
                            </h2>
                            <p className="text-lg text-sage-800 leading-relaxed">
                                At Sprout, we believe that vegetarian cuisine can be both
                                extraordinary and sustainable. Our journey began with a
                                simple idea: to create a dining experience that celebrates
                                the power of plants while nurturing our community and
                                planet.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Timeline Journey */}
                <section className="relative py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="space-y-24">
                            <TimelineItem
                                year="2020"
                                title="The Seed of an Idea"
                                description="From intimate dinner parties to a full-fledged vision, our story began with a passion for sustainable dining."
                                image={IMAGES.dinnerParty}
                                isImageLeft={true}
                            />
                            <TimelineItem
                                year="2021"
                                title="Opening Our Doors"
                                description="We transformed a historic building into a warm, welcoming space that reflects our values."
                                image={IMAGES.opening}
                                isImageLeft={false}
                            />
                            <TimelineItem
                                year="2022"
                                title="Growing Together"
                                description="Our community garden program brought sustainable farming practices to local residents."
                                image={IMAGES.garden}
                                isImageLeft={true}
                            />
                            <TimelineItem
                                year="2023"
                                title="Recognition & Impact"
                                description="Earning the Environmental Excellence Award validated our mission of conscious dining."
                                image={IMAGES.award}
                                isImageLeft={false}
                            />
                        </div>
                    </div>
                </section>

                {/* Impact Stats */}
                <section className="relative py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            viewport={{once: true}}
                            className="text-center space-y-16"
                        >
                            <div>
                                <h2 className="text-4xl font-bold text-sage-950 mb-4">
                                    Our Impact
                                </h2>
                                <p className="text-xl text-sage-800">
                                    Making a difference, one plate at a time
                                </p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-12">
                                <ImpactStat
                                    number="15,000+"
                                    label="Local Produce (lbs)"
                                    description="Sourced directly from local farmers"
                                />
                                <ImpactStat
                                    number="30%"
                                    label="Carbon Footprint"
                                    description="Reduction in our first year"
                                />
                                <ImpactStat
                                    number="1,000+"
                                    label="Community Members"
                                    description="Engaged in our programs"
                                />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="relative py-20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{opacity: 0, y: 30}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{duration: 0.8}}
                            viewport={{once: true}}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-bold text-sage-950">
                                Join Our Journey
                            </h2>
                            <p className="text-xl text-sage-800 max-w-2xl mx-auto">
                                Experience the future of dining at Sprout. Every meal is
                                an opportunity to make a difference.
                            </p>
                            <motion.button
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                                className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl border-2 border-green-500"
                            >
                                Make a Reservation
                            </motion.button>
                        </motion.div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function TimelineItem({
    year,
    title,
    description,
    image,
    isImageLeft,
}: {
    year: string;
    title: string;
    description: string;
    image: string;
    isImageLeft: boolean;
}) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 30}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8}}
            className={`flex flex-col ${isImageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
        >
            <div className="w-full md:w-1/2">
                <motion.div
                    initial={{scale: 1.1, opacity: 0}}
                    animate={inView ? {scale: 1, opacity: 1} : {}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="relative h-[400px] rounded-2xl overflow-hidden group"
                >
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-sage-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={inView ? {opacity: 1, y: 0} : {}}
                        transition={{duration: 0.6, delay: 0.4}}
                        className="absolute bottom-6 left-6 bg-sage-800/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl"
                    >
                        <span className="text-3xl font-bold">{year}</span>
                    </motion.div>
                </motion.div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
                <motion.h3
                    initial={{opacity: 0, x: isImageLeft ? 30 : -30}}
                    animate={inView ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.8, delay: 0.3}}
                    className="text-3xl font-bold text-sage-950"
                >
                    {title}
                </motion.h3>
                <motion.p
                    initial={{opacity: 0, x: isImageLeft ? 30 : -30}}
                    animate={inView ? {opacity: 1, x: 0} : {}}
                    transition={{duration: 0.8, delay: 0.4}}
                    className="text-lg text-sage-800 leading-relaxed"
                >
                    {description}
                </motion.p>
            </div>
        </motion.div>
    );
}

function ImpactStat({
    number,
    label,
    description,
}: {
    number: string;
    label: string;
    description: string;
}) {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 30}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8}}
            className="text-center space-y-4"
        >
            <motion.div
                initial={{scale: 0.5}}
                animate={inView ? {scale: 1} : {}}
                transition={{duration: 0.8, delay: 0.2}}
                className="text-5xl font-bold text-sage-950"
            >
                {number}
            </motion.div>
            <h3 className="text-2xl font-semibold text-sage-900">{label}</h3>
            <p className="text-sage-800">{description}</p>
        </motion.div>
    );
}
