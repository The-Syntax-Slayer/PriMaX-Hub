import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiActivity, FiSmartphone, FiRefreshCw, FiUsers } from 'react-icons/fi';


const overviewPoints = [
    {
        icon: <FiActivity size={20} />,
        color: '#7c3aed',
        title: 'Your Personal AI Engine',
        desc: 'Unlike generic productivity apps, PriMaX learns YOUR unique patterns, psychology, and goals — then builds a completely bespoke growth system around you.',
    },
    {
        icon: <FiSmartphone size={20} />,
        color: '#00f5ff',
        title: 'Omni-Platform Experience',
        desc: 'Access your growth engine from web, iOS, or Android. Your progress syncs instantly across all devices with real-time cloud intelligence.',
    },
    {
        icon: <FiRefreshCw size={20} />,
        color: '#ec4899',
        title: 'Always Evolving',
        desc: 'The more you use PriMaX, the smarter it gets. Our adaptive AI continuously refines your plans based on real performance data and changing life circumstances.',
    },
    {
        icon: <FiUsers size={20} />,
        color: '#f59e0b',
        title: 'Built for All Achievers',
        desc: 'Whether you\'re an entrepreneur, student, executive, or creative — PriMaX adapts to your unique season of life and growth objectives.',
    },
];

export default function ProductOverview() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="overview" className="section" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-orb" style={{ width: 500, height: 500, background: '#7c3aed', top: '20%', right: '-10%', opacity: 0.08 }} />

            <div className="container">
                <div className="overview-grid">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="section-tag">🚀 Product Overview</span>
                        <h2 className="section-title">
                            Not a Productivity App.{' '}
                            <span className="gradient-text">A Growth Operating System.</span>
                        </h2>
                        <p style={{ color: '#9898c0', fontSize: 16, lineHeight: 1.9, marginBottom: 36 }}>
                            PriMaX Hub is the world's first AI-native platform that doesn't just organize your tasks — it actively architects your transformation. Think of it as having a world-class coach, strategist, and analyst working for you 24/7.
                        </p>

                        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {overviewPoints.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.12 }}
                                    style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}
                                >
                                    <div style={{
                                        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                                        background: `${p.color}18`, border: `1px solid ${p.color}35`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: p.color,
                                    }}>
                                        {p.icon}
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#f0f0ff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.title}</h4>
                                        <p style={{ color: '#9898c0', fontSize: 13, lineHeight: 1.7 }}>{p.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <div className="overview-visual">
                            {/* Main card */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    borderRadius: 24,
                                    background: 'rgba(12,12,40,0.8)',
                                    backdropFilter: 'blur(20px)',
                                    border: '1px solid rgba(0,245,255,0.15)',
                                    padding: 28,
                                    boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 60px rgba(124,58,237,0.15)',
                                }}
                            >
                                <div style={{ marginBottom: 24 }}>
                                    <div style={{ color: '#9898c0', fontSize: 12, marginBottom: 4 }}>Your Growth Score</div>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                        <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 48, fontWeight: 900 }} className="gradient-text">847</span>
                                        <span style={{ color: '#10b981', fontSize: 14, fontWeight: 600 }}>▲ +24 pts</span>
                                    </div>
                                </div>

                                {/* Radar / Arc display */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                                    {[
                                        { dim: 'Mind', pct: 92, color: '#7c3aed' },
                                        { dim: 'Body', pct: 78, color: '#10b981' },
                                        { dim: 'Career', pct: 85, color: '#00f5ff' },
                                        { dim: 'Wealth', pct: 71, color: '#f59e0b' },
                                        { dim: 'Social', pct: 80, color: '#ec4899' },
                                        { dim: 'Spirit', pct: 88, color: '#f97316' },
                                    ].map((d, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                <span style={{ color: '#9898c0', fontSize: 11 }}>{d.dim}</span>
                                                <span style={{ color: d.color, fontSize: 11, fontWeight: 700 }}>{d.pct}%</span>
                                            </div>
                                            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${d.pct}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1.2, delay: 0.3 + i * 0.08 }}
                                                    style={{ height: '100%', borderRadius: 2, background: d.color }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '14px', borderRadius: 12, background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.15)' }}>
                                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                        <div style={{ fontSize: 24 }}>🤖</div>
                                        <div>
                                            <div style={{ color: '#00f5ff', fontSize: 12, fontWeight: 600 }}>AI Insight</div>
                                            <div style={{ color: '#9898c0', fontSize: 12, lineHeight: 1.5 }}>Your wealth dimension has the highest growth potential this month.</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating accent card */}
                            <motion.div
                                className="overview-float"
                                animate={{ y: [0, 8, 0], rotate: [0, 1, 0] }}
                                transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
                                style={{
                                    position: 'absolute',
                                    right: -50,
                                    bottom: 40,
                                    padding: '12px 16px',
                                    borderRadius: 14,
                                    background: 'rgba(124,58,237,0.9)',
                                    backdropFilter: 'blur(10px)',
                                    boxShadow: '0 8px 30px rgba(124,58,237,0.5)',
                                    fontSize: 13,
                                    color: 'white',
                                    fontWeight: 600,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                🎯 Goal completed! +50 XP
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                    .overview-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(440px, 1fr));
                        gap: 72px;
                        align-items: center;
                    }
                    .overview-visual {
                        position: relative;
                        width: 340px;
                        max-width: 100%;
                        height: 420px;
                    }
                    @media (max-width: 768px) {
                        .overview-grid {
                            grid-template-columns: 1fr;
                            gap: 40px;
                        }
                        .overview-visual {
                            width: 100%;
                            height: 420px;
                        }
                        .overview-float {
                            right: 0 !important;
                            right: 18px !important;
                            bottom: -20px !important;
                        }
                    }
                `}</style>
        </section>
    );
}
