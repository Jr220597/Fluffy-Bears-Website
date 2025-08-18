"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/ui/tooltip';
import { Button } from '../../components/ui/button';

const brandPillars = [
  {
    image: '/Images/textologo.png',
    title: 'Brand Identity',
    description: 'Our brand represents creativity, innovation, and community. Join us in building something extraordinary.',
    badge: 'Core',
  },
  {
    image: '/Images/yt.png',
    title: 'YouTube Channel',
    description: 'Subscribe to our channel for exclusive content, behind-the-scenes, and community updates.',
    badge: 'Media',
  },
  {
    image: '/Images/pelucia3.png',
    title: 'Product Store',
    description: 'Explore our store for unique merchandise and exclusive Fluffy Bears products.',
    badge: 'Shop',
  }
];

export default function BrandSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 bg-gradient-to-b from-blue-100 via-amber-50 to-green-100 overflow-hidden">
      {/* Subtle animated sparkles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/4 top-24 w-2 h-2 bg-white rounded-full opacity-60 animate-sparkle1" />
        <div className="absolute right-1/3 top-40 w-1.5 h-1.5 bg-white rounded-full opacity-40 animate-sparkle2" />
        <div className="absolute left-1/2 top-56 w-1 h-1 bg-white rounded-full opacity-30 animate-sparkle3" />
      </div>
      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
            Fluffy Bears: More Than Just NFTs
          </h2>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
            {brandPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: idx * 0.18 }}
              >
                <Card className="relative flex flex-col items-center pt-16 pb-8 px-6 bg-white/80 border-2 border-amber-100 shadow-xl hover:shadow-amber-200 transition-all duration-300 rounded-3xl">
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full shadow-lg bg-white flex items-center justify-center border-4 border-amber-100">
                    <img 
                      src={pillar.image} 
                      alt={pillar.title} 
                      className="w-20 h-20 object-cover rounded-full p-2" 
                    />
                  </div>
                  <div className="flex flex-col items-center mt-6">
                    <h3 className="text-2xl font-bold text-amber-800 mb-2 text-center">{pillar.title}</h3>
                    <Badge className="mb-3 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">{pillar.badge}</Badge>
                    <p className="text-amber-700 text-center text-base mb-2">{pillar.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col items-center mt-10"
        >
          <p className="text-xl text-amber-800 mb-6 font-semibold text-center">
            Be part of our journey and create unforgettable memories with Fluffy Bears!
          </p>
          <Button className="bg-gradient-to-r from-amber-500 to-blue-500 hover:from-amber-600 hover:to-blue-600 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg animate-glow">
            Join Our Story
          </Button>
        </motion.div>
      </div>
      <style jsx>{`
        .animate-glow {
          box-shadow: 0 0 16px 4px #fbbf24, 0 0 32px 8px #60a5fa;
          animation: glow 2s infinite alternate;
        }
        @keyframes glow {
          0% { box-shadow: 0 0 16px 4px #fbbf24, 0 0 32px 8px #60a5fa; }
          100% { box-shadow: 0 0 32px 8px #fbbf24, 0 0 16px 4px #60a5fa; }
        }
        .animate-sparkle1 {
          animation: sparkle1 3s ease-in-out infinite alternate;
        }
        .animate-sparkle2 {
          animation: sparkle2 4s ease-in-out infinite alternate;
        }
        .animate-sparkle3 {
          animation: sparkle3 5s ease-in-out infinite alternate;
        }
        @keyframes sparkle1 {
          0% { opacity: 0.6; }
          100% { opacity: 1; box-shadow: 0 0 8px 2px #fff; }
        }
        @keyframes sparkle2 {
          0% { opacity: 0.4; }
          100% { opacity: 1; box-shadow: 0 0 6px 2px #fff; }
        }
        @keyframes sparkle3 {
          0% { opacity: 0.3; }
          100% { opacity: 1; box-shadow: 0 0 10px 3px #fff; }
        }
      `}</style>
    </section>
  );
}