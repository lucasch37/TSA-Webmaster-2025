// src/components/ui/slider.tsx (or your equivalent path)
"use client"

import * as React from "react"
// Corrected import: Import named exports directly
import {
  Root as SliderRoot,
  Track as SliderTrack,
  Range as SliderRange,
  Thumb as SliderThumb,
} from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderRoot>, // Use SliderRoot here
  React.ComponentPropsWithoutRef<typeof SliderRoot> // And here
>(({ className, ...props }, ref) => (
  <SliderRoot // Use SliderRoot
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderTrack className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderRange className="absolute h-full bg-primary" />
    </SliderTrack>
    {/* Ensure props.value exists and is an array before mapping for multiple thumbs */}
    {/* Default to a single thumb if value is not an array or is undefined */}
    {(Array.isArray(props.value) ? props.value : [props.value ?? props.defaultValue ?? 0]).map((thumbValue, index) => (
      <SliderThumb // Use SliderThumb
        key={index}
        className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderRoot>
))
Slider.displayName = SliderRoot.displayName // Use SliderRoot here

export { Slider }