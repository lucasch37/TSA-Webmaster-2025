"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {MenuItem} from "@/types";
import {IconSeedingFilled} from "@tabler/icons-react";
import {Sprout} from "lucide-react";
import dymanic from "next/dynamic";
import React from "react";
import ReactMarkdown from "react-markdown";
import {EmissionBarChart} from "./bar-chart";
import {ReducedChart} from "./reduced-chart";
const FarmMap = dymanic(() => import("@/features/about/farm-map"));

type Props = {
    menuItem: MenuItem;
};

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

const SustainabilityDialog = ({menuItem}: Props): React.JSX.Element => {
    const [tab, setTab] = React.useState<string>("process");
    const locations = menuItem.sources.map((source) => ({
        name: source.farmName,
        address:
            farmLocations.find((farm) => farm.name.includes(source.farmName))?.address ||
            "",
        href:
            farmLocations.find((farm) => farm.name.includes(source.farmName))?.href ||
            source.href,
        description: `${source.ingredient} ${source.ingredient.endsWith("s") ? "are" : "is"} sourced from ${source.farmName}.`,
        position: farmLocations.find((farm) => farm.name === source.farmName)
            ?.position || [0, 0],
    }));
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-fit flex border-primary text-primary"
                >
                    <Sprout size={18} />
                    Sustainability Info
                </Button>
            </DialogTrigger>
            <Tabs
                value={tab}
                onValueChange={(value) => setTab(value)}
                defaultValue="process"
            >
                <DialogContent className="max-w-[95%] md:max-w-4xl max-h-[80vh] mx-auto overflow-y-auto">
                    <DialogHeader>
                        <TabsList className="w-[200px] md:w-[500px] grid grid-cols-2">
                            <TabsTrigger value="process">Process</TabsTrigger>
                            <TabsTrigger value="recipe">Recipe</TabsTrigger>
                        </TabsList>
                    </DialogHeader>
                    {tab === "recipe" && (
                        <TabsContent value="recipe" className="p-4 flex flex-col">
                            <div className="text-3xl text-primary font-semibold">
                                {menuItem.name} Recipe
                            </div>
                            <div className="mt-4 text-primary">
                                At Sprout & About, to align with our mission of allowing
                                sustainable food to be accessible to all, we openly share
                                and provide our recipes for our menu items.
                            </div>
                            <Accordion type="single" collapsible className="mt-8">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Ingredients</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="list-disc border rounded-lg p-4 flex flex-col gap-2 shadow-md">
                                            {menuItem.ingredients.map(
                                                (ingredient, index) => (
                                                    <li
                                                        className="ml-5 text-primary text-base"
                                                        key={index}
                                                    >
                                                        {ingredient}
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Recipe</AccordionTrigger>
                                    <AccordionContent className="w-full flex justify-center">
                                        <div className="prose prose-sm text-primary mt-4 max-h-[350px] overflow-y-auto">
                                            <ReactMarkdown>
                                                {menuItem.recipe}
                                            </ReactMarkdown>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </TabsContent>
                    )}
                    {tab === "process" && (
                        <TabsContent value="process" className="p-4 flex flex-col">
                            <div className="text-3xl text-primary font-semibold">
                                {menuItem.name} Process
                            </div>
                            <div className="mt-4 text-primary">
                                This is the process we follow to prepare this dish. We are
                                committed to reducing our environmental impact throughout
                                our supply chain and preparation methods.
                            </div>
                            <Accordion type="single" collapsible className="mt-8">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        Ingredient Sourcing
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="h-[450px] rounded-lg overflow-hidden mb-10">
                                            <FarmMap locations={locations} />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>
                                        Preparation Practices
                                    </AccordionTrigger>
                                    <AccordionContent className="w-full flex flex-col justify-center">
                                        <div className="font-semibold text-primary text-lg">
                                            To prepare {menuItem.name} in a sustainable
                                            way, we:
                                        </div>
                                        <ul className="border rounded-lg p-4 mt-4 flex flex-col gap-4 shadow-md">
                                            {menuItem.practices.map((practice, i) => (
                                                <li
                                                    key={i}
                                                    className="text-primary text-base flex items-start gap-2"
                                                >
                                                    <div className="mt-1">
                                                        <IconSeedingFilled size={14} />
                                                    </div>
                                                    {practice}
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Carbon Emissions</AccordionTrigger>
                                    <AccordionContent className="w-full flex flex-col">
                                        <div className="text-lg font-semibold text-primary">
                                            Emissions saved by choosing this dish rather
                                            than a traditional option:
                                        </div>
                                        <div className="text-primary my-4 text-base flex gap-1 flex-col border rounded-lg p-4 shadow-md">
                                            Main source of reduction:{" "}
                                            <span className="font-medium text-lg">
                                                {menuItem.emissions.reduction_reason}.
                                            </span>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <EmissionBarChart menuItem={menuItem} />
                                            <ReducedChart menuItem={menuItem} />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </TabsContent>
                    )}
                </DialogContent>
            </Tabs>
        </Dialog>
    );
};

export default SustainabilityDialog;
