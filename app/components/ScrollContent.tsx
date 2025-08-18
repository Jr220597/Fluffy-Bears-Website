'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
}

const sections: Section[] = [
  {
    id: 'mint',
    title: 'Mint',
    subtitle: 'Crie seu Fluffy Bear',
    description: 'Mint NFTs únicos de ursos fofos com características especiais e raras.',
    icon: '🎨',
    features: [
      'NFTs únicos e colecionáveis',
      'Características raras e especiais',
      'Arte gerada algoritmicamente',
      'Propriedade verificada na blockchain'
    ]
  },
  {
    id: 'stake',
    title: 'Stake',
    subtitle: 'Ganhe Recompensas',
    description: 'Stake seus NFTs e ganhe tokens $HONEY diariamente.',
    icon: '💰',
    features: [
      'Recompensas diárias em $HONEY',
      'APY competitivo',
      'Stake seguro e confiável',
      'Desbloqueie benefícios exclusivos'
    ]
  },
  {
    id: 'products',
    title: 'Produtos Físicos',
    subtitle: 'Pelúcias Exclusivas',
    description: 'Adquira pelúcias físicas dos seus NFTs favoritos.',
    icon: '🧸',
    features: [
      'Pelúcias de alta qualidade',
      'Design baseado no seu NFT',
      'Entrega mundial',
      'Edições limitadas exclusivas'
    ]
  },
  {
    id: 'social',
    title: 'Monetização Social',
    subtitle: 'Ganhe Compartilhando',
    description: 'Monetize suas redes sociais compartilhando conteúdo Fluffy Bears.',
    icon: '📱',
    features: [
      'Programa de afiliados',
      'Recompensas por engajamento',
      'Conteúdo exclusivo para creators',
      'Integração com redes sociais'
    ]
  },
  {
    id: 'rewards',
    title: 'Recompensas',
    subtitle: 'Sistema de Pontos',
    description: 'Acumule pontos e troque por recompensas exclusivas.',
    icon: '🏆',
    features: [
      'Sistema de pontos gamificado',
      'Recompensas exclusivas',
      'Níveis de fidelidade',
      'Benefícios crescentes'
    ]
  }
];

interface ScrollContentProps {
  scrollProgress: number;
}

const ScrollContent: React.FC<ScrollContentProps> = ({ scrollProgress }) => {
  const [currentSection, setCurrentSection] = useState(0);
  
  useEffect(() => {
    const newSection = Math.floor(scrollProgress * sections.length);
    setCurrentSection(Math.min(newSection, sections.length - 1));
  }, [scrollProgress]);

  const currentSectionData = sections[currentSection];

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-6xl mb-4">{currentSectionData.icon}</div>
          
          <h3 className="text-3xl font-bold text-amber-900 mb-2">
            {currentSectionData.title}
          </h3>
          
          <p className="text-xl text-amber-700 mb-4">
            {currentSectionData.subtitle}
          </p>
          
          <p className="text-amber-600 mb-8 text-lg leading-relaxed">
            {currentSectionData.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {currentSectionData.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                  <span className="text-amber-800 font-medium">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Saiba Mais sobre {currentSectionData.title}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ScrollContent;