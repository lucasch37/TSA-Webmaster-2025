import Shepherd from "shepherd.js";

const tour = new Shepherd.Tour({
    defaultStepOptions: {
        cancelIcon: {
            enabled: true,
        },
        classes: "shepherd-theme-custom",
        scrollTo: {behavior: "smooth", block: "center"},
        modalOverlayOpeningRadius: 20,
        modalOverlayOpeningPadding: 10,
        highlightClass: "shepherd-highlight",
        canClickTarget: false,
    },
    useModalOverlay: true,
});

tour.addStep({
    id: "sustainability-step",
    title: "Sustainability",
    text: "This button shows all the sustainability practices. We encourage you to check it out!",
    attachTo: {
        element: "#sustainability",
        on: "bottom",
    },
    buttons: [
        {
            action(): void {
                return tour.back();
            },
            classes: "shepherd-button-secondary",
            text: "Back",
        },
        {
            action(): void {
                return tour.next();
            },
            text: "Next",
        },
    ],
});

tour.addStep({
    id: "health-step",
    title: "Health Stats",
    text: "This area shows all the health stats for the item.",
    attachTo: {
        element: "#health-stats",
        on: "bottom",
    },
    buttons: [
        {
            action(): void {
                return tour.back();
            },
            classes: "shepherd-button-secondary",
            text: "Back",
        },
        {
            action(): void {
                return tour.next();
            },
            text: "Next",
        },
    ],
});

tour.addStep({
    id: "cart-step",
    title: "Purchase",
    text: "Here, you can add items to your cart.",
    attachTo: {
        element: "#add-cart",
        on: "bottom",
    },
    buttons: [
        {
            action(): void {
                return tour.back();
            },
            classes: "shepherd-button-secondary",
            text: "Back",
        },
        {
            action(): void {
                return tour.next();
            },
            text: "Finish",
        },
    ],
});

export default tour;
