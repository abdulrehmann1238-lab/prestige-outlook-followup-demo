export const DURATION = {
  fast: 0.12,
  med: 0.24,
  slow: 0.48,
  hero: 0.9,
} as const;

export const EASING = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  standard: [0.2, 0, 0, 1] as const,
};

export const VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASING.out } },
    exit: { opacity: 0, y: 4, transition: { duration: DURATION.med } },
  },
  fadeInRiseSmall: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0, transition: { duration: DURATION.med, ease: EASING.out } },
    exit: { opacity: 0, y: 4, transition: { duration: DURATION.fast } },
  },
  routeTransition: {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0, transition: { duration: DURATION.med, ease: EASING.out } },
    exit: { opacity: 0, transition: { duration: DURATION.fast } },
  },
  modal: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASING.out } },
    exit: { opacity: 0, scale: 0.98, transition: { duration: DURATION.med } },
  },
  drawer: {
    initial: { x: '100%' },
    animate: { x: 0, transition: { duration: DURATION.slow, ease: EASING.out } },
    exit: { x: '100%', transition: { duration: 0.32, ease: EASING.inOut } },
  },
  toast: {
    initial: { opacity: 0, y: 8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: DURATION.med, ease: EASING.out } },
    exit: { opacity: 0, y: 4, scale: 0.96, transition: { duration: DURATION.fast } },
  },
};
