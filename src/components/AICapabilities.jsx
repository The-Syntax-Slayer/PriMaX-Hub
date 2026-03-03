import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiActivity, FiCpu, FiEye, FiMessageCircle, FiAward, FiBarChart2 } from 'react-icons/fi';

const capabilities = [
    { icon: <FiActivity size={28} />, title: 'Cognitive Mapping', desc: 'Maps your unique mental models to architect personalized growth trajectories', color: '#7c3aed' },
    { icon: <FiCpu size={28} />, title: 'Behavior Prediction', desc: 'ML models trained on 100M+ data points predict habits before they form', color: '#00f5ff' },
    { icon: <FiEye size={28} />, title: 'Vision Board AI', desc: 'Transforms written goals into vivid visual roadmaps with spatial reasoning', color: '#ec4899' },
    { icon: <FiMessageCircle size={28} />, title: 'Coach AI', desc: '24/7 AI coach that asks the right questions to unlock your breakthrough moments', color: '#f59e0b' },
    { icon: <FiAward size={28} />, title: 'Achievement Engine', desc: 'Gamified milestones with dopamine-optimized reward loops for lasting motivation', color: '#10b981' },
    { icon: <FiBarChart2 size={28} />, title: 'Adaptive Analytics', desc: 'Self-evolving dashboards that surface your most critical insights automatically', color: '#f97316' },
];

const stats = [
    { value: '99.2%', label: 'AI Accuracy', sub: 'on goal predictions' },
    { value: '<50ms', label: 'Response Time', sub: 'real-time coaching' },
    { value: '200+', label: 'AI Models', sub: 'working in parallel' },
    { value: '10B+', label: 'Data Points', sub: 'processed monthly' },
];

export default function AICapabilities() {
    const [active, setActive] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="ai" className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>
            {/* Background glow */}
            <div className="glow-orb" style={{ width: 700, height: 700, background: '#7c3aed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06 }} />

            <div className="container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 72 }}
                >
                    <span className="section-tag">🤖 AI Engine</span>
                    <h2 className="section-title">
                        Intelligence That <span className="gradient-text">Thinks Ahead</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Built on a proprietary AI stack — our growth engine is smarter than any coach, therapist, or productivity system you've tried before.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 24,
                        marginBottom: 72,
                    }}
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.04 }}
                            style={{
                                textAlign: 'center',
                                padding: '28px 20px',
                                borderRadius: 16,
                                background: 'rgba(124,58,237,0.08)',
                                border: '1px solid rgba(124,58,237,0.2)',
                            }}
                        >
                            <div style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, fontFamily: 'Orbitron, monospace' }} className="gradient-text">
                                {s.value}
                            </div>
                            <div style={{ color: '#f0f0ff', fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                            <div style={{ color: '#5a5a80', fontSize: 13, marginTop: 2 }}>{s.sub}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Capabilities interactive grid */}
                <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
                    {capabilities.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            onHoverStart={() => setActive(i)}
                            whileHover={{ scale: 1.03 }}
                            style={{
                                padding: '28px 24px',
                                borderRadius: 16,
                                cursor: 'pointer',
                                border: `1px solid ${active === i ? c.color + '60' : 'rgba(0,245,255,0.1)'}`,
                                background: active === i ? `${c.color}10` : 'rgba(12,12,40,0.5)',
                                backdropFilter: 'blur(12px)',
                                transition: 'all 0.3s ease',
                                boxShadow: active === i ? `0 0 30px ${c.color}25` : 'none',
                            }}
                        >
                            <div style={{ color: c.color, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                    width: 50, height: 50, borderRadius: 12,
                                    background: `${c.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${c.color}30`,
                                }}>
                                    {c.icon}
                                </div>
                                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f0f0ff' }}>{c.title}</h3>
                            </div>
                            <p style={{ color: '#9898c0', fontSize: 14, lineHeight: 1.7 }}>{c.desc}</p>
                            <div style={{ height: 2, marginTop: 20, background: `linear-gradient(90deg, ${c.color}, transparent)`, opacity: active === i ? 1 : 0, transition: 'opacity 0.3s' }} />
                        </motion.div>
                    ))}
                </div>

                {/* Central AI Brain visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{
                        marginTop: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 20,
                    }}
                >
                    <div style={{ position: 'relative', width: 180, height: 180 }}>
                        {/* Rotating rings */}
                        {[140, 160, 180].map((size, i) => (
                            <motion.div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    width: size,
                                    height: size,
                                    marginTop: -size / 2,
                                    marginLeft: -size / 2,
                                    borderRadius: '50%',
                                    border: `1px solid rgba(${i === 0 ? '0,245,255' : i === 1 ? '124,58,237' : '236,72,153'},0.3)`,
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8 + i * 4, repeat: Infinity, ease: 'linear', direction: i % 2 === 0 ? 'normal' : 'reverse' }}
                            />
                        ))}
                        {/* Core */}
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #7c3aed, #00f5ff)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 40px rgba(124,58,237,0.6), 0 0 80px rgba(0,245,255,0.3)',
                        }}>
                            <FiActivity size={36} color="white" />
                        </div>
                    </div>
                    <p style={{ color: '#5a5a80', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        PriMaX Neural Core — Always Evolving
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
