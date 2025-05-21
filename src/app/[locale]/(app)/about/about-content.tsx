"use client";

import {Button} from "@/components/ui/button";
import {Text} from "lucide-react";
import Link from "next/link";
import React, {useEffect} from "react";
import {AboutTimeline} from "./about-timeline";
import {useSearchParams} from "next/navigation";
import {ScrollProgress} from "@/components/scroll-progress";

export default function AboutContent(): React.JSX.Element {
    const farmTableRef = React.useRef<HTMLDivElement>(null);
    const preparationRef = React.useRef<HTMLDivElement>(null);
    const searchParams = useSearchParams();

    useEffect(() => {
        const section = searchParams.get("section");
        if (section === "farm-table") {
            farmTableRef.current?.scrollIntoView({behavior: "smooth"});
        } else if (section === "preparation") {
            preparationRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [searchParams]);

    return (
        <div className="relative">
            {/* Story Section */}
            <ScrollProgress />
            <div className="flex flex-col container mx-auto text-primary mt-12">
                <div className="flex gap-4 md:flex-row flex-col justify-center md:justify-between items-center border-b-2 pb-4">
                    <div className="font-bold text-primary text-6xl">ABOUT US</div>
                    <div className="flex gap-4">
                        <Link href={"/references"}>
                            <Button>
                                <Text size={20} />
                                References
                            </Button>
                        </Link>
                    </div>
                </div>
                <AboutTimeline
                    farmTableRef={farmTableRef}
                    preparationRef={preparationRef}
                />
            </div>

            {/* Research Section */}
            {/* <section className="py-20">
                <div className="container mx-auto">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.3}}
                        variants={fadeIn}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-12 text-center">
                            RESEARCH
                        </h2>
                        <div className="mb-16">
                            <p className="mb-8 text-lg text-center">
                                At Sprout & About, we celebrate a plant-powered lifestyle
                                that delights your palate while protecting our planet.
                                Below is a comprehensive review of research from reputable
                                sources detailing the environmental, health, social, and
                                economic benefits of adopting vegan and vegetarian diets.
                            </p>
                        </div>

                        <div className="space-y-16">
                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Introduction
                                </h3>
                                <p className="mb-4 text-lg">
                                    Our modern food system is one of the largest
                                    contributors to global greenhouse gas (GHG) emissions,
                                    excessive land use, and water depletion. Animal
                                    agriculture alone is responsible for a significant
                                    percentage of these emissions. Transitioning to a
                                    plant-based diet isn't merely a personal health
                                    choice—it is an environmental imperative.
                                </p>
                                <p className="text-lg">
                                    This research brings together extensive information
                                    from diverse sources including academic studies,
                                    governmental reports, and reputable media outlets. It
                                    offers an in-depth look at how vegan and vegetarian
                                    diets can help reduce emissions, conserve natural
                                    resources, and improve public health.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Environmental Impact of Animal Agriculture
                                </h3>
                                <p className="mb-4 text-lg">
                                    Animal-based foods, particularly beef and dairy,
                                    generate substantial greenhouse gas emissions, require
                                    vast amounts of land, and consume enormous quantities
                                    of water. Research has shown that beef production can
                                    produce up to nearly 100 kg of CO₂-equivalent per
                                    kilogram, while plant-based proteins have a fraction
                                    of that impact.
                                </p>
                                <p className="mb-4 text-lg">
                                    Studies reveal that plant-based diets can reduce GHG
                                    emissions by 50–75%, decrease land use by up to 76%,
                                    and lower water consumption by 14–21% compared to
                                    diets heavy in animal products. By reducing the
                                    environmental footprint of our food, we can help
                                    mitigate climate change and preserve ecosystems.
                                </p>
                                <ul className="list-disc ml-8 space-y-2 text-lg">
                                    <li>
                                        <strong>Greenhouse Gas Emissions:</strong>{" "}
                                        Transitioning to plant-based diets significantly
                                        lowers carbon footprints.
                                    </li>
                                    <li>
                                        <strong>Land Use & Biodiversity:</strong> Reduced
                                        meat consumption spares land for forests and
                                        natural habitats.
                                    </li>
                                    <li>
                                        <strong>Water Use:</strong> Plant-based food
                                        production requires much less water than raising
                                        livestock.
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Health Benefits of Plant-Based Diets
                                </h3>
                                <p className="mb-4 text-lg">
                                    Numerous studies have demonstrated that well-planned
                                    vegan and vegetarian diets are associated with lower
                                    risks of chronic diseases such as heart disease, type
                                    2 diabetes, and certain cancers. In addition to their
                                    reduced environmental impact, these diets offer high
                                    intakes of fiber, antioxidants, vitamins, and
                                    minerals.
                                </p>
                                <p className="mb-4 text-lg">
                                    Key health benefits include:
                                </p>
                                <ul className="list-disc ml-8 space-y-2 text-lg">
                                    <li>
                                        <strong>Reduced Chronic Disease:</strong> Lower
                                        risk of heart disease, diabetes, and some cancers.
                                    </li>
                                    <li>
                                        <strong>Weight Management:</strong> Improved body
                                        weight control and lower obesity rates.
                                    </li>
                                    <li>
                                        <strong>Nutritional Advantages:</strong> High in
                                        fiber, antioxidants, and essential nutrients.
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Economic & Social Benefits
                                </h3>
                                <p className="mb-4 text-lg">
                                    Adopting plant-based diets can lead to significant
                                    economic and social benefits. For instance, lower
                                    healthcare costs can result from reduced rates of
                                    chronic diseases. Moreover, the growing market for
                                    plant-based products drives innovation and job
                                    creation within sustainable food sectors.
                                </p>
                                <ul className="list-disc ml-8 space-y-2 text-lg">
                                    <li>
                                        <strong>Cost Savings:</strong> Unprocessed
                                        plant-based foods are often more affordable than
                                        animal products.
                                    </li>
                                    <li>
                                        <strong>Job Creation & Innovation:</strong>{" "}
                                        Expansion of plant-based alternatives spurs
                                        economic growth and innovation.
                                    </li>
                                    <li>
                                        <strong>Social Equity:</strong> Improved access to
                                        nutritious, sustainable food options promotes
                                        social justice.
                                    </li>
                                </ul>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Barriers, Myths & Misconceptions
                                </h3>
                                <p className="mb-4 text-lg">
                                    Despite compelling evidence, several myths and
                                    barriers persist regarding plant-based diets. Common
                                    misconceptions include the belief that vegans cannot
                                    build muscle or that all vegan foods are highly
                                    processed and unhealthy. In reality, with careful
                                    planning, vegan diets provide all essential nutrients
                                    and can support robust athletic performance.
                                </p>
                                <p className="text-lg">
                                    Other challenges include cultural resistance, issues
                                    of accessibility, and the higher cost of some trendy
                                    processed alternatives. Educating consumers and
                                    supporting policy measures are key to overcoming these
                                    hurdles.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, y: 30}}
                                whileInView={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                viewport={{once: true, amount: 0.5}}
                            >
                                <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                    Policy & Future Trends
                                </h3>
                                <p className="mb-4 text-lg">
                                    Governments around the world are beginning to take
                                    notice. Proposed policies include taxing high-emission
                                    animal products and subsidizing plant-based
                                    alternatives. These measures, along with initiatives
                                    to promote sustainable agriculture and reduce food
                                    waste, could lead to dramatic reductions in global
                                    emissions.
                                </p>
                                <p className="text-lg">
                                    As awareness grows and technology advances, the
                                    plant-based and cellular agriculture sectors are
                                    poised for unprecedented growth. Innovations in
                                    alternative proteins, sustainable packaging, and food
                                    distribution continue to create opportunities for
                                    environmentally conscious businesses.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section> */}

            {/* References Section */}
            {/* <section className="py-16 border-t">
                <div className="container mx-auto">
                    <motion.div
                        className="text-center"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        viewport={{once: true}}
                    >
                        <h2 className="text-4xl font-bold text-primary mb-8">
                            REFERENCES
                        </h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Visit our references page to learn more about the research and
                            sources behind our sustainability claims.
                        </p>
                        <Link
                            href="/references"
                            className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                            View References
                        </Link>
                    </motion.div>
                </div>
            </section> */}
        </div>
    );
}
