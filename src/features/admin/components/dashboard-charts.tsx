"use client";

import React from "react";
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
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Cell,
} from "recharts";

type ValueType = string | number | Array<string | number>;
type NameType = string | number;
type Formatter = (value: ValueType, name: NameType, props: object) => React.ReactNode;

type DashboardMetrics = {
    topSellingDishes: {name: string; quantity: number}[];
    averageOrderValues: {date: string; value: number}[];
    customerRetention: {label: string; value: number}[];
    peakOrderTimes: {hour: number; orders: number}[];
    revenue: {date: string; amount: number}[];
    totalCustomers?: number;
};

interface ChartCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
}

const ChartCard = ({
    title,
    description,
    children,
    className,
}: ChartCardProps): React.JSX.Element => {
    return (
        <Card className={`${className} w-full rounded-xl`}>
            <CardHeader className="pb-2">
                <CardTitle>{title}</CardTitle>
                {description && (
                    <CardDescription className="text-primary">
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="p-0 pb-4 px-6">{children}</CardContent>
        </Card>
    );
};

export const TopSellingDishesChart = ({
    topSellingDishes,
}: Pick<DashboardMetrics, "topSellingDishes">): React.JSX.Element => {
    const data = topSellingDishes.slice(0, 5);

    const chartConfig = {
        quantity: {
            label: "Orders",
            color: "hsl(152, 69%, 31%)",
        },
    } satisfies ChartConfig;

    const valueFormatter: Formatter = (value: ValueType) => {
        if (typeof value === "number") {
            return `${value} orders`;
        }
        return `${value} orders`;
    };

    return (
        <ChartCard
            title="Top Selling Dishes"
            description="Most popular menu items by order count"
        >
            <div className="w-full h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            layout="vertical"
                            margin={{top: 5, right: 20, left: 40, bottom: 5}}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                horizontal={true}
                                vertical={false}
                            />
                            <XAxis
                                type="number"
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                            />
                            <YAxis
                                type="category"
                                dataKey="name"
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                width={120}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent formatter={valueFormatter} />
                                }
                            />
                            <Bar
                                dataKey="quantity"
                                fill="var(--color-quantity)"
                                barSize={20}
                                radius={[0, 4, 4, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </ChartCard>
    );
};

export const AverageOrderValueChart = ({
    averageOrderValues,
}: Pick<DashboardMetrics, "averageOrderValues">): React.JSX.Element => {
    const data = averageOrderValues.slice(-14);

    const chartConfig = {
        value: {
            label: "Average Order Value",
            color: "hsl(267, 84%, 81%)",
        },
    } satisfies ChartConfig;

    const valueFormatter: Formatter = (value: ValueType) => {
        if (typeof value === "number") {
            return `$${value.toFixed(2)}`;
        }
        return `$${value}`;
    };

    return (
        <ChartCard
            title="Average Order Value"
            description="Trend of average spending per order"
        >
            <div className="w-full h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={data}
                            margin={{top: 20, right: 20, left: 0, bottom: 5}}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={true}
                                opacity={0.2}
                            />
                            <XAxis
                                dataKey="date"
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tick={{fill: "#666", fontSize: 12}}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tick={{fill: "#666", fontSize: 12}}
                                width={45}
                                tickFormatter={(value) => `$${value}`}
                                dx={-10}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={valueFormatter}
                                        labelFormatter={(value) => {
                                            const date = new Date(value as string);
                                            return date.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            });
                                        }}
                                    />
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="var(--color-value)"
                                strokeWidth={2}
                                dot={{r: 4}}
                                activeDot={{r: 6}}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </ChartCard>
    );
};

export const CustomerRetentionChart = ({
    customerRetention,
}: Pick<DashboardMetrics, "customerRetention">): React.JSX.Element => {
    const chartConfig = {
        returning: {
            label: "Returning Customers",
            color: "hsl(142 72% 29%)",
        },
        new: {
            label: "New Customers",
            color: "hsl(226, 70%, 55%)",
        },
    } satisfies ChartConfig;

    const COLORS = ["var(--color-returning)", "var(--color-new)"];

    const valueFormatter: Formatter = (value: ValueType) => {
        if (typeof value === "number") {
            return `${value} customers`;
        }
        return `${value} customers`;
    };

    return (
        <ChartCard
            title="Customer Retention"
            description="Returning vs. new customer breakdown"
        >
            <div className="w-full h-[300px] flex flex-col items-center justify-center">
                <div className="w-[220px] h-[220px]">
                    <ChartContainer config={chartConfig} className="h-full w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                <Pie
                                    data={customerRetention}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={2}
                                    dataKey="value"
                                    nameKey="label"
                                >
                                    {customerRetention.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent formatter={valueFormatter} />
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-[#15803d] mr-2"></div>
                        <span className="text-sm">Returning</span>
                    </div>
                    <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                        <span className="text-sm">New</span>
                    </div>
                </div>
            </div>
        </ChartCard>
    );
};

export const PeakOrderTimesChart = ({
    peakOrderTimes,
}: Pick<DashboardMetrics, "peakOrderTimes">): React.JSX.Element => {
    const chartConfig = {
        orders: {
            label: "Orders",
            color: "hsl(38, 92%, 50%)",
        },
    } satisfies ChartConfig;

    const valueFormatter: Formatter = (value: ValueType) => {
        if (typeof value === "number") {
            return `${value} orders`;
        }
        return `${value} orders`;
    };

    return (
        <ChartCard
            title="Peak Order Times"
            description="Busiest hours throughout the day"
        >
            <div className="w-full h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={peakOrderTimes}
                            margin={{top: 20, right: 20, left: 0, bottom: 5}}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={true}
                                opacity={0.2}
                            />
                            <XAxis
                                dataKey="hour"
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tick={{fill: "#666", fontSize: 12}}
                                tickFormatter={(hour) =>
                                    `${hour % 12 || 12}${hour < 12 ? "am" : "pm"}`
                                }
                                dy={10}
                            />
                            <YAxis
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tick={{fill: "#666", fontSize: 12}}
                                width={40}
                                dx={-10}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={valueFormatter}
                                        labelFormatter={(hour) =>
                                            `${(hour as number) % 12 || 12}${
                                                (hour as number) < 12 ? "am" : "pm"
                                            }`
                                        }
                                    />
                                }
                            />
                            <Bar
                                dataKey="orders"
                                fill="var(--color-orders)"
                                barSize={16}
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </ChartCard>
    );
};

export const RevenueChart = ({
    revenue,
}: Pick<DashboardMetrics, "revenue">): null | React.JSX.Element => {
    if (!revenue) {
        return null;
    }

    const chartConfig = {
        amount: {
            label: "Revenue",
            color: "hsl(143, 85%, 40%)",
        },
    } satisfies ChartConfig;

    const valueFormatter: Formatter = (value: ValueType) => {
        if (typeof value === "number") {
            return `$${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`;
        }
        return `$${value}`;
    };

    return (
        <ChartCard title="Revenue" description="Daily revenue trend">
            <div className="w-full h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={revenue}
                            margin={{top: 20, right: 20, left: 0, bottom: 5}}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={true}
                                opacity={0.2}
                            />
                            <XAxis
                                dataKey="date"
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tick={{fill: "#666", fontSize: 12}}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    });
                                }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tickLine={{stroke: "#e0e0e0", strokeWidth: 1}}
                                tick={{fill: "#666", fontSize: 12}}
                                width={55}
                                tickFormatter={(value) => `$${value}`}
                                dx={-10}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        formatter={valueFormatter}
                                        labelFormatter={(value) => {
                                            const date = new Date(value as string);
                                            return date.toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            });
                                        }}
                                    />
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="amount"
                                stroke="var(--color-amount)"
                                fill="var(--color-amount)"
                                strokeWidth={2}
                                fillOpacity={0.2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
        </ChartCard>
    );
};
