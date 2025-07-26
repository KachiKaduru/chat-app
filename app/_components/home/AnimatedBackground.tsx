// components/animated-background.tsx
"use client";

import { generateBubbleData } from "@/app/_utils/bubbleData";
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  const bubbles = generateBubbleData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
      className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          initial={{
            y: bubble.initialY,
            x: bubble.initialX,
            opacity: 0,
          }}
          animate={{
            y: bubble.exitY,
            x: bubble.endX,
            opacity: [0, 0.2, 0], // Fade in and out
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: bubble.id % 3 === 0 ? 2 : 0, // Some bubbles delay their restart
          }}
          className="absolute rounded-full bg-[#928dab]"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
          }}
        />
      ))}
    </motion.div>
  );
};
