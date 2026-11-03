'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useGsapScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Subtle parallax on background shapes
      gsap.to('.gsap-parallax-slow', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.gsap-parallax-slow',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Ambient pulse on platform rings
      gsap.to('.gsap-platform-glow', {
        scale: 1.05,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return containerRef;
}

