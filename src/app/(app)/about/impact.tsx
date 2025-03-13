import {
    MorphingDialog,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogImage,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import ImpactChart from "@/features/about/impact-chart";
import {PlusIcon} from "lucide-react";
import React from "react";

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

const Impact = (): React.ReactNode => {
    return (
        <MorphingDialog>
            <MorphingDialogTrigger
                style={{
                    borderRadius: "12px",
                }}
                className="flex flex-col overflow-hidden border"
            >
                <MorphingDialogImage
                    src="/about/impact.jpg"
                    alt="our story"
                    className="h-56 w-full object-cover"
                />
                <div className="flex grow flex-row items-center justify-between px-3 py-3 border-t">
                    <div>
                        <MorphingDialogTitle className="text-xl font-semibold text-primary">
                            IMPACT
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
                    className="pointer-events-auto relative flex h-auto w-full flex-col border-2 bg-background max-w-[400px] md:max-w-[900px] max-h-[400px] md:max-h-[800px] overflow-auto p-6"
                >
                    <MorphingDialogImage
                        src="/about/impact.jpg"
                        alt="our story"
                        className="h-[500px] w-full object-cover rounded-2xl border-2"
                    />
                    <div className="py-8 px-2">
                        <MorphingDialogTitle className="text-4xl font-bold text-primary">
                            OUR IMPACT
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
                            <div className=" mx-auto">
                                <p className="mb-8 text-lg">
                                    By choosing plant-based ingredients and sustainable
                                    practices, we're making a measurable difference in our
                                    environmental footprint. Here's how our efforts
                                    translate into real-world savings compared to
                                    conventional restaurants.
                                </p>

                                <div className="mb-6">
                                    <ImpactChart data={impactData} />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                    <div className="p-6 rounded-lg border-2 bg-green-50">
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
                                    </div>
                                    <div className="p-6 rounded-lg border-2 bg-green-50">
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

export default Impact;
