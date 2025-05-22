"use client";

import React, {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import tour from "@/tours/landing/landingPageTour";
import "shepherd.js/dist/css/shepherd.css";

export default function LandingPageClientFeatures(): React.JSX.Element | null {
    const [showTourPrompt, setShowTourPrompt] = useState(false);

    useEffect(() => {
        const hasTakenTour = localStorage.getItem("hasTakenLandingTour");
        if (!hasTakenTour) {
            setShowTourPrompt(true);
        }
    }, []);

    const handleStartTour = (): void => {
        setShowTourPrompt(false);
        localStorage.setItem("hasTakenLandingTour", "true"); // Mark tour as taken
        tour.start();
    };

    const handleDismissPrompt = (): void => {
        setShowTourPrompt(false);
        localStorage.setItem("hasTakenLandingTour", "true"); // Also mark as taken/dismissed to not show again
    };

    if (!showTourPrompt) {
        return null; // Don't render anything if the prompt is not shown
    }

    return (
        <div className="fixed bottom-5 right-5 bg-background border border-border shadow-lg rounded-lg p-6 z-[100] max-w-sm">
            <h3 className="text-lg font-semibold mb-2 text-primary">
                First time visiting?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
                Would you like a quick tour of our website to see what we offer?
            </p>
            <div className="flex gap-3">
                <Button onClick={handleStartTour} className="flex-1">
                    Take Tour
                </Button>
                <Button
                    variant="outline"
                    onClick={handleDismissPrompt}
                    className="flex-1"
                >
                    No Thanks
                </Button>
            </div>
        </div>
    );
}
