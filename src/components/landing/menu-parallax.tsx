import {motion, MotionValue, useScroll, useTransform} from "motion/react";
import React from "react";

const MenuParallax = (): React.JSX.Element => {
    function useParallax(
        value: MotionValue<number>,
        distance: number,
    ): MotionValue<number> {
        return useTransform(value, [0, 1], [-distance, distance]);
    }
    const ref = React.useRef(null);
    const {scrollYProgress} = useScroll({target: ref});
    const y = useParallax(scrollYProgress, 300);
    const y2 = useParallax(scrollYProgress, 800);

    return (
        <div ref={ref} className="h-[200vh]">
            {/* <motion.div
                initial={{visibility: "hidden"}}
                animate={{visibility: "visible"}}
                style={{y}}
                onClick={() => console.log("clicked")}
            >
                Hello World
            </motion.div>
            <motion.div>Hello world2</motion.div>
            <motion.div
                initial={{visibility: "hidden"}}
                animate={{visibility: "visible"}}
                style={{y: y2}}
            >
                Hello world
            </motion.div> */}
        </div>
    );
};

export default MenuParallax;
