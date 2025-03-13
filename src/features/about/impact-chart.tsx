"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {ChartConfig, ChartContainer} from "@/components/ui/chart";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    TooltipProps,
} from "recharts";

type ValueType = string | number | Array<string | number>;
type NameType = string | number;

type ImpactData = {
    month: string;
    co2: number;
    water: number;
};

interface ImpactChartProps {
    data: ImpactData[];
}

type Payload = {
    dataKey: string;
    name: string;
    value: number;
    payload: ImpactData;
    color: string;
};

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
    active,
    payload,
    label,
}) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background p-3 border rounded-md shadow-sm">
                <p className="font-medium text-gray-700 mb-1">{`Month: ${label}`}</p>
                {payload.map((entry, index) => {
                    const typedEntry = entry as unknown as Payload;
                    if (typedEntry.dataKey === "co2") {
                        return (
                            <p
                                key={index}
                                style={{color: typedEntry.color}}
                                className="text-sm"
                            >
                                CO₂: {typedEntry.value.toLocaleString()} kg
                            </p>
                        );
                    } else if (typedEntry.dataKey === "water") {
                        return (
                            <p
                                key={index}
                                style={{color: typedEntry.color}}
                                className="text-sm"
                            >
                                Water: {typedEntry.value.toLocaleString()} gallons
                            </p>
                        );
                    }
                    return null;
                })}
            </div>
        );
    }
    return null;
};

const ImpactChart: React.FC<ImpactChartProps> = ({data}) => {
    const chartConfig = {
        co2: {
            label: "CO2 Savings (kg)",
            color: "hsl(143, 85%, 40%)",
        },
        water: {
            label: "Water Savings (gallons)",
            color: "hsl(217, 91%, 60%)",
        },
    } satisfies ChartConfig;

    return (
        <Card className="w-full rounded-xl">
            <CardHeader>
                <CardTitle className="text-2xl">Environmental Impact</CardTitle>
                <CardDescription className="text-primary">
                    Monthly CO2 and water savings compared to conventional restaurants
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-[350px]">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{top: 20, right: 50, left: 20, bottom: 20}}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={true}
                                    opacity={0.2}
                                />
                                <XAxis
                                    dataKey="month"
                                    axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                    tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                    tick={{fill: "#666", fontSize: 12}}
                                    dy={10}
                                />
                                <YAxis
                                    yAxisId="left"
                                    axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                    tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                    tick={{fill: "#666", fontSize: 12}}
                                    width={55}
                                    dx={-10}
                                    domain={[0, "dataMax + 300"]}
                                    tickFormatter={(value) => `${value} kg`}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                    tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                    tick={{fill: "#666", fontSize: 12}}
                                    width={80}
                                    dx={10}
                                    tickFormatter={(value) =>
                                        `${(value / 1000).toFixed(0)}k gal`
                                    }
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    verticalAlign="top"
                                    height={36}
                                    wrapperStyle={{paddingTop: "10px"}}
                                />
                                <Line
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="co2"
                                    name="CO2 Savings"
                                    stroke="var(--color-co2)"
                                    strokeWidth={2}
                                    dot={{r: 4}}
                                    activeDot={{r: 6}}
                                />
                                <Line
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="water"
                                    name="Water Savings"
                                    stroke="var(--color-water)"
                                    strokeWidth={2}
                                    dot={{r: 4}}
                                    activeDot={{r: 6}}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default ImpactChart;
