"use client";
import {useEffect, useState, useRef, useCallback} from "react";
import {motion} from "motion/react";
import {IconStarFilled, IconStarHalfFilled} from "@tabler/icons-react";

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
    const AUTOPLAY_INTERVAL = 3500; // Example: made it slightly shorter

    const [cards, setCards] = useState<Card[]>(items);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        setCards(items);
    }, [items]);

    const flipCard = useCallback(() => {
        setCards((prevCards) => {
            if (prevCards.length <= 1) return prevCards;
            const newArray = [...prevCards];
            const lastElement = newArray.pop()!;
            newArray.unshift(lastElement);
            return newArray;
        });
    }, []);

    const runOrResetAutoplayTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        if (cards && cards.length > 1) {
            intervalRef.current = window.setInterval(() => {
                flipCard();
            }, AUTOPLAY_INTERVAL);
        }
    }, [cards, AUTOPLAY_INTERVAL, flipCard]);

    useEffect(() => {
        runOrResetAutoplayTimer();

        return () => {
            if (intervalRef.current !== null) {
                window.clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [runOrResetAutoplayTimer]);

    const handleCardClick = () => {
        flipCard();
    };

    if (!cards || cards.length === 0) {
        return <div className="text-center p-4 text-slate-600">No testimonials yet.</div>;
    }

    return (
        <div className="relative h-60 w-72 md:h-60 md:w-96">
            {cards.map((card, index) => {
                const isTopCard = index === 0;
                return (
                    <motion.div
                        key={card.id}
                        className="absolute bg-background h-60 w-72 md:h-60 md:w-[30rem] rounded-2xl p-6 shadow-xl border-2 border-primary/40 flex flex-col justify-between"
                        style={{
                            transformOrigin: "top center",
                            cursor: isTopCard && cards.length > 1 ? "pointer" : "default",
                        }}
                        animate={{
                            top: index * -CARD_OFFSET,
                            scale: 1 - index * SCALE_FACTOR,
                            zIndex: cards.length - index,
                        }}
                        onClick={isTopCard && cards.length > 1 ? handleCardClick : undefined}
                    >
                        <div className="font-normal text-primary h-full md:text-base text-sm leading-relaxed">
                            {card.content}
                        </div>
                        <div className="flex justify-between items-end pt-4 mt-4 border-t-2 border-primary">
                            <div>
                                <p className="text-primary font-semibold text-sm md:text-base">
                                    {card.name}
                                </p>
                                <p className="text-primary text-xs md:text-sm font-medium">
                                    {card.designation}
                                </p>
                            </div>
                            <div className="flex gap-1 text-yellow-400">
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