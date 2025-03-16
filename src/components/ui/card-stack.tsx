"use client";
import {useEffect, useState} from "react";
import {motion} from "motion/react";
import {IconStarFilled, IconStarHalfFilled} from "@tabler/icons-react";

let interval: any;

type Card = {
    id: number;
    name: string;
    designation: string;
    content: React.ReactNode;
};

export const CardStack = ({
    items,
    offset,
    scaleFactor,
}: {
    items: Card[];
    offset?: number;
    scaleFactor?: number;
}) => {
    const CARD_OFFSET = offset || 10;
    const SCALE_FACTOR = scaleFactor || 0.06;
    const [cards, setCards] = useState<Card[]>(items);

    useEffect(() => {
        startFlipping();

        return () => clearInterval(interval);
    }, []);
    const startFlipping = () => {
        interval = setInterval(() => {
            setCards((prevCards: Card[]) => {
                const newArray = [...prevCards]; // create a copy of the array
                newArray.unshift(newArray.pop()!); // move the last element to the front
                return newArray;
            });
        }, 5000);
    };

    return (
        <div className="relative h-60 w-72 md:h-60 md:w-96">
            {cards.map((card, index) => {
                return (
                    <motion.div
                        key={card.id}
                        className="absolute bg-primary h-60 w-72 md:h-60 md:w-[30rem] rounded-3xl p-4 shadow-xl border border-green-800 flex flex-col justify-between"
                        style={{
                            transformOrigin: "top center",
                        }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
                            zIndex: cards.length - index, //  decrease z-index for the cards that are behind
                        }}
                    >
                        <div className="font-normal text-white h-full md:text-base text-sm">
                            {card.content}
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-white font-medium text-sm md:text-base">
                                    {card.name}
                                </p>
                                <p className="text-white text-xs md:text-sm font-medium">
                                    {card.designation}
                                </p>
                            </div>
                            <div className="flex gap-1 text-yellow-500">
                                <IconStarFilled />
                                <IconStarFilled />
                                <IconStarFilled />
                                <IconStarFilled />
                                {card.id === 2 || card.id === 0 ? (
                                    <IconStarHalfFilled />
                                ) : (
                                    <IconStarFilled />
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
