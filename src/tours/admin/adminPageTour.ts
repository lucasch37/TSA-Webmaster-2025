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
    id: "admin_navbar",
    title: "Admin Navbar",
    text: "The admin portal has a special navbar with special features.",
    attachTo: {
        element: "#navbar",
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
    id: "return",
    title: "Return",
    text: "Return to the regular website here.",
    attachTo: {
        element: "#return",
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

export default tour;
