import {AnimatedSection} from "@/components/about/animated-sections";
import {Button} from "@/components/ui/button";
import {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Image URLs for timeline sections
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
            <div className="pt-8">
                {/* Hero section */}
                <AnimatedSection className="relative py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center space-y-3">
                            <h1 className="text-5xl md:text-6xl font-bold text-sage-950 leading-tight">
                                Our Story
                            </h1>
                            <p className="text-lg md:text-xl text-sage-800 leading-snug">
                                Crafting a sustainable future through innovative
                                vegetarian cuisine
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Mission statement section */}
                <AnimatedSection className="relative py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center space-y-4">
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
                        </div>
                    </div>
                </AnimatedSection>

                {/* Timeline section */}
                <section className="relative py-16">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="space-y-24">
                            {[
                                {
                                    year: "2020",
                                    title: "The Seed of an Idea",
                                    description:
                                        "From intimate dinner parties to a full-fledged vision, our story began with a passion for sustainable dining.",
                                    image: IMAGES.dinnerParty,
                                    isImageLeft: true,
                                },
                                {
                                    year: "2021",
                                    title: "Opening Our Doors",
                                    description:
                                        "We transformed a historic building into a warm, welcoming space that reflects our values.",
                                    image: IMAGES.opening,
                                    isImageLeft: false,
                                },
                                {
                                    year: "2022",
                                    title: "Growing Together",
                                    description:
                                        "Our community garden program brought sustainable farming practices to local residents.",
                                    image: IMAGES.garden,
                                    isImageLeft: true,
                                },
                                {
                                    year: "2023",
                                    title: "Recognition & Impact",
                                    description:
                                        "Earning the Environmental Excellence Award validated our mission of conscious dining.",
                                    image: IMAGES.award,
                                    isImageLeft: false,
                                },
                            ].map((item) => (
                                <AnimatedSection
                                    key={item.year}
                                    className={`flex flex-col ${item.isImageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
                                >
                                    <div className="w-full md:w-1/2">
                                        <div className="relative h-[400px] rounded-2xl overflow-hidden group">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-br from-sage-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                                            <div className="absolute bottom-6 left-6 bg-sage-800/90 backdrop-blur-sm text-white px-6 py-3 rounded-xl">
                                                <span className="text-3xl font-bold">
                                                    {item.year}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-6">
                                        <h3 className="text-3xl font-bold text-sage-950">
                                            {item.title}
                                        </h3>
                                        <p className="text-lg text-sage-800 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </AnimatedSection>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Impact statistics section */}
                <AnimatedSection className="relative py-20">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center space-y-16">
                            <div>
                                <h2 className="text-4xl font-bold text-sage-950 mb-4">
                                    Our Impact
                                </h2>
                                <p className="text-xl text-sage-800">
                                    Making a difference, one plate at a time
                                </p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-12">
                                {[
                                    {
                                        number: "15,000+",
                                        label: "Local Produce (lbs)",
                                        description:
                                            "Sourced directly from local farmers",
                                    },
                                    {
                                        number: "30%",
                                        label: "Carbon Footprint",
                                        description: "Reduction in our first year",
                                    },
                                    {
                                        number: "1,000+",
                                        label: "Community Members",
                                        description: "Engaged in our programs",
                                    },
                                ].map((stat) => (
                                    <div
                                        key={stat.label}
                                        className="text-center space-y-4"
                                    >
                                        <div className="text-5xl font-bold text-sage-950">
                                            {stat.number}
                                        </div>
                                        <h3 className="text-2xl font-semibold text-sage-900">
                                            {stat.label}
                                        </h3>
                                        <p className="text-sage-800">
                                            {stat.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Call to action section */}
                <AnimatedSection className="relative py-20">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold text-sage-950">
                                Join Our Journey
                            </h2>
                            <p className="text-xl text-sage-800 max-w-2xl mx-auto">
                                Experience the future of dining at Sprout. Every meal is
                                an opportunity to make a difference.
                            </p>
                            <Link
                                href="/reserve"
                                className="inline-block bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-green-500 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Make a Reservation
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </main>
    );
}
