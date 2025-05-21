"use client";

import {Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart} from "recharts";

import {ChartConfig, ChartContainer} from "@/components/ui/chart";

export function AccountChart({
    emissionsSaved,
}: {
    emissionsSaved: number;
}): React.JSX.Element {
    const chartData = [
        {
            option: "vegetarian",
            emissions: emissionsSaved,
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
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] -mt-8"
        >
            <RadialBarChart
                data={chartData}
                endAngle={(emissionsSaved / 100) * 360}
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
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground"
                                        >
                                            kg CO₂e Reduced
                                        </tspan>
                                    </text>
                                );
                            }
                        }}
                    />
                </PolarRadiusAxis>
            </RadialBarChart>
        </ChartContainer>
    );
}
