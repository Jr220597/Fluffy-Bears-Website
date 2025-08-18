'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TagProps {
  text: string;
  color: string;
  index: number;
}

const Tag = ({ text, color, index }: TagProps) => {
  const getTagStyle = (color: string) => {
    switch (color.toLowerCase()) {
      case 'mel':
      case 'dourado':
        return 'bg-amber-900/20 text-amber-200';
      case 'branco':
      case 'raro':
      case 'elegante':
        return 'bg-blue-900/20 text-blue-200';
      case 'folhas':
      case 'verde':
      case 'natureza':
        return 'bg-green-900/20 text-green-200';
      case 'capuz':
      case 'vermelho':
      case 'estilo':
        return 'bg-red-900/20 text-red-200';
      case 'esqueleto':
      case 'místico':
        return 'bg-purple-900/20 text-purple-200';
      case 'chifres':
      case 'marrom':
      case 'força':
        return 'bg-orange-900/20 text-orange-200';
      default:
        return 'bg-gray-900/20 text-gray-200';
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        type: "spring",
        stiffness: 500
      }}
      className={`px-3 py-1 rounded-full text-xs font-medium ${getTagStyle(color)}`}
    >
      {text}
    </motion.span>
  );
};

interface BearCardProps {
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  index: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const BearCard = ({ name, description, imageUrl, tags, index, isSelected = false, onClick }: BearCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15, 
        type: "spring",
        damping: 12
      }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        transform: isHovered ? `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)` : undefined,
        transition: isHovered ? "transform 0.1s ease" : "transform 0.3s ease-out"
      }}
      className={`bg-slate-900/50 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl group cursor-pointer
        ${isSelected 
          ? 'ring-4 ring-amber-400/50 shadow-2xl shadow-amber-400/20 scale-105 z-10' 
          : 'border border-white/10 hover:shadow-xl hover:shadow-white/10 hover:border-white/20'
        }
        transition-all duration-300 ease-out`}
    >
      <div className="relative">
        <motion.div 
          className="w-full aspect-square relative rounded-xl overflow-hidden"
          animate={{ 
            y: isHovered ? -5 : 0,
            scale: isSelected ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <Image
            src={imageUrl}
            alt={name}
            fill
            className={`object-contain transition-transform duration-700 ease-out
              ${isHovered ? 'scale-110' : 'scale-100'} 
              ${isSelected ? 'scale-105' : ''}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          <motion.div 
            className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-amber-400/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isSelected ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>

      <motion.div
        className="p-5"
        animate={{ 
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300
          ${isSelected ? 'text-amber-400' : 'text-white group-hover:text-amber-400'}`}
        >
          {name}
        </h3>
        
        <p className="text-sm text-white/70 mb-4 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag, idx) => (
            <Tag key={idx} text={tag} color={tag} index={idx} />
          ))}
        </div>
        
        {isSelected && (
          <motion.div 
            className="mt-4 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-xs font-medium text-amber-400 bg-amber-900/20 px-3 py-1.5 rounded-full border border-amber-400/20">
              Selecionado
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BearCard; 