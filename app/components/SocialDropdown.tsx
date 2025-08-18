'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Twitter, Instagram, Github, Youtube, Linkedin, ChevronDown } from 'lucide-react';

export function SocialDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [animatedItems, setAnimatedItems] = useState<number[]>([]);

  const socialLinks = [
    { name: 'Twitter', icon: <Twitter size={18} />, href: 'https://twitter.com/fluffybearsnft', bgColor: 'from-blue-400 to-blue-500' },
    { name: 'Instagram', icon: <Instagram size={18} />, href: 'https://instagram.com/fluffybearsnft', bgColor: 'from-pink-400 to-pink-600' },
    { name: 'GitHub', icon: <Github size={18} />, href: 'https://github.com/fluffybearsnft', bgColor: 'from-gray-700 to-gray-900' },
    { name: 'YouTube', icon: <Youtube size={18} />, href: 'https://youtube.com/fluffybearsnft', bgColor: 'from-red-500 to-red-700' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, href: 'https://linkedin.com/company/fluffybearsnft', bgColor: 'from-blue-600 to-blue-800' },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset animations when opening
      setAnimatedItems([]);
      // Stagger the animations
      socialLinks.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedItems(prev => [...prev, index]);
        }, index * 60);
      });
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="social-dropdown relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="relative px-4 py-2 group overflow-hidden rounded-md border border-transparent hover:border-amber-200/60 flex items-center space-x-1.5"
      >
        <div className="relative z-10 flex items-center">
          <span className="font-medium text-amber-900 group-hover:text-amber-800 transition-colors duration-300">Follow Us</span>
          <ChevronDown 
            className={`ml-1.5 transition-transform duration-300 text-amber-700 ${isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} 
            size={16} 
          />
        </div>
        
        <span className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-amber-200/50 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 rounded-md"></span>
        
        {/* Ripple effect on click */}
        <span className="absolute inset-0 ripple-effect"></span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 z-50 min-w-[220px] py-2 bg-white rounded-lg shadow-xl border border-amber-100 transform origin-top-right">
          <ul>
            {socialLinks.map((link, index) => (
              <li
                key={link.name}
                className={`px-1 ${animatedItems.includes(index) ? 'animate-slideIn' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <a 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center px-3 py-2.5 hover:bg-amber-50 rounded-md group transition-all duration-200"
                >
                  <div className={`flex justify-center items-center w-8 h-8 rounded-full bg-gradient-to-br ${link.bgColor} text-white shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-300`}>
                    {link.icon}
                  </div>
                  <span className="ml-3 font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{link.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <style jsx>{`
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          background: rgba(255, 255, 255, 0.7);
          pointer-events: none;
        }
        
        .ripple-effect.animate {
          animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      
      {/* Script for ripple effect */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const buttons = document.querySelectorAll('.social-dropdown button');
            buttons.forEach(button => {
              button.addEventListener('click', function(e) {
                const ripple = button.querySelector('.ripple-effect');
                ripple.classList.remove('animate');
                
                const x = e.pageX - this.offsetLeft;
                const y = e.pageY - this.offsetTop;
                
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                ripple.classList.add('animate');
              });
            });
          });
        `,
      }} />
    </div>
  );
} 