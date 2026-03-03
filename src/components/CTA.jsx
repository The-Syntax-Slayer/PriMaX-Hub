import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';

const metrics = [
    { value: '10x', label: 'Faster Goal Achievement' },
    { value: '86%', label: 'Users Hit Goals Within 90 Days' },
    { value: '50K+', label: 'Growth Pioneers Globally' },
    { value: '$0', label: 'To Start — No Credit Card' },
];

export default function CTA() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="cta" className="section" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
            {/* Glowing background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15) 0%, rgba(0,245,255,0.05) 50%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

            {/* Floating particles */}
            {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: i % 3 === 0 ? 6 : 3,
                        height: i % 3 === 0 ? 6 : 3,
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#7c3aed' : '#00f5ff',
                        left: `${(i * 8.3) + 2}%`,
                        top: `${20 + (i % 5) * 15}%`,
                    }}
                    animate={{
                        y: [-10, 10, -10],
                        opacity: [0.4, 0.9, 0.4],
                    }}
                    transition={{
                        duration: 3 + i * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.3,
                    }}
                />
            ))}

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Metrics row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, marginBottom: 80 }}>
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{ textAlign: 'center' }}
                        >
                            <div style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, fontFamily: 'Orbitron, monospace' }} className="gradient-text">
                                {m.value}
                            </div>
                            <div style={{ color: '#9898c0', fontSize: 13, marginTop: 4 }}>{m.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Main CTA box */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        textAlign: 'center',
                        padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6vw, 80px)',
                        borderRadius: 28,
                        background: 'rgba(12,12,40,0.7)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(124,58,237,0.3)',
                        boxShadow: '0 0 80px rgba(124,58,237,0.12), 0 0 120px rgba(0,245,255,0.06)',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Corner accents */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: 100, height: 100, background: 'linear-gradient(135deg, rgba(124,58,237,0.3), transparent)', borderRadius: '0 0 100% 0' }} />
                    <div style={{ position: 'absolute', bottom: 0, right: 0, width: 100, height: 100, background: 'linear-gradient(315deg, rgba(0,245,255,0.15), transparent)', borderRadius: '100% 0 0 0' }} />

                    <motion.span
                        className="section-tag"
                        animate={{ boxShadow: ['0 0 10px rgba(124,58,237,0.3)', '0 0 25px rgba(0,245,255,0.4)', '0 0 10px rgba(124,58,237,0.3)'] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ marginBottom: 28 }}
                    >
                        <FiZap size={12} /> Limited Early Access — Only 500 Spots Left
                    </motion.span>

                    <h2 style={{ fontSize: 'clamp(28px, 5vw, 56px)', fontWeight: 900, marginBottom: 20, lineHeight: 1.15 }}>
                        Your Best Self Is{' '}
                        <span className="gradient-text">Waiting.</span>
                        <br />
                        What Are You Waiting For?
                    </h2>

                    <p style={{ color: '#9898c0', fontSize: 'clamp(15px, 2vw, 18px)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.8 }}>
                        Join 50,000+ growth pioneers using PriMaX Hub to achieve their goals 10x faster — powered by AI that never sleeps.
                    </p>

                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.a
                            href="/signup"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ fontSize: 17, padding: '18px 44px' }}
                        >
                            Start Growing Free <FiArrowRight />
                        </motion.a>
                        <motion.a
                            href="#features"
                            className="btn btn-outline"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ fontSize: 17, padding: '18px 44px' }}
                        >
                            Explore Features
                        </motion.a>
                    </div>

                    <p style={{ marginTop: 24, color: '#5a5a80', fontSize: 13 }}>
                        ✓ Free forever plan &nbsp;·&nbsp; ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
