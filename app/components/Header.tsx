'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Twitter, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const followButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Animate header on load
    if (headerRef.current) {
      headerRef.current.style.transform = 'translateY(0px)';
      headerRef.current.style.opacity = '1';
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Stake', href: '/stake' },
    { label: 'Whitepaper', href: '#' },
    { label: 'Shop', href: '#' },
    { label: 'Mint', href: '/mint' },
  ];

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: -20,
      transformOrigin: "top right"
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 backdrop-blur-md bg-white/10 border-b border-white/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Animated Logo with Sparkles */}
        <div className="group relative ml-8">
          <Link href="/" className="flex items-center">
            <motion.div 
              ref={logoRef}
              className="h-16 w-16 relative overflow-hidden rounded-full border-2 border-amber-400 shadow-lg group-hover:shadow-2xl transition-all duration-500"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-yellow-100 rounded-full animate-pulse" />
              <Image 
                src="/Images/logo.png" 
                alt="Fluffy Bears Logo" 
                fill
                className="object-contain relative z-10 group-hover:scale-110 transition-transform duration-500 p-1"
                sizes="(max-width: 768px) 64px, 64px"
                priority
              />
            </motion.div>
            
            <motion.div className="ml-2">
              <Image 
                src="/Images/textologo.png" 
                alt="Fluffy Bears Text" 
                width={100}
                height={20}
                className="object-contain group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </motion.div>
          </Link>
        </div>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link 
                  href={item.href}
                  className="relative block px-6 py-3 text-amber-950 font-medium overflow-hidden rounded-2xl group transition-all duration-300 hover:shadow-lg isolation-auto"
                >
                  <span className="relative z-20 transition-all duration-150 group-hover:text-white group-hover:font-bold">
                    {item.label}
                  </span>
                  
                  {/* Background hover effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 rounded-2xl shadow-lg opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-10"
                  />
                  
                  {/* Shimmer effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out z-10"
                  />
                </Link>
              </motion.div>
            </motion.div>
          ))}
          
          <motion.div 
            className="relative ml-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              ref={followButtonRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="relative px-8 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white rounded-2xl font-semibold overflow-hidden group shadow-2xl hover:shadow-3xl transition-all duration-500 border border-amber-300/30"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f97316 100%)',
                boxShadow: '0 20px 40px -12px rgba(245, 158, 11, 0.4)'
              }}
            >
              {/* Animated background layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              
              {/* Shimmer effect - honey drip */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent opacity-0 group-hover:opacity-100 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              
              {/* Honey drops container */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {/* Honey drop 1 */}
                <motion.div
                  className="absolute top-2 right-3 w-3 h-4 bg-gradient-to-b from-yellow-200 to-amber-400 rounded-full opacity-80"
                  style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
                  animate={{ 
                    y: [0, 15, 0], 
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0.6, 0.9, 0.6] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0 
                  }}
                />
                
                {/* Honey drop 2 */}
                <motion.div
                  className="absolute top-4 left-4 w-2 h-3 bg-gradient-to-b from-amber-200 to-orange-400 rounded-full opacity-70"
                  style={{ borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%' }}
                  animate={{ 
                    y: [0, 12, 0], 
                    scale: [0.9, 1.2, 0.9],
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5 
                  }}
                />
                
                {/* Honey drop 3 */}
                <motion.div
                  className="absolute bottom-3 right-6 w-2.5 h-3.5 bg-gradient-to-b from-yellow-300 to-amber-500 rounded-full opacity-75"
                  style={{ borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%' }}
                  animate={{ 
                    y: [0, 10, 0], 
                    scale: [0.7, 1.0, 0.7],
                    opacity: [0.4, 0.8, 0.4] 
                  }}
                  transition={{ 
                    duration: 2.8, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1.0 
                  }}
                />
                
                {/* Small honey bubble */}
                <motion.div
                  className="absolute bottom-2 left-6 w-1.5 h-2 bg-gradient-to-b from-yellow-100 to-amber-300 rounded-full opacity-60"
                  style={{ borderRadius: '50% 50% 50% 50% / 80% 80% 20% 20%' }}
                  animate={{ 
                    y: [0, 8, 0], 
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.4, 0.7, 0.4] 
                  }}
                  transition={{ 
                    duration: 3.2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1.5 
                  }}
                />
              </div>
              
              {/* Honey glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-20 flex items-center justify-center gap-2">
                <motion.div
                  className="text-amber-900"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🐻
                </motion.div>
                <span className="font-bold text-sm tracking-wide">Follow Us</span>
                <motion.div
                  className="text-amber-200"
                  animate={{ 
                    y: [0, -2, 0],
                    scale: [0.8, 1, 0.8] 
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  🍯
                </motion.div>
              </div>
            </motion.button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute right-0 mt-4 w-72 rounded-3xl bg-white shadow-2xl border border-amber-200 overflow-hidden"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(245, 158, 11, 0.25)'
                  }}
                >
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-amber-100 to-yellow-100 border-b border-amber-200/30">
                    <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        🐻
                      </motion.div>
                      Connect with Fluffy Bears
                      <motion.div
                        animate={{ 
                          y: [0, -1, 0],
                          scale: [0.8, 1, 0.8] 
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      >
                        🍯
                      </motion.div>
                    </h3>
                    <p className="text-xs text-amber-700 mt-1">Join our sweet community</p>
                  </div>

                  <div className="p-3 space-y-2 bg-white">
                    {/* Twitter Button */}
                    <motion.a
                      href="https://x.com/Fluffy_Bearss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-3 bg-white hover:bg-blue-50 rounded-xl transition-all duration-300 group border border-blue-200 hover:border-blue-300 hover:shadow-md relative z-10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div 
                        className="w-10 h-10 rounded-xl bg-[#1DA1F2] flex items-center justify-center mr-3 shadow-sm"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Twitter className="w-5 h-5 text-white" />
                      </motion.div>
                      <div className="flex flex-col flex-1">
                        <span className="font-semibold text-gray-800">Twitter</span>
                        <span className="text-sm text-gray-500">@Fluffy_Bearss</span>
                      </div>
                      <Badge className="bg-blue-500 text-white text-xs px-3 py-1">
                        Follow
                      </Badge>
                    </motion.a>
                    
                    {/* Discord Button */}
                    <motion.div 
                      className="flex items-center px-4 py-3 bg-amber-50 hover:bg-amber-100 rounded-xl cursor-not-allowed border border-amber-200 transition-all duration-300 opacity-70 relative z-10"
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-300 flex items-center justify-center mr-3 shadow-sm">
                        <MessageSquare className="w-5 h-5 text-amber-700" />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="font-semibold text-amber-800">Discord</span>
                        <span className="text-sm text-amber-600">Community Chat</span>
                      </div>
                      <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Badge variant="secondary" className="bg-amber-200 text-amber-800 border border-amber-300 text-xs px-3 py-1">
                          Soon
                        </Badge>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 border-t border-amber-200/30">
                    <p className="text-xs text-center text-amber-700">
                      Stay tuned for more platforms! 🐻🍯
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </nav>

        {/* Enhanced Mobile Menu Toggle */}
        <motion.button 
          className="md:hidden relative overflow-hidden text-amber-950 p-3 rounded-2xl group shadow-lg hover:shadow-xl transition-all duration-300 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isMenuOpen ? { rotate: 180 } : { rotate: 0 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/60 to-yellow-100/60 opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 rounded-2xl" />
          <motion.div 
            className="relative block z-10"
            animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X size={24} className="text-amber-950 drop-shadow-md" />
            ) : (
              <Menu size={24} className="text-amber-950 drop-shadow-md" />
            )}
          </motion.div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full animate-pulse" />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Compact Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-amber-200 shadow-xl"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="max-w-7xl mx-auto">
              <nav className="flex flex-col p-4 space-y-2">
                {/* Navigation Items - Compact Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link 
                        href={item.href}
                        className="block py-3 px-4 rounded-xl text-center text-amber-900 font-medium text-sm bg-amber-50 hover:bg-amber-100 border border-amber-200/50 hover:border-amber-300 transition-all duration-200 shadow-sm hover:shadow-md"
                        onClick={toggleMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Social Links - Horizontal Layout */}
                <motion.div 
                  className="flex justify-center space-x-3 pt-2 border-t border-amber-200/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.a
                    href="https://x.com/Fluffy_Bearss"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200 border border-blue-200/50"
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-4 h-4 text-[#1DA1F2] mr-2" />
                    <span className="text-sm font-medium text-gray-700">Follow</span>
                  </motion.a>
                  
                  <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg opacity-60 border border-gray-200/50">
                    <MessageSquare className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-500">Soon</span>
                  </div>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;