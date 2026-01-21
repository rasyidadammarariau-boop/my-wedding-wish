import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxConfig {
  offset?: ["start end" | "end start" | "start start" | "end end" | "center center", "start end" | "end start" | "start start" | "end end" | "center center"];
  inputRange?: [number, number];
  outputRange?: [number, number];
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export const useParallax = (config?: ParallaxConfig): ParallaxReturn => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: config?.offset || ["start end", "end start"],
  });

  const inputRange = config?.inputRange || [0, 1];
  const outputRange = config?.outputRange || [-50, 50];

  const y = useTransform(scrollYProgress, inputRange, outputRange);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return { ref, y, opacity, scale, scrollYProgress };
};

// Pre-configured parallax effects for common use cases
export const useParallaxSlow = () => useParallax({ outputRange: [-30, 30] });
export const useParallaxFast = () => useParallax({ outputRange: [-100, 100] });
export const useParallaxReverse = () => useParallax({ outputRange: [50, -50] });

// Background parallax effect (slower movement for depth)
export const useBackgroundParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.2, 1.1]);
  
  return { ref, y, scale };
};

// Floating elements parallax (for decorative elements)
export const useFloatingParallax = (intensity: number = 1) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50 * intensity, -50 * intensity]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5 * intensity, 5 * intensity]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10 * intensity, 0]);
  
  return { ref, y, rotate, x, scrollYProgress };
};

// Text reveal parallax effect
export const useTextRevealParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [10, 0]);
  
  return { ref, opacity, y, blur, scrollYProgress };
};

// Section fade parallax
export const useSectionParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
  return { ref, opacity, y, scale, scrollYProgress };
};
