'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  icon: string;
  color: string;
}

const sections: Section[] = [
  {
    id: 'mint',
    title: 'Mint',
    icon: '🎨',
    color: '#8b5cf6'
  },
  {
    id: 'stake',
    title: 'Stake',
    icon: '💰',
    color: '#10b981'
  },
  {
    id: 'products',
    title: 'Produtos Físicos',
    icon: '🧸',
    color: '#f59e0b'
  },
  {
    id: 'social',
    title: 'Monetização Social',
    icon: '📱',
    color: '#3b82f6'
  },
  {
    id: 'rewards',
    title: 'Recompensas',
    icon: '🏆',
    color: '#f59e0b'
  }
];

interface ProgressiveLoaderProps {
  scrollProgress: number;
  currentSection: number;
}

const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({ scrollProgress, currentSection }) => {
  const circumference = 2 * Math.PI * 100; // raio de 100px
  
  // Calcular o progresso baseado na seção atual
  const sectionProgress = (currentSection + 1) / sections.length;
  const strokeDashoffset = circumference - (sectionProgress * circumference);
  
  const currentSectionData = sections[currentSection] || sections[0];

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="relative w-48 h-48">
        {/* Background blur */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-lg rounded-full border border-white/40 shadow-2xl"></div>
        
        {/* SVG Circle */}
        <svg
          className="absolute inset-4 w-40 h-40 transform -rotate-90"
          viewBox="0 0 200 200"
        >
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="4"
          />
          
          {/* Progress circles for each section */}
          {sections.map((section, index) => {
            const isActive = index <= currentSection;
            const sectionOffset = circumference - ((index + 1) / sections.length) * circumference;
            
            return (
              <motion.circle
                key={section.id}
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={isActive ? section.color : 'rgba(255, 255, 255, 0.2)'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={isActive ? sectionOffset : circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ 
                  strokeDashoffset: isActive ? sectionOffset : circumference,
                  stroke: isActive ? section.color : 'rgba(255, 255, 255, 0.2)'
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{
                  filter: isActive ? `drop-shadow(0 0 8px ${section.color}40)` : 'none'
                }}
              />
            );
          })}
        </svg>

        {/* Centro com conteúdo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            key={currentSection}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <motion.div 
              className="text-4xl mb-2"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {currentSectionData.icon}
            </motion.div>
            <div 
              className="text-sm font-bold mb-1"
              style={{ color: currentSectionData.color }}
            >
              {currentSectionData.title}
            </div>
            <div className="text-xs text-gray-600">
              {currentSection + 1} de {sections.length}
            </div>
          </motion.div>
        </div>

        {/* Indicadores de seção ao redor */}
        <div className="absolute inset-0">
          {sections.map((section, index) => {
            const angle = (index * 360) / sections.length - 90; // -90 para começar no topo
            const radius = 85;
            const x = Math.cos((angle * Math.PI) / 180) * radius + 96;
            const y = Math.sin((angle * Math.PI) / 180) * radius + 96;
            
            return (
              <motion.div
                key={section.id}
                className={`absolute w-3 h-3 rounded-full border-2 border-white transition-all duration-500`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  backgroundColor: index <= currentSection ? section.color : 'rgba(255, 255, 255, 0.3)',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: index <= currentSection ? `0 0 12px ${section.color}60` : 'none'
                }}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: index <= currentSection ? 1.2 : 1,
                  backgroundColor: index <= currentSection ? section.color : 'rgba(255, 255, 255, 0.3)'
                }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressiveLoader;