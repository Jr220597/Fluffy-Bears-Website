'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import TransitionText from './components/TransitionText';
import BuildSection from './components/BuildSection';
import Image from 'next/image';

export default function Home() {

  return (
    <main className="relative">
      {/* Home section with original background */}
      <motion.section 
        className="min-h-screen relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Original background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Images/Background.png" 
            alt="Forest background" 
            fill 
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <Header />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 px-4">
          <motion.div 
            className="w-60 h-60 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: 1,
              filter: [
                "drop-shadow(0 0 15px rgba(251, 191, 36, 0.3))",
                "drop-shadow(0 0 25px rgba(251, 191, 36, 0.5))",
                "drop-shadow(0 0 15px rgba(251, 191, 36, 0.3))"
              ]
            }}
            transition={{ 
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              filter: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              opacity: {
                duration: 0.8,
                ease: "easeOut"
              }
            }}
          >
            <Image 
              src="/Images/logoetexto.png" 
              alt="Fluffy Bears Logo" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </motion.div>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8"
          >
            <TransitionText />
          </motion.div>

        </div>
      </motion.section>

      {/* Segunda seção - Build somETHing */}
      <BuildSection />

    </main>
  );
} 