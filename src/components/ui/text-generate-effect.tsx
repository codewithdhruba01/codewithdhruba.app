"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.35,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration,
        delay: stagger(0.15),
      }
    );
  }, [scope]);

  return (
    <div className={cn("font-satoshi", className)}>
      <motion.div ref={scope} className="leading-relaxed flex flex-wrap justify-center">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={idx}
            className="opacity-0 text-gray-400 font-outfit"
            style={{
              filter: filter ? "blur(10px)" : "none",
              marginRight: "6px",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};
