import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MotionSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function MotionSection({
  children,
  delay = 0,
  className,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ width: "100%" }}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px 0px -24px 0px" }}
      transition={{
        duration: reduceMotion ? 0 : 0.52,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function StaggerInView({ children, className, style }: StaggerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduceMotion ? 0 : 0.055,
            delayChildren: reduceMotion ? 0 : 0.06,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

type StaggerChildProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

export function StaggerChild({ children, style }: StaggerChildProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      style={style}
      variants={{
        hidden: reduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
