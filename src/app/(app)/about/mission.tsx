import {
    MorphingDialog,
    MorphingDialogContainer,
    MorphingDialogContent,
    MorphingDialogDescription,
    MorphingDialogImage,
    MorphingDialogTitle,
    MorphingDialogTrigger,
} from "@/components/ui/morphing-dialog";
import {Tooltip, TooltipContent} from "@/components/ui/tooltip";
import {TooltipTrigger} from "@radix-ui/react-tooltip";
import {PlusIcon} from "lucide-react";
import React from "react";

const Mission = (): React.ReactNode => {
    return (
        <MorphingDialog>
            <MorphingDialogTrigger
                style={{
                    borderRadius: "12px",
                }}
                className="flex flex-col overflow-hidden border"
            >
                <MorphingDialogImage
                    src="/about/mission.jpg"
                    alt="our story"
                    className="h-56 w-full object-cover"
                />
                <div className="flex grow flex-row items-center justify-between px-3 py-3 border-t">
                    <div>
                        <MorphingDialogTitle className="text-xl font-semibold text-primary">
                            OUR MISSION
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
                        src="/about/mission.jpg"
                        alt="our story"
                        className="h-[500px] w-full object-cover rounded-2xl border-2"
                    />
                    <div className="py-8 px-2">
                        <MorphingDialogTitle className="text-4xl font-bold text-primary">
                            OUR MISSION
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
                            <p className=" mb-6 text-lg ">
                                At Sprout & About, our mission extends beyond serving
                                delicious plant-based meals. We're committed to making
                                sustainable food more accessible and common for everyone
                                in our community. We believe that good food should be
                                available to all, regardless of dietary preferences or
                                restrictions.
                            </p>
                            <p className=" mb-6 text-lg ">
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
                            <p className=" text-lg">
                                Our business isn't driven by profit margins but by a deep
                                responsibility to make our earth greener and our community
                                healthier. Every meal served is a step toward a more
                                sustainable future, and we're proud to be part of the
                                solution to our planet's environmental challenges.
                            </p>
                        </MorphingDialogDescription>
                    </div>
                </MorphingDialogContent>
            </MorphingDialogContainer>
        </MorphingDialog>
    );
};

export default Mission;
