import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  bgImage?: string;
  bgGradient?: string;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  fadeIn?: boolean;
  scaleEffect?: boolean;
}

const ParallaxSection = ({
  children,
  className = "",
  bgImage,
  bgGradient,
  speed = 0.5,
  fadeIn = true,
  scaleEffect = false,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <motion.section
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        opacity: fadeIn ? opacity : 1,
        scale: scaleEffect ? scale : 1,
      }}
    >
      {/* Parallax Background */}
      {bgImage && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ y: bgY }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          {bgGradient && (
            <div className={`absolute inset-0 ${bgGradient}`} />
          )}
        </motion.div>
      )}

      {/* Content with parallax */}
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.section>
  );
};

// Parallax wrapper for individual elements
interface ParallaxElementProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  rotateOnScroll?: boolean;
}

export const ParallaxElement = ({
  children,
  className = "",
  speed = 0.3,
  direction = "up",
  rotateOnScroll = false,
}: ParallaxElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const movement = 100 * speed;
  
  const transforms: Record<string, ReturnType<typeof useTransform>> = {
    up: useTransform(scrollYProgress, [0, 1], [movement, -movement]),
    down: useTransform(scrollYProgress, [0, 1], [-movement, movement]),
    left: useTransform(scrollYProgress, [0, 1], [movement, -movement]),
    right: useTransform(scrollYProgress, [0, 1], [-movement, movement]),
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const isHorizontal = direction === "left" || direction === "right";

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: isHorizontal ? transforms[direction] : 0,
        y: !isHorizontal ? transforms[direction] : 0,
        rotate: rotateOnScroll ? rotate : 0,
      }}
    >
      {children}
    </motion.div>
  );
};

// Floating decorative element with parallax
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  intensity?: number; // 0.1 to 2
  delay?: number;
}

export const FloatingElement = ({
  children,
  className = "",
  intensity = 1,
  delay = 0,
}: FloatingElementProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60 * intensity, -60 * intensity]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-15 * intensity, 15 * intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y, rotate, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

// Text reveal with parallax
interface ParallaxTextProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const ParallaxText = ({
  children,
  className = "",
  as: Component = "p",
}: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }}>
      <Component className={className}>{children}</Component>
    </motion.div>
  );
};

export default ParallaxSection;
