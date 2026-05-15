'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type VariantType =
  | 'fade'
  | 'left'
  | 'right'
  | 'scale'
  | 'slideUp'
  | 'slideDown';

interface Props {
  children: ReactNode;
  delay?: number;
  variant?: VariantType;
  className?: string;
  hero?: boolean;
}

const variants = {
  fade: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  },

  left: {
    hidden: {
      opacity: 0,
      x: -80,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },

  right: {
    hidden: {
      opacity: 0,
      x: 80,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  },

  scale: {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
  },

  slideUp: {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },

  slideDown: {
    hidden: {
      opacity: 0,
      y: -100,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  },
};

export default function MotionItem({
  children,
  delay = 0,
  variant = 'fade',
  className,
  hero = false,
}: Props) {
  return (
    <motion.div
      className={className}
      variants={variants[variant]}
      initial="hidden"
      {...(hero
        ? {
            animate: 'visible',
          }
        : {
            whileInView: 'visible',
            viewport: {
              once: true,
              amount: 0.2,
            },
          })}
      transition={{
        duration: 0.7,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}