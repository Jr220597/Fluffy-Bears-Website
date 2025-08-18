'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionText = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [anime, setAnime] = useState<any>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const phrases = [
    { 
      text: "The ticker is", 
      emphasis: "ETH" 
    },
    { 
      text: "The chain is", 
      emphasis: "LINEA" 
    }, 
    { 
      text: "The NFT is", 
      emphasis: "Fluffy Bears" 
    }
  ];

  // Removed AnimeJS - using only Framer Motion
  useEffect(() => {
    // AnimeJS removed to avoid build issues
  }, []);

  // Text animation (AnimeJS removed)
  const animateText = (element: HTMLElement) => {
    return; // Disabled AnimeJS animation
    
    // Find all text spans and animate their letters
    const spans = element.querySelectorAll('span');
    spans.forEach((span, spanIndex) => {
      const originalText = span.textContent || '';
      span.innerHTML = originalText.replace(/\S/g, '<span class="letter">$&</span>');
      
      anime({
        targets: span.querySelectorAll('.letter'),
        translateY: [30, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        duration: 500,
        delay: (el: any, i: number) => (spanIndex * 200) + (i * 40),
        easing: 'easeOutCubic'
      });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (textRef.current && anime) {
      setTimeout(() => animateText(textRef.current!), 50);
    }
  }, [currentIndex, anime]);

  const currentPhrase = phrases[currentIndex];

  return (
    <div className="bg-amber-400 hover:bg-amber-500 text-amber-950 rounded-full px-8 py-6 h-auto text-lg md:text-xl font-bold border-2 border-amber-600 hover:border-amber-700 shadow-md transition-all duration-300 inline-block min-w-[280px] md:min-w-[320px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          ref={textRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="whitespace-nowrap text-center"
        >
          <span>{currentPhrase.text} </span>
          <span className="font-extrabold text-amber-900 drop-shadow-sm">
            {currentPhrase.emphasis}
          </span>
        </motion.div>
      </AnimatePresence>

      <style jsx>{`
        .letter {
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default TransitionText;