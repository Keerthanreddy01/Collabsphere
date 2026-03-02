"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const CustomCursor = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") ||
                target.closest("a") ||
                target.classList.contains("clickable")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleHover);

        return () => {
            window.removeEventListener("resize", checkMobile);
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleHover);
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <>
            {/* Outer border */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/50 pointer-events-none z-[9999]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(124, 58, 237, 0.1)" : "rgba(0, 0, 0, 0)",
                }}
            />
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-secondary pointer-events-none z-[9999]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isHovering ? 0.5 : 1,
                }}
            />
            {/* Glow effect */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] pointer-events-none z-[-1]"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
};
