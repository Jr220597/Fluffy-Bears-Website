const path = anime.path('#path');

const timeline = anime.timeline({
  easing: 'easeInOutExpo',
  duration: 1000,
  complete: () => {
    // Pulsar buraco
    anime({
      targets: '#hole',
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

timeline.add({
  targets: '.layer',
  scale: [0, 1],
  delay: anime.stagger(200)
});

timeline.add({
  targets: '#hole',
  scale: [0, 1]
}, '-=1000');

timeline.add({
  targets: '#bee',
  opacity: [0, 1],
}, '-=750');

anime({
  targets: '#bee',
  translateX: path('x'),
  translateY: path('y'),
  rotate: path('angle'),
  loop: true,
  duration: 12500,
  easing: 'linear'
});
