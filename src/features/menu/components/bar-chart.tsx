"use client";

import {Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {MenuItem} from "@/types";

export function EmissionBarChart({menuItem}: {menuItem: MenuItem}): React.ReactNode {
    const chartData = [
        {
            option: "traditional",
            emissions: menuItem.emissions.traditional_emissions,
            fill: "#594117",
        },
        {
            option: "vegetarian",
            emissions: menuItem.emissions.vegan_emissions,
            fill: "#15803d",
        },
    ];

    const chartConfig = {
        emissions: {
            label: "Emissions (kg CO₂e)",
            color: "#15803d",
        },
        traditional: {
            label: "Traditional",
            color: "#15803d",
        },
        vegetarian: {
            label: "Vegetarian",
            color: "#15803d",
        },
    } satisfies ChartConfig;

    return (
        <Card className="rounded-xl border">
            <CardHeader>
                <CardTitle>Traditional vs. Vegetarian Emissions</CardTitle>
                <CardDescription className="text-primary text-xs mt-2">
                    Comparison of emissions from traditional and vegertarian options of
                    this dish.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-fit mt-8">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="option"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="emissions"
                            strokeWidth={2}
                            className="bg-primary"
                            radius={8}
                            activeIndex={2}
                            activeBar={({...props}) => {
                                return (
                                    <Rectangle
                                        fillOpacity={0.8}
                                        stroke={props.payload.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                );
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
