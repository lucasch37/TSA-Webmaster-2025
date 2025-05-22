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
    id: "navbar-step",
    title: "Navigation Bar",
    text: "This is our main navigation bar. You can find links to other pages here.",
    attachTo: {
        element: "#main-navbar",
        on: "bottom",
    },
    buttons: [
        {
            action() {
                return tour.back();
            },
            classes: "shepherd-button-secondary",
            text: "Back",
        },
        {
            action() {
                return tour.next();
            },
            text: "Next",
        },
    ],
});

tour.addStep({
    id: "account-navbar",
    title: "Account Access",
    text: "This icon leads to the account page. You can find details or login here.",
    attachTo: {
        element: "#account-navbar",
        on: "bottom",
    },
    buttons: [
        {
            action() {
                return tour.back();
            },
            classes: "shepherd-button-secondary",
            text: "Back",
        },
        {
            action() {
                return tour.next();
            },
            text: "Next",
        },
    ],
});

tour.addStep({
    id: "cart-navbar",
    title: "Shopping Cart",
    text: "This icon opens your cart. You can place an order or go to the menu from here.",
    attachTo: {
        element: "#cart-navbar",
        on: "bottom",
    },
    buttons: [
        {
            action() {
                return tour.back();
            },
            classes: "shepherd-button-secondary",
            text: "Back",
        },
        {
            action() {
                return tour.next();
            },
            text: "Next",
        },
    ],
});

tour.addStep({
    title: "Welcome to Sprout & About!",
    text: "Begin your journey by scrolling down and viewing our home page!",
    buttons: [
        {
            action() {
                return tour.complete();
            },
            classes: "shepherd-button-secondary",
            text: "Jump In!",
        },
    ],
});

// Add more steps here

export default tour;
