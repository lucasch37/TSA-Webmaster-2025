import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: cn(
                    "bg-primary font-semibold text-primary-foreground shadow hover:bg-primary/90",
                    `active:translate-y-1.5 active:-translate-x-0.5  active:[box-shadow:0_0px_0_0_#166534]
                                                    active:border-b-[0px]
                                                    transition-all duration-150 [box-shadow:-2px_5px_0_0_#166534]
                                                    border-[1px]`,
                ),
                destructive:
                    "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
                outline: "border text-primary",
                secondary:
                    "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
                ghost: "hover:bg-primary/20",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "px-6 py-3 rounded-full text-sm",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "py-4 rounded-full px-8",
                icon: "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = "Button";

export {Button, buttonVariants};
