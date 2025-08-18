'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
// AnimeJS será carregado via CDN

const BuildSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Carregar AnimeJS via CDN se não estiver carregado
    if (typeof window !== 'undefined' && !(window as any).anime) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
      script.onload = () => initAnimations();
      document.head.appendChild(script);
    } else if ((window as any).anime) {
      initAnimations();
    }

    function initAnimations() {
      const anime = (window as any).anime;
      
      // Aguardar um pouco antes de aplicar efeitos de texto
      setTimeout(() => {
        // Dividir "Build" em caracteres
        const buildElement = document.querySelector('#build-text');
        if (buildElement) {
          const text = buildElement.textContent || '';
          const chars = text.split('');
          buildElement.innerHTML = '';
          
          chars.forEach(char => {
            const span = document.createElement('span');
            span.className = 'char';
            span.style.cssText = `
              display: inline-block;
              opacity: 0;
              transform: translateY(50px);
              background: linear-gradient(135deg, #f59e0b, #d97706, #92400e);
              background-clip: text;
              -webkit-background-clip: text;
              color: transparent;
              text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
            `;
            span.textContent = char === ' ' ? '\u00A0' : char;
            buildElement.appendChild(span);
          });
          
          // Mostrar o container do Build
          (buildElement as HTMLElement).style.opacity = '1';
        }

        // Animar caracteres do "Build"
        anime({
          targets: '#build-text .char',
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 600,
          delay: anime.stagger(100),
          easing: 'easeOutExpo',
          complete: () => {
            // Dividir "somETHing" em caracteres preservando cores
            const somethingElement = document.querySelector('#something-text');
            if (somethingElement) {
              const spans = somethingElement.querySelectorAll('span');
              somethingElement.innerHTML = '';
              
              spans.forEach(span => {
                const text = span.textContent || '';
                const isOrange = span.classList.contains('text-orange-500');
                
                text.split('').forEach(char => {
                  const charSpan = document.createElement('span');
                  charSpan.className = 'char';
                  
                  if (isOrange) {
                    // Estilo para "ETH" (laranja)
                    charSpan.style.cssText = `
                      display: inline-block;
                      opacity: 0;
                      transform: translateY(30px);
                      color: #f97316;
                      text-shadow: 0 0 30px rgba(249, 115, 22, 0.3);
                    `;
                  } else {
                    // Estilo para "som" e "ing" (gradiente azul)
                    charSpan.style.cssText = `
                      display: inline-block;
                      opacity: 0;
                      transform: translateY(30px);
                      background: linear-gradient(135deg, #3b82f6, #1d4ed8, #1e40af);
                      background-clip: text;
                      -webkit-background-clip: text;
                      color: transparent;
                      text-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
                    `;
                  }
                  
                  charSpan.textContent = char === ' ' ? '\u00A0' : char;
                  somethingElement.appendChild(charSpan);
                });
              });
              
              (somethingElement as HTMLElement).style.opacity = '1';
              
              // Animar "somETHing"
              anime({
                targets: '#something-text .char',
                translateY: [30, 0],
                opacity: [0, 1],
                duration: 500,
                delay: anime.stagger(80),
                easing: 'easeOutExpo',
                complete: () => {
                  // Iniciar animações em loop após aparecer
                  startLoopAnimations();
                }
              });
            }
          }
        });
      }, 1000);
      
      // Função para animações contínuas em loop
      function startLoopAnimations() {
        // Animação contínua do "Build" - efeito de respiração suave
        anime({
          targets: '#build-text .char',
          scale: [1, 1.05, 1],
          duration: 3000,
          delay: anime.stagger(100),
          easing: 'easeInOutSine',
          loop: true
        });

        // Animação contínua do "somETHing" - efeito de ondulação
        anime({
          targets: '#something-text .char',
          translateY: [0, -5, 0],
          duration: 2000,
          delay: anime.stagger(150, {start: 500}),
          easing: 'easeInOutSine',
          loop: true
        });

        // Efeito especial no "ETH" - pulsação com brilho
        anime({
          targets: '#something-text .char:nth-child(4), #something-text .char:nth-child(5), #something-text .char:nth-child(6)',
          scale: [1, 1.1, 1],
          textShadow: [
            '0 0 30px rgba(249, 115, 22, 0.3)',
            '0 0 40px rgba(249, 115, 22, 0.8)',
            '0 0 30px rgba(249, 115, 22, 0.3)'
          ],
          duration: 2500,
          easing: 'easeInOutSine',
          loop: true,
          delay: 1000
        });
      }
      
      // Paths para todas as abelhas
      const path1 = anime.path('#bee-path1');
      const path2 = anime.path('#bee-path2');
      const path3 = anime.path('#bee-path3');
      const path4 = anime.path('#bee-path4');
      const path5 = anime.path('#bee-path5');
      const path6 = anime.path('#bee-path6');
      const path7 = anime.path('#bee-path7');
      const path8 = anime.path('#bee-path8');

      // Timeline exata da pasta teste
      const timeline = anime.timeline({
        easing: 'easeInOutExpo',
        duration: 1000,
        complete: () => {
          // Pulsar buraco
          anime({
            targets: '.hole',
            scale: 1.1,
            duration: 1500,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
          });
          // Respirar camadas
          anime({
            targets: '.layer',
            scale: 1.02,
            duration: 3000,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutQuad'
          });
        }
      });

      // Camadas crescendo com stagger
      timeline.add({
        targets: '.layer',
        scale: [0, 1],
        delay: anime.stagger(200)
      });

      // Buraco aparecendo
      timeline.add({
        targets: '.hole',
        scale: [0, 1]
      }, '-=1000');

      // Abelhas aparecem
      timeline.add({
        targets: '.bee1, .bee2, .bee3, .bee4, .bee5, .bee6, .bee7, .bee8',
        opacity: [0, 1],
      }, '-=750');

      // Abelha 1 voando seguindo path1 - movimento complexo orgânico
      anime({
        targets: '.bee1',
        translateX: path1('x'),
        translateY: path1('y'),
        rotate: path1('angle'),
        loop: true,
        duration: 18000,
        easing: 'easeInOutSine'
      });

      // Abelha 2 voando para a esquerda seguindo path2
      anime({
        targets: '.bee2',
        translateX: path2('x'),
        translateY: path2('y'),
        rotate: path2('angle'),
        loop: true,
        duration: 18000,
        easing: 'easeInOutSine',
        delay: 1000
      });

      // Abelha 3 voando para a esquerda 
      anime({
        targets: '.bee3',
        translateX: path3('x'),
        translateY: path3('y'),
        rotate: path3('angle'),
        loop: true,
        duration: 15000,
        easing: 'linear',
        delay: 1500
      });

      // Abelha 4 voando para a direita
      anime({
        targets: '.bee4',
        translateX: path4('x'),
        translateY: path4('y'),
        rotate: path4('angle'),
        loop: true,
        duration: 15000,
        easing: 'linear',
        delay: 2000
      });

      // Abelha 5 voando para a esquerda
      anime({
        targets: '.bee5',
        translateX: path5('x'),
        translateY: path5('y'),
        rotate: path5('angle'),
        loop: true,
        duration: 20000,
        easing: 'linear',
        delay: 2500
      });

      // Abelha 6 voando para a direita
      anime({
        targets: '.bee6',
        translateX: path6('x'),
        translateY: path6('y'),
        rotate: path6('angle'),
        loop: true,
        duration: 20000,
        easing: 'linear',
        delay: 3000
      });

      // Abelha 7 voando para a esquerda
      anime({
        targets: '.bee7',
        translateX: path7('x'),
        translateY: path7('y'),
        rotate: path7('angle'),
        loop: true,
        duration: 25000,
        easing: 'linear',
        delay: 3500
      });

      // Abelha 8 voando para a direita
      anime({
        targets: '.bee8',
        translateX: path8('x'),
        translateY: path8('y'),
        rotate: path8('angle'),
        loop: true,
        duration: 25000,
        easing: 'linear',
        delay: 4000
      });
    }

  }, [isVisible]);


  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative flex items-center justify-center"
      style={{ overflowX: 'hidden', overflowY: 'visible' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f59e0b 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #f59e0b 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Partículas flutuantes de fundo - atrás do conteúdo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-200/30 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      {/* Container principal */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full">
        
        {/* Texto principal animado */}
        <div className="text-center mb-20" style={{ overflow: 'visible', paddingBottom: '60px' }}>
          <h1 
            id="build-text"
            className="text-7xl md:text-9xl font-black mb-4 tracking-tight opacity-0"
            style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706, #92400e)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 30px rgba(245, 158, 11, 0.3)'
            }}
          >
            Build
          </h1>
          <h2 
            id="something-text"
            className="text-6xl md:text-8xl font-black opacity-0"
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8, #1e40af)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
              paddingBottom: '60px',
              lineHeight: '1.3',
              overflow: 'visible',
              marginBottom: '20px'
            }}
          >
            <span>som</span><span className="text-orange-500">ETH</span><span>ing</span>
          </h2>
        </div>

        {/* Estrutura exata do exemplo da pasta teste */}
        <div className="relative mb-12 flex items-center justify-center">
          {/* SVG principal com colmeia */}
          <div className="relative">
            <svg viewBox="0 0 512 512" width="400" height="400">
              {/* Colmeia com paths orgânicos */}
              <g stroke="#5A3B00" strokeWidth="6" strokeLinejoin="round">
                <path className="layer" d="M120 370 Q80 370 80 330 Q80 280 160 260 Q256 240 352 260 Q432 280 432 330 Q432 370 392 370 Z" fill="#F4B42A" transform="scale(0)" style={{ transformOrigin: 'center' }} />
                <path className="layer" d="M140 300 Q100 300 100 260 Q100 210 180 190 Q256 175 332 190 Q412 210 412 260 Q412 300 372 300 Z" fill="#F4B42A" transform="scale(0)" style={{ transformOrigin: 'center' }} />
                <path className="layer" d="M160 230 Q120 230 120 200 Q120 160 190 145 Q256 130 322 145 Q392 160 392 200 Q392 230 352 230 Z" fill="#F4B42A" transform="scale(0)" style={{ transformOrigin: 'center' }} />
                <path className="layer" d="M180 170 Q150 170 150 150 Q150 120 200 110 Q256 100 312 110 Q362 120 362 150 Q362 170 332 170 Z" fill="#F4B42A" transform="scale(0)" style={{ transformOrigin: 'center' }} />
                <ellipse className="hole" cx="256" cy="260" rx="38" ry="28" fill="#3B2A00" stroke="none" transform="scale(0)" style={{ transformOrigin: 'center' }}/>
              </g>

              {/* Caminho da abelha 1 - trajeto complexo em forma de flor */}
              <path id="bee-path1" d="M 256 180 C 320 160, 380 200, 400 250 C 420 300, 380 350, 320 380 C 280 400, 240 390, 200 370 C 150 340, 120 300, 110 250 C 100 200, 130 160, 180 140 C 220 120, 240 140, 256 180 C 290 200, 340 220, 380 260 C 390 300, 360 340, 320 350 C 280 360, 240 340, 220 300 C 200 260, 220 220, 256 200 C 290 180, 320 200, 340 240 C 350 280, 330 320, 300 330 C 270 340, 240 320, 230 280 C 220 240, 240 200, 256 180" fill="none" stroke="transparent"/>
              
              {/* Caminho da abelha 2 - trajeto espelhado para a esquerda */}
              <path id="bee-path2" d="M 256 180 C 192 160, 132 200, 112 250 C 92 300, 132 350, 192 380 C 232 400, 272 390, 312 370 C 362 340, 392 300, 402 250 C 412 200, 382 160, 332 140 C 292 120, 272 140, 256 180 C 222 200, 172 220, 132 260 C 122 300, 152 340, 192 350 C 232 360, 272 340, 292 300 C 312 260, 292 220, 256 200 C 222 180, 192 200, 172 240 C 162 280, 182 320, 212 330 C 242 340, 272 320, 282 280 C 292 240, 272 200, 256 180" fill="none" stroke="transparent"/>
              
              {/* Caminho da abelha 3 - trajeto simples para a esquerda */}
              <path id="bee-path3" d="M 256 180 C 180 160, 120 200, 100 260 C 80 320, 120 380, 180 400 C 240 420, 300 400, 340 360 C 380 320, 400 260, 380 200 C 360 140, 320 120, 280 140 C 240 160, 220 180, 256 180" fill="none" stroke="transparent"/>
              
              {/* Caminho da abelha 4 - trajeto simples para a direita */}
              <path id="bee-path4" d="M 256 180 C 332 160, 392 200, 412 260 C 432 320, 392 380, 332 400 C 272 420, 212 400, 172 360 C 132 320, 112 260, 132 200 C 152 140, 192 120, 232 140 C 272 160, 292 180, 256 180" fill="none" stroke="transparent"/>
              
              {/* Caminho da abelha 5 - trajeto circular para a esquerda */}
              <path id="bee-path5" d="M 256 180 C 160 140, 100 180, 80 250 C 60 320, 100 390, 160 430 C 220 470, 290 450, 350 410 C 410 370, 440 300, 420 230 C 400 160, 350 120, 300 140 C 250 160, 230 180, 256 180" fill="none" stroke="transparent"/>
              
              {/* Caminho da abelha 6 - trajeto circular para a direita */}
              <path id="bee-path6" d="M 256 180 C 352 140, 412 180, 432 250 C 452 320, 412 390, 352 430 C 292 470, 222 450, 162 410 C 102 370, 72 300, 92 230 C 112 160, 162 120, 212 140 C 262 160, 282 180, 256 180" fill="none" stroke="transparent"/>
              
              {/* Caminho da abelha 7 - trajeto oval para a esquerda */}
              <path id="bee-path7" d="M 256 200 C 150 160, 80 200, 60 270 C 40 340, 80 410, 150 450 C 220 490, 300 470, 370 430 C 440 390, 480 320, 460 250 C 440 180, 390 140, 330 160 C 270 180, 240 200, 256 200" fill="none" stroke="transparent"/>
              
              {/* Caminho da abelha 8 - trajeto oval para a direita */}
              <path id="bee-path8" d="M 256 200 C 362 160, 432 200, 452 270 C 472 340, 432 410, 362 450 C 292 490, 212 470, 142 430 C 72 390, 32 320, 52 250 C 72 180, 122 140, 182 160 C 242 180, 272 200, 256 200" fill="none" stroke="transparent"/>
            </svg>
          </div>

          {/* Abelha - canto superior esquerdo da colmeia */}
          <div className="bee1 absolute" style={{ 
            width: '50px', 
            height: 'auto', 
            opacity: 0,
            left: '-20px',
            top: '40px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '50px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="4" strokeWidth="2.5" />
                  <g fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -4)" d="M 0 0 v -3" />
                    <path transform="rotate(-45) translate(0 -4)" d="M 0 0 v -3" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 7 a 3 3 0 0 1 0 6 q -4 0 -7 -6" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 7 a 3 3 0 0 1 0 6 q -4 0 -7 -6" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 2 6 8 10 0 12 -8 -2 -2 -6 0 -12" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelha 2 - igual à abelha 1 mas com trajeto para esquerda */}
          <div className="bee2 absolute" style={{ 
            width: '50px', 
            height: 'auto', 
            opacity: 0,
            left: '-20px',
            top: '40px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '50px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="4" strokeWidth="2.5" />
                  <g fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -4)" d="M 0 0 v -3" />
                    <path transform="rotate(-45) translate(0 -4)" d="M 0 0 v -3" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 7 a 3 3 0 0 1 0 6 q -4 0 -7 -6" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 7 a 3 3 0 0 1 0 6 q -4 0 -7 -6" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 2 6 8 10 0 12 -8 -2 -2 -6 0 -12" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelha 3 - trajeto mais amplo para a esquerda */}
          <div className="bee3 absolute" style={{ 
            width: '45px', 
            height: 'auto', 
            opacity: 0,
            left: '-25px',
            top: '30px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '45px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="3.5" strokeWidth="2" />
                  <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -3.5)" d="M 0 0 v -2.5" />
                    <path transform="rotate(-45) translate(0 -3.5)" d="M 0 0 v -2.5" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 6 a 2.5 2.5 0 0 1 0 5 q -3 0 -6 -5" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 6 a 2.5 2.5 0 0 1 0 5 q -3 0 -6 -5" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 1.5 5 7 9 0 11 -7 -1.5 -1.5 -5 0 -11" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelha 4 - trajeto mais amplo para a direita */}
          <div className="bee4 absolute" style={{ 
            width: '45px', 
            height: 'auto', 
            opacity: 0,
            left: '-25px',
            top: '30px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '45px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="3.5" strokeWidth="2" />
                  <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -3.5)" d="M 0 0 v -2.5" />
                    <path transform="rotate(-45) translate(0 -3.5)" d="M 0 0 v -2.5" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 6 a 2.5 2.5 0 0 1 0 5 q -3 0 -6 -5" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 6 a 2.5 2.5 0 0 1 0 5 q -3 0 -6 -5" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 1.5 5 7 9 0 11 -7 -1.5 -1.5 -5 0 -11" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelha 5 - trajeto muito amplo para a esquerda */}
          <div className="bee5 absolute" style={{ 
            width: '40px', 
            height: 'auto', 
            opacity: 0,
            left: '-30px',
            top: '20px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '40px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="3" strokeWidth="1.8" />
                  <g fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -3)" d="M 0 0 v -2" />
                    <path transform="rotate(-45) translate(0 -3)" d="M 0 0 v -2" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 5 a 2 2 0 0 1 0 4 q -2.5 0 -5 -4" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 5 a 2 2 0 0 1 0 4 q -2.5 0 -5 -4" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 1.2 4 5.5 8 0 9.5 -5.5 -1.2 -1.2 -4 0 -9.5" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelha 6 - trajeto muito amplo para a direita */}
          <div className="bee6 absolute" style={{ 
            width: '40px', 
            height: 'auto', 
            opacity: 0,
            left: '-30px',
            top: '20px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '40px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="3" strokeWidth="1.8" />
                  <g fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -3)" d="M 0 0 v -2" />
                    <path transform="rotate(-45) translate(0 -3)" d="M 0 0 v -2" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 5 a 2 2 0 0 1 0 4 q -2.5 0 -5 -4" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 5 a 2 2 0 0 1 0 4 q -2.5 0 -5 -4" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 1.2 4 5.5 8 0 9.5 -5.5 -1.2 -1.2 -4 0 -9.5" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelha 7 - trajeto extremamente amplo para a esquerda */}
          <div className="bee7 absolute" style={{ 
            width: '35px', 
            height: 'auto', 
            opacity: 0,
            left: '-35px',
            top: '10px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '35px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="2.5" strokeWidth="1.5" />
                  <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -2.5)" d="M 0 0 v -1.5" />
                    <path transform="rotate(-45) translate(0 -2.5)" d="M 0 0 v -1.5" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 4 a 1.5 1.5 0 0 1 0 3 q -2 0 -4 -3" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 4 a 1.5 1.5 0 0 1 0 3 q -2 0 -4 -3" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 1 3 4.5 6.5 0 8 -4.5 -1 -1 -3 0 -8" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelha 8 - trajeto extremamente amplo para a direita */}
          <div className="bee8 absolute" style={{ 
            width: '35px', 
            height: 'auto', 
            opacity: 0,
            left: '-35px',
            top: '10px'
          }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '35px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="2.5" strokeWidth="1.5" />
                  <g fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -2.5)" d="M 0 0 v -1.5" />
                    <path transform="rotate(-45) translate(0 -2.5)" d="M 0 0 v -1.5" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 4 a 1.5 1.5 0 0 1 0 3 q -2 0 -4 -3" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 4 a 1.5 1.5 0 0 1 0 3 q -2 0 -4 -3" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 1 3 4.5 6.5 0 8 -4.5 -1 -1 -3 0 -8" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>

          {/* Abelhas randômicas nas bordas da página */}
          <div className="bee-random-1 absolute" style={{ width: '35px', height: 'auto', opacity: 0 }}>
            <svg viewBox="-10.5 -10.5 21 21" style={{ width: '35px', height: 'auto' }}>
              <g transform="rotate(90) translate(0 -4)">
                <g stroke="hsl(0, 0%, 10%)" fill="hsl(0, 0%, 10%)">
                  <circle fill="hsl(0, 0%, 10%)" r="3" strokeWidth="2" />
                  <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path transform="rotate(45) translate(0 -3)" d="M 0 0 v -2" />
                    <path transform="rotate(-45) translate(0 -3)" d="M 0 0 v -2" />
                    <g fill="hsl(200, 80%, 90%)">
                      <path transform="rotate(15)" d="M 0 0 h 5 a 2 2 0 0 1 0 4 q -3 0 -5 -4" />
                      <path transform="scale(-1 1) rotate(15)" d="M 0 0 h 5 a 2 2 0 0 1 0 4 q -3 0 -5 -4" />
                    </g>
                    <g fill="hsl(50, 80%, 50%)">
                      <path d="M 0 0 c 1.5 4 6 8 0 9 -6 -1.5 -1.5 -4 0 -9" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Texto de status */}
        <motion.p 
          className="mt-6 text-lg text-amber-600 font-medium text-center max-w-md"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Building something sweet for you... 🍯
        </motion.p>

        {/* Elementos decorativos */}
        <div className="absolute top-20 left-20">
          <motion.div
            className="w-6 h-6 bg-yellow-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        <div className="absolute bottom-32 right-20">
          <motion.div
            className="w-8 h-8 bg-amber-400 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="absolute top-1/3 right-32">
          <motion.div
            className="w-4 h-4 bg-orange-400 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Efeito de brilho no fundo */}
      <div className="absolute inset-0 bg-gradient-radial from-yellow-200/20 via-transparent to-transparent pointer-events-none" />
    </section>
  );
};

export default BuildSection;