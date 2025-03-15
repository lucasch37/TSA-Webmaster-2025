"use client";

import {useEffect, useState} from "react";

export function ScrollProgress(): React.JSX.Element {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        let ticking = false;

        const calculateScrollProgress = (): void => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY;
                    const docHeight = document.documentElement.scrollHeight;
                    const winHeight = window.innerHeight;
                    const scrollPercent = scrollTop / (docHeight - winHeight);
                    setScrollProgress(scrollPercent);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", calculateScrollProgress, {passive: true});

        return (): void => window.removeEventListener("scroll", calculateScrollProgress);
    }, []);

    return (
        <div className="fixed top-0 left-0 z-50 h-1.5 w-full bg-transparent">
            <div
                className="h-full bg-primary transition-all duration-150 ease-out"
                style={{width: `${Math.min(scrollProgress * 100, 100)}%`}}
                role="progressbar"
                aria-valuenow={Math.min(scrollProgress * 100, 100)}
                aria-valuemin={0}
                aria-valuemax={100}
            />
        </div>
    );
}
