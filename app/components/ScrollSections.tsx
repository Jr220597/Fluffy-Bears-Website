'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressiveLoader from './ProgressiveLoader';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  bgGradient: string;
  features: string[];
}

const sections: Section[] = [
  {
    id: 'mint',
    title: 'Mint',
    subtitle: 'Crie seu Fluffy Bear',
    description: 'Mint NFTs únicos de ursos fofos com características especiais e raras. Cada bear é gerado algoritmicamente com traços únicos.',
    icon: '🎨',
    color: '#8b5cf6',
    bgGradient: 'from-purple-100 to-pink-100',
    features: ['NFTs Únicos', 'Arte Algorítmica', 'Características Raras', 'Blockchain Verified']
  },
  {
    id: 'stake',
    title: 'Stake',
    subtitle: 'Ganhe Recompensas',
    description: 'Stake seus NFTs e ganhe tokens $HONEY diariamente. Sistema de recompensas com APY competitivo e benefícios exclusivos.',
    icon: '💰',
    color: '#10b981',
    bgGradient: 'from-green-100 to-emerald-100',
    features: ['$HONEY Diário', 'APY Alto', 'Benefícios Exclusivos', 'Stake Seguro']
  },
  {
    id: 'products',
    title: 'Produtos Físicos',
    subtitle: 'Pelúcias Exclusivas',
    description: 'Adquira pelúcias físicas dos seus NFTs favoritos. Design baseado no seu bear com qualidade premium e entrega mundial.',
    icon: '🧸',
    color: '#f59e0b',
    bgGradient: 'from-orange-100 to-red-100',
    features: ['Alta Qualidade', 'Design Personalizado', 'Entrega Mundial', 'Edições Limitadas']
  },
  {
    id: 'social',
    title: 'Monetização Social',
    subtitle: 'Ganhe Compartilhando',
    description: 'Monetize suas redes sociais compartilhando conteúdo Fluffy Bears. Programa de afiliados e recompensas por engajamento.',
    icon: '📱',
    color: '#3b82f6',
    bgGradient: 'from-blue-100 to-indigo-100',
    features: ['Programa de Afiliados', 'Recompensas Sociais', 'Conteúdo Exclusivo', 'Integração Fácil']
  },
  {
    id: 'rewards',
    title: 'Recompensas',
    subtitle: 'Sistema de Pontos',
    description: 'Acumule pontos e troque por recompensas exclusivas. Sistema gamificado com níveis de fidelidade e benefícios crescentes.',
    icon: '🏆',
    color: '#f59e0b',
    bgGradient: 'from-yellow-100 to-amber-100',
    features: ['Sistema Gamificado', 'Níveis de Fidelidade', 'Recompensas Exclusivas', 'Benefícios Crescentes']
  }
];

const ScrollSections: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (isScrolling.current) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = Math.min(scrollTop / scrollHeight, 1);

      // Determinar seção atual baseada no progresso
      const newSection = Math.min(Math.floor(progress * sections.length), sections.length - 1);
      
      setScrollProgress(progress);
      setCurrentSection(newSection);
    };

    const smoothScrollHandler = () => {
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    container.addEventListener('scroll', smoothScrollHandler, { passive: true });

    // Wheel event para scroll mais suave
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const scrollAmount = delta * 0.5; // Tornar o scroll mais suave
      
      isScrolling.current = true;
      container.scrollBy({
        top: scrollAmount,
        behavior: 'auto'
      });
      
      setTimeout(() => {
        isScrolling.current = false;
      }, 100);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('scroll', smoothScrollHandler);
      container.removeEventListener('wheel', handleWheel);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const currentSectionData = sections[currentSection];

  return (
    <section className="h-screen relative overflow-hidden">
      {/* Background com gradiente dinâmico */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${currentSectionData.bgGradient} transition-all duration-1000`}
        key={currentSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Loading circular fixo no centro */}
      <ProgressiveLoader scrollProgress={scrollProgress} currentSection={currentSection} />

      {/* Container de scroll interno */}
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          height: '100vh'
        }}
      >
        {/* Conteúdo scrollável - 5x a altura da tela para permitir scroll */}
        <div className="relative" style={{ height: '500vh' }}>
          {sections.map((section, index) => {
            const sectionStart = (index / sections.length) * 100;
            const sectionEnd = ((index + 1) / sections.length) * 100;
            const currentProgress = scrollProgress * 100;
            
            const isActive = currentProgress >= sectionStart && currentProgress < sectionEnd;
            const opacity = isActive ? 1 : 0.3;
            const scale = isActive ? 1 : 0.9;
            
            return (
              <motion.div
                key={section.id}
                className="absolute inset-0 flex items-center justify-center px-4"
                style={{ 
                  top: `${index * 20}vh`,
                  height: '100vh'
                }}
                animate={{
                  opacity,
                  scale,
                  y: isActive ? 0 : index < currentSection ? -50 : 50
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Conteúdo */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.5,
                      x: isActive ? 0 : -30
                    }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={index % 2 === 0 ? '' : 'lg:order-2'}
                  >
                    <div className="text-6xl mb-6">{section.icon}</div>
                    <h2 
                      className="text-5xl font-bold mb-6"
                      style={{ color: section.color }}
                    >
                      {section.title}
                    </h2>
                    <h3 
                      className="text-2xl mb-6"
                      style={{ color: `${section.color}80` }}
                    >
                      {section.subtitle}
                    </h3>
                    <p className="text-lg mb-8 leading-relaxed text-gray-700">
                      {section.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {section.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature}
                          className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: isActive ? 1 : 0.3,
                            y: isActive ? 0 : 20
                          }}
                          transition={{ 
                            delay: isActive ? featureIndex * 0.1 + 0.4 : 0,
                            duration: 0.5 
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: section.color }}
                            />
                            <span 
                              className="font-medium text-sm"
                              style={{ color: section.color }}
                            >
                              {feature}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      className="mt-8 px-8 py-3 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, ${section.color} 0%, ${section.color}80 100%)` 
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{
                        opacity: isActive ? 1 : 0.5,
                        scale: isActive ? 1 : 0.9
                      }}
                    >
                      Saiba Mais sobre {section.title}
                    </motion.button>
                  </motion.div>
                  
                  {/* Visual */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.5,
                      x: isActive ? 0 : 30,
                      scale: isActive ? 1 : 0.9
                    }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`flex justify-center ${index % 2 === 0 ? '' : 'lg:order-1'}`}
                  >
                    <motion.div 
                      className="w-80 h-80 rounded-3xl flex items-center justify-center text-8xl shadow-2xl"
                      style={{ 
                        background: `linear-gradient(135deg, ${section.color}40 0%, ${section.color}20 100%)` 
                      }}
                      animate={{
                        rotate: isActive ? [0, 5, -5, 0] : 0,
                        scale: isActive ? [1, 1.05, 1] : 0.9
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                    >
                      {section.icon}
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <motion.div
          className="text-sm text-gray-600 mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Role para explorar
        </motion.div>
        <motion.div
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ScrollSections;