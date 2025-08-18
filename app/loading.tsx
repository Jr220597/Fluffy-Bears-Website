'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 250);

    // Ensure loading is visible for at least 2 seconds
    const timer = setTimeout(() => {
      const loadingElement = document.getElementById('loading-screen');
      if (loadingElement) {
        loadingElement.classList.add('fade-out');
        setTimeout(() => {
          if (loadingElement) {
            loadingElement.style.display = 'none';
          }
        }, 1000);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div id="loading-screen" className="fixed inset-0 flex flex-col items-center justify-center bg-amber-50 z-[9999]">
      <div className="relative">
        <Image 
          src="/Images/logotransparente.png" 
          alt="Fluffy Bears Logo" 
          width={200} 
          height={200}
          className="animate-pulse"
        />
        
        {/* Honey Drops */}
        <div className="honey-drop drop-loading-1"></div>
        <div className="honey-drop drop-loading-2"></div>
        <div className="honey-drop drop-loading-3"></div>
      </div>
      <p className="mt-6 text-amber-900 font-medium">Loading sweet experiences...</p>
      
      {/* Honey Loading Bar */}
      <div className="mt-6 w-64 h-4 bg-amber-100 rounded-full overflow-hidden relative">
        <div 
          className="honey-fill h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
        
        {/* Honey Bubbles in Loading Bar */}
        <div className="honey-bubble bubble-1"></div>
        <div className="honey-bubble bubble-2"></div>
        <div className="honey-bubble bubble-3"></div>
        <div className="honey-bubble bubble-4"></div>
        <div className="honey-bubble bubble-5"></div>
      </div>
      <p className="mt-2 text-sm text-amber-700">{Math.round(progress)}%</p>
      
      <style jsx global>{`
        @keyframes drip {
          0% {
            transform: translateY(-10px) scale(0.8);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(120px) scale(1);
            opacity: 0;
          }
        }
        
        .honey-drop {
          position: absolute;
          background-color: #FFC107;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          box-shadow: inset -3px -3px 10px rgba(0,0,0,0.1);
          z-index: 10;
        }
        
        .drop-loading-1 {
          width: 20px;
          height: 30px;
          left: 70px;
          top: 150px;
          animation: drip 2s infinite ease-in;
          animation-delay: 0.2s;
        }
        
        .drop-loading-2 {
          width: 25px;
          height: 35px;
          left: 100px;
          top: 155px;
          animation: drip 2.3s infinite ease-in;
          animation-delay: 0.8s;
        }
        
        .drop-loading-3 {
          width: 18px;
          height: 28px;
          left: 130px;
          top: 150px;
          animation: drip 1.8s infinite ease-in;
          animation-delay: 0.5s;
        }
        
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        .fade-out {
          animation: fade-out 1s forwards;
        }
        
        .honey-fill {
          background: linear-gradient(90deg, #F59E0B 0%, #FBBF24 50%, #F59E0B 100%);
          background-size: 200% 100%;
          animation: honey-wave 2s linear infinite;
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.7);
        }
        
        @keyframes honey-wave {
          0% { background-position: 100% 0; }
          100% { background-position: 0 0; }
        }
        
        .honey-bubble {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          z-index: 11;
          pointer-events: none;
        }
        
        .bubble-1 {
          width: 8px;
          height: 8px;
          top: 4px;
          animation: bubble-float 3s infinite ease-in-out;
        }
        
        .bubble-2 {
          width: 6px;
          height: 6px;
          top: 6px;
          animation: bubble-float 2.7s infinite ease-in-out 0.5s;
        }
        
        .bubble-3 {
          width: 5px;
          height: 5px;
          top: 9px;
          animation: bubble-float 3.5s infinite ease-in-out 1s;
        }
        
        .bubble-4 {
          width: 7px;
          height: 7px;
          top: 2px;
          animation: bubble-float 3.2s infinite ease-in-out 1.5s;
        }
        
        .bubble-5 {
          width: 4px;
          height: 4px;
          top: 10px;
          animation: bubble-float 2.8s infinite ease-in-out 0.8s;
        }
        
        @keyframes bubble-float {
          0% { left: -10px; opacity: 0.7; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
} 