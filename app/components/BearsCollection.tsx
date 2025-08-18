'use client';

import { useState, useEffect, useRef } from 'react';
import BearCard from './BearCard';

const BearsCollection = () => {
  const [selectedBear, setSelectedBear] = useState<number | null>(null);
  const [visibleBears, setVisibleBears] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const bears = [
    {
      name: 'Honey Bear',
      description: 'O mascote principal da coleção Fluffy Bears, coberto de mel dourado e com um sorriso adorável.',
      imageUrl: '/Images/honeybear.png',
      tags: ['Mel', 'Dourado', 'Comum']
    },
    {
      name: 'White Bear',
      description: 'Um ursinho branco como a neve, raro e majestoso, com um visual limpo e elegante.',
      imageUrl: '/Images/Polar.png',
      tags: ['Branco', 'Raro', 'Elegante']
    },
    {
      name: 'Leaf Bear',
      description: 'Um ursinho feito de folhas, conectado com a natureza e representando a sustentabilidade.',
      imageUrl: '/Images/leaf.png',
      tags: ['Folhas', 'Verde', 'Natureza']
    },
    {
      name: 'Hoodie Bear',
      description: 'Ursinho estiloso com seu capuz vermelho, pronto para qualquer aventura com estilo.',
      imageUrl: '/Images/hoodie.png',
      tags: ['Capuz', 'Vermelho', 'Estilo']
    },
    {
      name: 'Skeleton Bear',
      description: 'Um ursinho com visual de esqueleto, perfeito para colecionadores que gostam de um toque de mistério.',
      imageUrl: '/Images/skeleton.png',
      tags: ['Esqueleto', 'Raro', 'Místico']
    },
    {
      name: 'Bull Bear',
      description: 'Ursinho com chifres, simbolizando força e determinação, pronto para enfrentar qualquer desafio.',
      imageUrl: '/Images/bull.png',
      tags: ['Chifres', 'Marrom', 'Força']
    }
  ];

  // Handle intersection observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // After section is visible, start revealing bears one by one
            let timeout: NodeJS.Timeout;
            for (let i = 0; i < bears.length; i++) {
              timeout = setTimeout(() => {
                setVisibleBears(prev => [...prev, i]);
              }, i * 150);
            }
            observer.disconnect();
            return () => clearTimeout(timeout);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [bears.length]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center py-20 px-4"
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200 opacity-80"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-50/5 to-amber-50/5 bg-repeat opacity-10"
        />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-800">Our Collection</h2>
          <p className="text-lg md:text-xl text-amber-700 max-w-3xl mx-auto">
            Explore our unique Fluffy Bears, each with their own personality and traits. 
            Collect them all to complete your fluffy family!
          </p>
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
            {bears.map((bear, index) => (
              <div 
                key={bear.name}
                className={`transition-all duration-500 ${visibleBears.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              >
                <BearCard 
                  name={bear.name}
                  description={bear.description}
                  imageUrl={bear.imageUrl}
                  tags={bear.tags}
                  index={index}
                  isSelected={selectedBear === index}
                  onClick={() => setSelectedBear(index === selectedBear ? null : index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BearsCollection;