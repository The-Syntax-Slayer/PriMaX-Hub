import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiDownload, FiCpu, FiTrendingUp, FiStar, FiCheckCircle } from 'react-icons/fi';

const steps = [
    {
        number: '01',
        icon: <FiDownload size={22} />,
        title: 'Set Your Vision',
        desc: 'Tell PriMaX about your biggest goals. Our AI conducts a deep dive assessment to map your current position and ideal destination.',
        color: '#7c3aed',
        extras: ['360° Life Audit', 'Strength Mapping', 'Blocker Identification'],
    },
    {
        number: '02',
        icon: <FiCpu size={22} />,
        title: 'AI Builds Your Blueprint',
        desc: 'Within seconds, your personalized growth OS is generated — adaptive plans, habit stacks, focus routines, and learning pathways.',
        color: '#00f5ff',
        extras: ['Custom Habit Stacks', 'Adaptive Schedules', 'Smart Milestones'],
    },
    {
        number: '03',
        icon: <FiTrendingUp size={22} />,
        title: 'Execute with AI Support',
        desc: 'Your AI coach guides each session, adjusting plans in real time based on your performance data, energy levels, and progress.',
        color: '#ec4899',
        extras: ['Real-Time Coaching', 'Dynamic Adjustment', 'Daily Breakthroughs'],
    },
    {
        number: '04',
        icon: <FiStar size={22} />,
        title: 'Evolve & Compound',
        desc: 'Watch your growth compound exponentially as PriMaX optimizes every aspect of your personal and professional life over time.',
        color: '#f59e0b',
        extras: ['Progress Analytics', 'Compound Growth', 'Milestone Celebrations'],
    },
];

export default function HowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="how" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-orb" style={{ width: 500, height: 500, background: '#ec4899', bottom: '-10%', right: '-10%', opacity: 0.07 }} />

            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 80 }}
                >
                    <span className="section-tag">🔄 The Process</span>
                    <h2 className="section-title">
                        How <span className="gradient-text">PriMaX Works</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Four powerful phases that transform who you are today into who you're meant to become.
                    </p>
                </motion.div>

                {/* Steps */}
                <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 48, position: 'relative' }}>
                    {/* Vertical connector line */}
                    <div style={{
                        position: 'absolute',
                        left: 28,
                        top: 60,
                        bottom: 60,
                        width: 2,
                        background: 'linear-gradient(to bottom, #7c3aed, #00f5ff, #ec4899, #f59e0b)',
                        opacity: 0.3,
                    }} />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -40 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                display: 'flex',
                                gap: 32,
                                alignItems: 'flex-start',
                            }}
                        >
                            {/* Number bubble */}
                            <div style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: '50%',
                                    background: `${step.color}20`,
                                    border: `2px solid ${step.color}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: step.color,
                                    boxShadow: `0 0 20px ${step.color}40`,
                                }}>
                                    {step.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <motion.div
                                whileHover={{ x: 6 }}
                                style={{
                                    flex: 1,
                                    padding: '28px 32px',
                                    borderRadius: 16,
                                    background: 'rgba(12,12,40,0.5)',
                                    backdropFilter: 'blur(16px)',
                                    border: `1px solid ${step.color}25`,
                                    transition: 'border-color 0.3s',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 12, color: step.color, fontWeight: 700, letterSpacing: '0.1em' }}>
                                        STEP {step.number}
                                    </span>
                                    <div style={{ flex: 1, height: 1, background: `${step.color}30` }} />
                                </div>
                                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: '#f0f0ff' }}>{step.title}</h3>
                                <p style={{ color: '#9898c0', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>{step.desc}</p>

                                {/* Tags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                    {step.extras.map((e, j) => (
                                        <span key={j} style={{
                                            display: 'inline-flex', alignItems: 'center', gap: 6,
                                            padding: '5px 12px',
                                            borderRadius: 100,
                                            background: `${step.color}10`,
                                            border: `1px solid ${step.color}30`,
                                            fontSize: 12, fontWeight: 600,
                                            color: step.color,
                                        }}>
                                            <FiCheckCircle size={11} /> {e}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
