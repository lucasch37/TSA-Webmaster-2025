import {AnimatedTestimonials} from "@/components/ui/animated-testimonials";

export function Farms(): React.ReactNode {
    const testimonials = [
        {
            quote: "A worker-owned cooperative connecting local farms to our kitchen, providing us with seasonal vegetables and fruits.",
            name: "LINC Foods",
            designation: "3808 N Sullivan Rd #12p, Spokane Valley, WA 99216",
            src: "/about/prep.jpg",
            logo: "/about/logos/linc.png",
        },
        {
            quote: "Specializing in organic grains and legumes, this farm cooperative helps us create our signature plant-based proteins.",
            name: "PNW Co-op",
            designation: "6109 E Desmet Spokane Valley, WA 99212",
            src: "/pnwcoop.jpg",
            logo: "/about/logos/pnwcoop.png",
        },
        {
            quote: "An urban farm providing us with year-round greens and specialty herbs for our most popular dishes.",
            name: "Vinegar Flats Farm",
            designation: "2121 S Cherry St, Spokane, WA 99224",
            src: "/vinegarflatsfarm.jpg",
            logo: "/about/logos/vinegarflats.png",
        },
        {
            quote: "A family-owned farm that supplies us with heirloom varieties of vegetables and organic berries.",
            name: "Cedar Taylor Farm",
            designation: "9616 South Cedar Road Spokane, WA 99224",
            src: "/cedartaylorfarm.jpg",
            logo: "/about/logos/cedartaylor.jpg",
        },
    ];
    return <AnimatedTestimonials testimonials={testimonials} />;
}
