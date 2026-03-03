import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: 'attract' },
                        onClick: { enable: true, mode: 'push' },
                    },
                    modes: {
                        attract: { distance: 200, duration: 0.4, speed: 3 },
                        push: { quantity: 3 },
                    },
                },
                particles: {
                    color: { value: ['#00f5ff', '#7c3aed', '#ec4899'] },
                    links: {
                        color: '#7c3aed',
                        distance: 120,
                        enable: true,
                        opacity: 0.2,
                        width: 0.8,
                    },
                    move: {
                        enable: true,
                        speed: 0.8,
                        direction: 'none',
                        random: true,
                        outModes: 'bounce',
                    },
                    number: { value: 80, density: { enable: true, area: 900 } },
                    opacity: {
                        value: { min: 0.2, max: 0.6 },
                        animation: { enable: true, speed: 1, minimumValue: 0.1 },
                    },
                    shape: { type: ['circle', 'triangle'] },
                    size: {
                        value: { min: 1, max: 3 },
                        animation: { enable: true, speed: 2, minimumValue: 0.5 },
                    },
                },
                detectRetina: true,
                background: { color: 'transparent' },
            }}
        />
    );
}
