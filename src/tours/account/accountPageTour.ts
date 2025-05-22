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
    id: "rewards_step",
    title: "Rewards",
    text: "This is where you can see the rewards points you've collected. Hover over the i to see more details.",
    attachTo: {
        element: "#rewards",
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
    id: "sustainability",
    title: "Sustainability",
    text: "Here, you can see sustainability info, specifically the impact you've made with your orders.",
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
    id: "Admin",
    title: "Admin Portal",
    text: "When clicked, this button allows you to enter the admin portal. We encourage you to check it out",
    attachTo: {
        element: "#admin",
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
                return tour.complete();
            },
            text: "Finish",
        },
    ],
});

export default tour;
