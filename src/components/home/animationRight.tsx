
"use client"
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedComponentProps {
  children: any
}

const AnimatedComponentRight: React.FC<AnimatedComponentProps> = ({ children }: { children: any }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    // rootMargin: '-50px 0px',
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: [20] },
      }}
      transition={{ duration: 1.5 }}

    >
      {children}
    </motion.div>
  );
};

export default AnimatedComponentRight;