'use client';

import { useCallback } from 'react';

import { useTheme } from 'next-themes';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';

export function AiParticlesBackground() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          color: {
            value: isDark ? '#7E7E7E' : '#D8D8D9',
          },
          collisions: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
          },
          number: {
            density: {
              enable: true,
              area: 4000,
            },
            value: 100,
          },
          opacity: {
            value: isDark ? 0.5 : 0.7,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.2,
              sync: false,
            },
          },
          shape: {
            type: ['image'],
            image: [
              {
                src: '/logo.svg',
                width: 40,
                height: 40,
              },
            ],
          },
          size: {
            value: { min: 8, max: 68 },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onHover: {
              enable: true,
              mode: ['grab', 'bubble'],
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.6,
              },
            },
            bubble: {
              distance: 250,
              size: 6,
              duration: 0.5,
              opacity: 0.9,
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
        background: {
          color: 'transparent',
        },
      }}
      className="absolute inset-0 h-full w-full"
    />
  );
}
