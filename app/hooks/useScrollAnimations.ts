'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

export const useScrollAnimations = () => {
  const observersRef = useRef<IntersectionObserver[]>([]);

  // Cleanup observers on unmount
  useEffect(() => {
    return () => {
      observersRef.current.forEach(observer => observer.disconnect());
    };
  }, []);

  const createScrollAnimation = (
    selector: string, 
    animationConfig: any, 
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px'
  ) => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              ...animationConfig,
              complete: () => {
                // Optional: disconnect observer after animation
                observer.unobserve(entry.target);
              }
            });
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((element) => observer.observe(element));
    observersRef.current.push(observer);
  };

  // Predefined animation presets
  const animationPresets = {
    fadeInUp: {
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      easing: 'easeOutCubic',
      delay: (el: any, i: number) => i * 100
    },
    
    fadeInLeft: {
      opacity: [0, 1],
      translateX: [-100, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: (el: any, i: number) => i * 150
    },
    
    fadeInRight: {
      opacity: [0, 1],
      translateX: [100, 0],
      duration: 1000,
      easing: 'easeOutExpo',
      delay: (el: any, i: number) => i * 150
    },
    
    scaleIn: {
      opacity: [0, 1],
      scale: [0.3, 1],
      duration: 600,
      easing: 'easeOutBack',
      delay: (el: any, i: number) => i * 80
    },
    
    slideInDown: {
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 700,
      easing: 'easeOutCubic',
      delay: (el: any, i: number) => i * 120
    },
    
    rotateIn: {
      opacity: [0, 1],
      rotate: [-180, 0],
      scale: [0.5, 1],
      duration: 800,
      easing: 'easeOutElastic',
      delay: (el: any, i: number) => i * 100
    },
    
    flipIn: {
      opacity: [0, 1],
      rotateY: [90, 0],
      duration: 800,
      easing: 'easeOutCubic',
      delay: (el: any, i: number) => i * 150
    },

    textReveal: {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
      delay: (el: any, i: number) => i * 50
    },

    staggerCards: {
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.8, 1],
      duration: 800,
      easing: 'easeOutCubic',
      delay: (el: any, i: number) => i * 200
    },

    bounceIn: {
      opacity: [0, 1],
      scale: [0, 1],
      duration: 600,
      easing: 'easeOutBounce',
      delay: (el: any, i: number) => i * 100
    }
  };

  const setupScrollAnimations = (animations: { selector: string; preset: keyof typeof animationPresets; threshold?: number }[]) => {
    animations.forEach(({ selector, preset, threshold }) => {
      createScrollAnimation(selector, animationPresets[preset], threshold);
    });
  };

  return {
    anime,
    createScrollAnimation,
    animationPresets,
    setupScrollAnimations
  };
};