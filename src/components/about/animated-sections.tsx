"use client";

import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import React from "react";

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
}

export function AnimatedSection({
    children,
    className,
}: AnimatedSectionProps): React.JSX.Element {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    return (
        <motion.div
            ref={ref}
            initial={{opacity: 0, y: 30}}
            animate={inView ? {opacity: 1, y: 0} : {}}
            transition={{duration: 0.8}}
            className={className}
        >
            {children}
        </motion.div>
    );
}
