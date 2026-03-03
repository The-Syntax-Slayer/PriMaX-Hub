import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const plans = [
    {
        name: 'Starter',
        price: '$0',
        period: 'forever',
        desc: 'Begin your growth journey with essential AI tools.',
        color: '#5a5a80',
        features: ['AI Goal Setting', '3 Active Goals', 'Basic Analytics', 'Daily Coach Check-ins', 'Community Access'],
        cta: 'Start Free',
        variant: 'outline',
    },
    {
        name: 'Pro',
        price: '$29',
        period: '/ month',
        desc: 'The full PriMaX experience for serious growth.',
        color: '#7c3aed',
        tag: 'Most Popular',
        features: ['Everything in Starter', 'Unlimited Goals', 'Advanced AI Coach', 'Full Analytics Suite', 'Habit Engine AI', 'Vision Board AI', 'Priority Support'],
        cta: 'Start 14-Day Trial',
        variant: 'primary',
        highlight: true,
    },
    {
        name: 'Elite',
        price: '$79',
        period: '/ month',
        desc: 'For peak performers and high achievers.',
        color: '#00f5ff',
        features: ['Everything in Pro', 'Live 1:1 AI Sessions', 'Custom AI Models', 'Team Collaboration', 'API Access', 'White-label Reports', 'Dedicated Coach'],
        cta: 'Contact Sales',
        variant: 'outline',
    },
];

const testimonials = [
    {
        avatar: '🧑‍💼',
        name: 'Marcus Chen',
        role: 'Startup Founder',
        text: 'PriMaX completely transformed how I run my day. Revenue doubled in 6 months — not a coincidence.',
        gradient: 'linear-gradient(135deg, #7c3aed, #00f5ff)',
        rating: 5,
    },
    {
        avatar: '👩‍🎨',
        name: 'Sofia Ramirez',
        role: 'Creative Director',
        text: 'The AI Coach actually understands me better than most humans. My creative output has tripled.',
        gradient: 'linear-gradient(135deg, #ec4899, #7c3aed)',
        rating: 5,
    },
    {
        avatar: '🧑‍⚕️',
        name: 'Dr. James Okoye',
        role: 'Physician & Author',
        text: 'I wrote my first book while managing 200+ patients. PriMaX made that possible through insane focus optimization.',
        gradient: 'linear-gradient(135deg, #00f5ff, #10b981)',
        rating: 5,
    },
];

export default function Benefits() {
    return (
        <section id="benefits" className="section" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-orb" style={{ width: 400, height: 400, background: '#7c3aed', top: '-5%', left: '25%', opacity: 0.1 }} />

            <div className="container">
                {/* Testimonials */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: 56 }}
                >
                    <span className="section-tag">💬 Success Stories</span>
                    <h2 className="section-title">Real People, <span className="gradient-text">Real Growth</span></h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 100 }}>
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12, duration: 0.6 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            className="glass-card"
                            style={{ padding: 28 }}
                        >
                            <div style={{ display: 'flex', gap: 4, marginBottom: 16, color: '#f59e0b' }}>
                                {Array.from({ length: t.rating }).map((_, j) => <span key={j}>★</span>)}
                            </div>
                            <p style={{ color: '#c0c0e0', fontSize: 15, lineHeight: 1.8, marginBottom: 20, fontStyle: 'italic' }}>
                                "{t.text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ width: 42, height: 42, borderRadius: '50%', background: t.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div style={{ color: '#f0f0ff', fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                                    <div style={{ color: '#5a5a80', fontSize: 12 }}>{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pricing */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: 56 }}
                >
                    <span className="section-tag">💎 Pricing</span>
                    <h2 className="section-title">Invest in <span className="gradient-text">Your Future Self</span></h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        Start free. Scale as you grow. Cancel anytime.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, alignItems: 'center' }}>
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            style={{
                                padding: 32,
                                borderRadius: 20,
                                background: plan.highlight ? 'rgba(124,58,237,0.12)' : 'rgba(12,12,40,0.5)',
                                border: plan.highlight ? '1px solid rgba(124,58,237,0.5)' : '1px solid rgba(0,245,255,0.1)',
                                backdropFilter: 'blur(16px)',
                                position: 'relative',
                                boxShadow: plan.highlight ? '0 0 40px rgba(124,58,237,0.2)' : 'none',
                                transform: plan.highlight ? 'scale(1.03)' : 'scale(1)',
                                transition: 'all 0.3s',
                            }}
                        >
                            {plan.tag && (
                                <div style={{
                                    position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                                    padding: '5px 18px', borderRadius: 100,
                                    background: 'linear-gradient(135deg, #7c3aed, #00f5ff)',
                                    fontSize: 12, fontWeight: 700, color: 'white', whiteSpace: 'nowrap',
                                }}>
                                    {plan.tag}
                                </div>
                            )}
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: plan.color, marginBottom: 8 }}>{plan.name}</h3>
                            <div style={{ marginBottom: 8 }}>
                                <span style={{ fontSize: 42, fontWeight: 900, color: '#f0f0ff', fontFamily: 'Orbitron, monospace' }}>{plan.price}</span>
                                <span style={{ color: '#9898c0', fontSize: 14 }}>{plan.period}</span>
                            </div>
                            <p style={{ color: '#9898c0', fontSize: 14, marginBottom: 24 }}>{plan.desc}</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                                {plan.features.map((f, j) => (
                                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                        <FiCheck size={14} style={{ color: plan.highlight ? '#7c3aed' : '#00f5ff', flexShrink: 0 }} />
                                        <span style={{ color: '#c0c0e0', fontSize: 14 }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <motion.a
                                href="/signup"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className={`btn btn-${plan.variant}`}
                                style={{ width: '100%', justifyContent: 'center' }}
                            >
                                {plan.cta}
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
