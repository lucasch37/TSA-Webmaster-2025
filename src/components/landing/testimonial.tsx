"use client";
import {CardStack} from "../ui/card-stack";
export function Testimonial(): React.JSX.Element {
    return (
        <div className="flex items-center justify-center w-full">
            <CardStack items={CARDS} />
        </div>
    );
}

const CARDS = [
    {
        id: 0,
        name: "Alicia Green",
        designation: "Environmentalist",
        content: (
            <p>
                I've been a regular at Sprout & About for years. Their commitment to
                sustainability and health is unmatched in the area, and their food is
                always delicious.
            </p>
        ),
    },
    {
        id: 1,
        name: "Sarah Johnson",
        designation: "Local Teacher",
        content: (
            <p>
                The recipes have transformed how my family eats. We've cut our meat
                consumption by 70% and my kids actually love the plant-based meals we've
                learned to make!
            </p>
        ),
    },
    {
        id: 2,
        name: "Michael Chen",
        designation: "Tech Executive",
        content: (
            <p>
                As someone who was skeptical about plant-based foods, Sprout & About
                completely changed my perspective. Their cauliflower steak is better than
                any cow steak I've had!
            </p>
        ),
    },
    {
        id: 3,
        name: "Dr. Lisa Rodriguez",
        designation: "Nutritionist",
        content: (
            <p>
                I recommend Sprout & About to all my patients looking to improve their
                diet. Their focus on nutrition alongside sustainability makes them truly
                special in Spokane.
            </p>
        ),
    },
];
