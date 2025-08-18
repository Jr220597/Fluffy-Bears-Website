'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Start as true to prevent flash
  const [mounted, setMounted] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || window.innerWidth <= 768 
        || ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only add event listeners on desktop
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('button, a, [role="button"], input, select, textarea')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Add event listeners
    document.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  // Don't render cursor on mobile devices
  if (isMobile || !mounted) {
    return null;
  }

  const cursorContent = (
    <>
      {/* Main Custom Cursor */}
      <div
        className="fixed pointer-events-none w-8 h-8"
        style={{
          zIndex: 2147483647, // Maximum z-index value
          left: `${mousePosition.x - 16}px`,
          top: `${mousePosition.y - 16}px`,
          transform: `scale(${isClicking ? 0.8 : isHovering ? 1.3 : 1})`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <Image
          src="/Images/cursor.png"
          alt="Custom Cursor"
          width={32}
          height={32}
          className="object-contain"
          draggable={false}
        />
      </div>

      {/* Cursor Trail */}
      <div
        className="fixed pointer-events-none w-2 h-2 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full opacity-60"
        style={{
          zIndex: 2147483646, // Maximum z-index value - 1
          left: `${mousePosition.x - 4}px`,
          top: `${mousePosition.y - 4}px`,
          transform: `scale(${isHovering ? 0.5 : 1})`,
          transition: 'transform 0.15s ease-out',
        }}
      />

      {/* Honey Particles */}
      {isHovering && (
        <div 
          className="fixed pointer-events-none"
          style={{ zIndex: 2147483645 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-2 bg-gradient-to-b from-amber-300 to-amber-400 opacity-40 rounded-full"
              style={{
                left: mousePosition.x - 3,
                top: mousePosition.y - 4,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 20],
                y: [0, Math.random() * 15 + 8],
                scale: [1, 0.3],
                opacity: [0.4, 0],
                rotate: [0, Math.random() * 120 - 60],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* Hide Default Cursor - Only on desktop, including modals */}
      <style jsx global>{`
        @media (min-width: 769px) and (hover: hover) {
          * {
            cursor: none !important;
          }
          
          body {
            cursor: none !important;
          }

          a, button, [role="button"], input, select, textarea {
            cursor: none !important;
          }

          /* RainbowKit modal specific selectors */
          [data-rk] *,
          [data-rk] button,
          [data-rk] a,
          [data-rk] input,
          [data-rk] div,
          [role="dialog"] *,
          [role="dialog"] button,
          [role="dialog"] a,
          [role="dialog"] input,
          [role="dialog"] div,
          div[class*="iekbcc"] *,
          div[class*="ju367v"] *,
          div[class*="rainbowkit"] *,
          .rainbowkit-dialog *,
          [data-testid*="rk"] *,
          [id*="rainbowkit"] * {
            cursor: none !important;
          }

          /* Overlay and modal containers */
          [data-rk],
          [role="dialog"],
          div[class*="iekbcc"],
          div[class*="ju367v"],
          div[class*="rainbowkit"],
          .rainbowkit-dialog,
          [data-testid*="rk"],
          [id*="rainbowkit"] {
            cursor: none !important;
          }

          /* Force cursor hidden on all possible RainbowKit elements */
          body > div[data-rk],
          body > div[role="dialog"],
          #__next > div[data-rk],
          #__next > div[role="dialog"] {
            cursor: none !important;
          }

          /* Ensure portal containers also have no cursor */
          [data-radix-portal] *,
          [data-radix-portal] {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );

  // Render cursor using portal to ensure it appears above everything
  return createPortal(cursorContent, document.body);
};

export default CustomCursor;