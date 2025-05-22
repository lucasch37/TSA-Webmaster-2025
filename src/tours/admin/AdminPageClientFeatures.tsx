"use client";

import React, {useState, useEffect} from "react";
import tour from "@/tours/admin/adminPageTour";
import "shepherd.js/dist/css/shepherd.css";
// import {Button} from "@/components/ui/button";

export default function AdminPageClientFeatures(): React.JSX.Element | null {
    const [showTourPrompt, setShowTourPrompt] = useState(false);

    useEffect(() => {
        const hasTakenTour = localStorage.getItem("hasTakenAccountTour");
        if (!hasTakenTour) {
            setShowTourPrompt(true);
        }
    }, []);

    const handleStartTour = (): void => {
        setShowTourPrompt(false);
        localStorage.setItem("hasTakenAccountTour", "true"); // Mark tour as taken
        tour.start();
    };

    const handleDismissPrompt = (): void => {
        setShowTourPrompt(false);
        localStorage.setItem("hasTakenAccountTour", "true"); // Also mark as taken/dismissed to not show again
    };

    if (!showTourPrompt) {
        return null; // Don't render anything if the prompt is not shown
    }

    handleStartTour();

    return (
        <div className="fixed bottom-5 right-5 bg-background border border-border shadow-lg rounded-lg p-6 z-[100] max-w-sm">
            {/*<h3 className="text-lg font-semibold mb-2 text-primary">*/}
            {/*    First time visiting?*/}
            {/*</h3>*/}
            {/*<p className="text-sm text-muted-foreground mb-4">*/}
            {/*    Would you like a quick tour of our website to see what we offer?*/}
            {/*</p>*/}
            {/*<div className="flex gap-3">*/}
            {/*    <Button onClick={handleStartTour} className="flex-1">*/}
            {/*        Take Tour*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        variant="outline"*/}
            {/*        onClick={handleDismissPrompt}*/}
            {/*        className="flex-1"*/}
            {/*    >*/}
            {/*        No Thanks*/}
            {/*    </Button>*/}
            {/*</div>*/}
        </div>
    );
}
