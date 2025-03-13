import {
    MorphingDialog,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogImage,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import {PlusIcon} from "lucide-react";
import React from "react";

const Research = (): React.ReactNode => {
    return (
        <MorphingDialog>
            <MorphingDialogTrigger
                style={{
                    borderRadius: "12px",
                }}
                className="flex flex-col overflow-hidden border"
            >
                <MorphingDialogImage
                    src="/about/research.jpg"
                    alt="our story"
                    className="h-56 w-full object-cover"
                />
                <div className="flex grow flex-row items-center justify-between px-3 py-3 border-t">
                    <div>
                        <MorphingDialogTitle className="text-xl font-semibold text-primary">
                            RESEARCH
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
                        src="/about/research.jpg"
                        alt="our story"
                        className="h-[500px] w-full object-cover rounded-2xl border-2"
                    />
                    <div className="py-8 px-2">
                        <MorphingDialogTitle className="text-4xl font-bold text-primary">
                            RESEARCH
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
                            <div className="">
                                <p className="mb-8 text-lg">
                                    At Sprout & About, we celebrate a plant-powered
                                    lifestyle that delights your palate while protecting
                                    our planet. Below is a comprehensive review of
                                    research from reputable sources detailing the
                                    environmental, health, social, and economic benefits
                                    of adopting vegan and vegetarian diets.
                                </p>

                                <div className="space-y-12">
                                    <div>
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
                                    </div>

                                    <div>
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
                                    </div>

                                    <div>
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
                                    </div>

                                    <div>
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
                                    </div>

                                    <div>
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
                                    </div>

                                    <div>
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
                                            Future trends indicate that as consumer
                                            preferences shift toward plant-based eating,
                                            market innovations and global initiatives will
                                            continue to drive progress toward a
                                            sustainable, healthier food system.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-semibold text-green-700 mb-4">
                                            Case Studies & Global Initiatives
                                        </h3>
                                        <p className="mb-4 text-lg">
                                            Around the globe, various initiatives
                                            demonstrate the power of plant-based diets.
                                            For example, Denmark's pioneering €170 million
                                            plant-based action plan is a model for
                                            supporting farmers while encouraging a shift
                                            away from animal agriculture. Similar programs
                                            in the United Kingdom, New Zealand, and other
                                            regions show that comprehensive policy and
                                            industry collaboration can lead to significant
                                            environmental and health benefits.
                                        </p>
                                        <p className="text-lg">
                                            These case studies provide real-world evidence
                                            that sustainable dietary shifts are not only
                                            possible, but are already underway.
                                        </p>
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

export default Research;
