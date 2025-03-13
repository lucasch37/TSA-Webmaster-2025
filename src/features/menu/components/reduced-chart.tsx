"use client";

import {Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {ChartConfig, ChartContainer} from "@/components/ui/chart";
import {MenuItem} from "@/types";

export function ReducedChart({menuItem}: {menuItem: MenuItem}): React.JSX.Element {
    const chartData = [
        {
            option: "vegetarian",
            emissions: menuItem.emissions.percentage_saved,
            fill: "#15803d",
        },
    ];

    const chartConfig = {
        emissions: {
            label: "Emissions",
        },
        vegetarian: {
            label: "Vegetarian",
            color: "#15803d",
        },
    } satisfies ChartConfig;

    return (
        <Card className="flex flex-col rounded-xl border">
            <CardHeader className="">
                <CardTitle>Carbon Emissions Reduced</CardTitle>
                <CardDescription className="text-xs text-primary">
                    Percentage of carbon reduced by choosing vegetarian option.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] -mt-8"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={menuItem.emissions.percentage_saved * 3.6}
                        innerRadius={80}
                        outerRadius={140}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-primary/10 last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="emissions" background />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {chartData[0].emissions.toLocaleString()}
                                                    %
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    {menuItem.emissions.emissions_unit}{" "}
                                                    Reduced
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
