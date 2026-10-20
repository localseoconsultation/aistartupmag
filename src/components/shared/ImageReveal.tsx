"use client";

import { useState, type ReactNode } from "react";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  type Variants,
} from "motion/react";

const EASE_REVEAL = [0.65, 0, 0.35, 1] as const; // snappy in-out, no dead start
const EASE_SETTLE = [0.22, 1, 0.36, 1] as const; // fast start, soft landing

const CLIP_HIDDEN = {
  horizontal: "inset(0% 50% 0% 50%)", // opens from the vertical center outward
  vertical: "inset(50% 0% 50% 0%)", // opens from the horizontal middle outward
} as const;

const CLIP_VISIBLE = "inset(0% 0% 0% 0%)";

const frameVariants = (hidden: string): Variants => ({
  hidden: { clipPath: hidden },
  visible: (delay: number = 0) => ({
    clipPath: CLIP_VISIBLE,
    transition: { duration: 0.9, ease: EASE_REVEAL, delay },
  }),
});

const imageVariants: Variants = {
  hidden: { scale: 1.12 },
  visible: (delay: number = 0) => ({
    scale: 1,
    transition: { duration: 1.1, ease: EASE_SETTLE, delay },
  }),
};

type ImageRevealProps = {
  /** The image. It gets the scale-down settle. */
  children: ReactNode;
  /** Layers on top of the image (gradients, text). Revealed with the frame, not scaled. */
  overlay?: ReactNode;
  /** Sizing classes for the wrapper, e.g. "aspect-3/2 bg-background". */
  className?: string;
  /** Extra delay in seconds, for staggering cards in a row. */
  delay?: number;
  direction?: keyof typeof CLIP_HIDDEN;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
};

const ImageReveal = ({
  children,
  overlay,
  className = "",
  delay = 0,
  direction = "horizontal",
  amount = 0.15,
}: ImageRevealProps) => {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      {/* Trigger: never clipped, so the in-view observer can always see it */}
      <motion.div
        className={`relative w-full ${className}`}
        initial={reduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount, margin: "0px 0px -6% 0px" }}
        custom={delay}
      >
        {/* Clipped frame */}
        <motion.div
          variants={frameVariants(CLIP_HIDDEN[direction])}
          custom={delay}
          className="absolute inset-0 overflow-hidden"
          onAnimationComplete={() => setDone(true)}
        >
          <motion.div
            variants={imageVariants}
            custom={delay}
            className="absolute inset-0 transform-gpu"
            // Only promote to its own layer while animating, then release it
            style={{ willChange: done ? "auto" : "transform" }}
          >
            {children}
          </motion.div>

          {overlay}
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

export default ImageReveal;
