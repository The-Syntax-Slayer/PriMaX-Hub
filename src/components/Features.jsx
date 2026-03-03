import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiTrendingUp, FiTarget, FiStar, FiZap, FiLayers, FiShield } from 'react-icons/fi';

const features = [
    {
        icon: <FiZap size={24} />,
        color: '#00f5ff',
        title: 'AI Goal Architect',
        desc: 'Our AI analyzes your ambitions and reverse-engineers a precise action plan with milestones, timelines, and adaptive recalibration.',
    },
    {
        icon: <FiTrendingUp size={24} />,
        color: '#7c3aed',
        title: 'Neural Habit Engine',
        desc: 'Habit stacking powered by behavioral AI that learns your psychology and optimizes routine building for 10x faster results.',
    },
    {
        icon: <FiTarget size={24} />,
        color: '#ec4899',
        title: 'Precision Focus Mode',
        desc: 'Deep work sessions guided by biometric-inspired AI that adapts to your peak productivity windows in real time.',
    },
    {
        icon: <FiStar size={24} />,
        color: '#f59e0b',
        title: 'Growth Analytics',
        desc: 'Advanced dashboards that visualize your progress across all life dimensions — career, health, relationships, and mindset.',
    },
    {
        icon: <FiLayers size={24} />,
        color: '#10b981',
        title: 'Life OS Framework',
        desc: 'An all-in-one second brain system with smart note-taking, knowledge graphs, and AI-powered synthesis.',
    },
    {
        icon: <FiShield size={24} />,
        color: '#f97316',
        title: 'Resilience Trainer',
        desc: 'Mental toughness modules backed by cognitive science to help you break through plateaus and build unstoppable mindsets.',
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Features() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="features" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative orbs */}
            <div className="glow-orb" style={{ width: 400, height: 400, background: '#7c3aed', top: '-5%', right: '-5%', opacity: 0.1 }} />
            <div className="glow-orb" style={{ width: 300, height: 300, background: '#00f5ff', bottom: '5%', left: '-5%', opacity: 0.08 }} />

            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 72 }}
                >
                    <span className="section-tag">⚡ Core Features</span>
                    <h2 className="section-title">
                        Everything You Need to{' '}
                        <span className="gradient-text">Level Up</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        PriMaX Hub combines AI intelligence with proven growth frameworks into one seamless, beautiful platform.
                    </p>
                </motion.div>

                {/* Grid */}
                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="feature-grid"
                >
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            whileHover={{ scale: 1.02, y: -6 }}
                            className="glass-card feature-card"
                            style={{ cursor: 'default' }}
                        >
                            {/* Icon */}
                            <div
                                style={{
                                    width: 52, height: 52,
                                    borderRadius: 14,
                                    background: `${f.color}18`,
                                    border: `1px solid ${f.color}40`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: f.color,
                                    marginBottom: 20,
                                    boxShadow: `0 0 20px ${f.color}25`,
                                }}
                            >
                                {f.icon}
                            </div>

                            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: '#f0f0ff' }}>
                                {f.title}
                            </h3>
                            <p style={{ color: '#9898c0', fontSize: 14, lineHeight: 1.8 }}>{f.desc}</p>

                            {/* Bottom bar */}
                            <div
                                style={{
                                    marginTop: 24,
                                    height: 2,
                                    background: `linear-gradient(90deg, ${f.color}80, transparent)`,
                                    borderRadius: 1,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <style>{`
                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
                    gap: 24px;
                }
                .feature-card {
                    padding: 32px;
                }
                @media (max-width: 600px) {
                    .feature-grid {
                        grid-template-columns: 1fr !important;
                        gap: 16px;
                    }
                    .feature-card {
                        padding: 24px !important;
                    }
                }
            `}</style>
        </section>
    );
}
