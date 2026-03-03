import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const screens = [
    {
        id: 1,
        label: 'Goal Dashboard',
        color: '#7c3aed',
        content: (
            <div style={{ padding: 24, fontFamily: 'Inter, sans-serif', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <div>
                        <div style={{ color: '#9898c0', fontSize: 12 }}>Good morning,</div>
                        <div style={{ color: '#f0f0ff', fontWeight: 700, fontSize: 18 }}>Alex Rivera 👋</div>
                    </div>
                    <div style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)', color: '#7c3aed', fontSize: 12, fontWeight: 600 }}>
                        🔥 Day 47 Streak
                    </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                    <div style={{ color: '#9898c0', fontSize: 12, marginBottom: 8 }}>Weekly Progress</div>
                    <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                        <motion.div animate={{ width: ['0%', '78%'] }} transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }} style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #00f5ff)', borderRadius: 4 }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                        <span style={{ color: '#5a5a80', fontSize: 11 }}>78% complete</span>
                        <span style={{ color: '#00f5ff', fontSize: 11, fontWeight: 700 }}>+12% vs last week</span>
                    </div>
                </div>
                {['Launch Startup', 'Read 12 Books / Year', 'Morning Workout Routine'].map((g, i) => (
                    <div key={i} style={{ marginBottom: 10, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#f0f0ff', fontSize: 13 }}>{g}</span>
                        <span style={{ color: ['#00f5ff', '#10b981', '#f59e0b'][i], fontSize: 12, fontWeight: 700 }}>{['78%', '58%', '95%'][i]}</span>
                    </div>
                ))}
            </div>
        ),
    },
    {
        id: 2,
        label: 'AI Coach',
        color: '#00f5ff',
        content: (
            <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: '#f0f0ff', fontWeight: 700, marginBottom: 16, fontSize: 15 }}>🤖 AI Coach Session</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { from: 'ai', text: 'You missed your morning routine 3 days this week. What\'s holding you back?' },
                        { from: 'user', text: 'Work demands have been way higher lately.' },
                        { from: 'ai', text: 'Got it. Let\'s create a micro-routine — just 10 minutes. Small wins compound. Want to design it together?' },
                    ].map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: m.from === 'ai' ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.4 }}
                            style={{
                                maxWidth: '80%',
                                alignSelf: m.from === 'ai' ? 'flex-start' : 'flex-end',
                                padding: '10px 14px',
                                borderRadius: m.from === 'ai' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                                background: m.from === 'ai' ? 'rgba(0,245,255,0.1)' : 'rgba(124,58,237,0.2)',
                                border: `1px solid ${m.from === 'ai' ? 'rgba(0,245,255,0.2)' : 'rgba(124,58,237,0.3)'}`,
                                fontSize: 13, lineHeight: 1.6,
                                color: '#f0f0ff',
                            }}
                        >
                            {m.text}
                        </motion.div>
                    ))}
                </div>
                <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                    <div style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#5a5a80', fontSize: 13 }}>
                        Reply to coach...
                    </div>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#7c3aed,#00f5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 16 }}>
                        ➤
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 3,
        label: 'Analytics',
        color: '#ec4899',
        content: (
            <div style={{ padding: 24 }}>
                <div style={{ color: '#f0f0ff', fontWeight: 700, marginBottom: 20, fontSize: 15 }}>📊 Growth Analytics</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                    {[
                        { label: 'Focus Hours', value: '6.2h', change: '+18%', color: '#7c3aed' },
                        { label: 'Tasks Done', value: '94', change: '+32%', color: '#00f5ff' },
                        { label: 'Habit Score', value: '91%', change: '+7%', color: '#10b981' },
                        { label: 'Sleep Score', value: '87', change: '+12%', color: '#f59e0b' },
                    ].map((m, i) => (
                        <div key={i} style={{ padding: '14px', borderRadius: 12, background: `${m.color}10`, border: `1px solid ${m.color}25` }}>
                            <div style={{ color: '#9898c0', fontSize: 11, marginBottom: 4 }}>{m.label}</div>
                            <div style={{ color: '#f0f0ff', fontWeight: 800, fontSize: 20 }}>{m.value}</div>
                            <div style={{ color: m.color, fontSize: 11, fontWeight: 600 }}>{m.change} this week</div>
                        </div>
                    ))}
                </div>
                <div style={{ color: '#9898c0', fontSize: 12, marginBottom: 8 }}>7-Day Focus Trend</div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 60 }}>
                    {[40, 65, 55, 80, 60, 90, 75].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                            style={{ flex: 1, borderRadius: 4, background: i === 5 ? 'linear-gradient(to top, #7c3aed, #00f5ff)' : 'rgba(124,58,237,0.3)' }}
                        />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} style={{ color: '#5a5a80', fontSize: 10 }}>{d}</span>)}
                </div>
            </div>
        ),
    },
];

export default function Preview() {
    const [activeTab, setActiveTab] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="preview" className="section" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
            <div className="glow-orb" style={{ width: 600, height: 600, background: '#00f5ff', top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.05 }} />

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    style={{ textAlign: 'center', marginBottom: 56 }}
                >
                    <span className="section-tag">👀 App Preview</span>
                    <h2 className="section-title">
                        See PriMaX <span className="gradient-text">In Action</span>
                    </h2>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        A glimpse into the beautiful, AI-powered interface you'll use every day.
                    </p>
                </motion.div>

                {/* Tab buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 48, flexWrap: 'wrap' }}>
                    {screens.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(i)}
                            style={{
                                padding: '10px 24px',
                                borderRadius: 100,
                                border: `1px solid ${activeTab === i ? s.color : 'rgba(255,255,255,0.1)'}`,
                                background: activeTab === i ? `${s.color}20` : 'transparent',
                                color: activeTab === i ? s.color : '#9898c0',
                                cursor: 'pointer',
                                fontSize: 14,
                                fontWeight: 600,
                                transition: 'all 0.3s',
                            }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Browser mockup */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 60, rotateX: 10 }}
                    animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ perspective: 1000 }}
                >
                    <div style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                        border: '1px solid rgba(0,245,255,0.15)',
                        boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.15)',
                        maxWidth: 800,
                        margin: '0 auto',
                    }}>
                        {/* Browser chrome */}
                        <div style={{ padding: '14px 20px', background: 'rgba(8,8,32,0.95)', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                                ))}
                            </div>
                            <div style={{ flex: 1, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: '#5a5a80' }}>
                                🔒 app.primaxhub.ai
                            </div>
                        </div>
                        {/* App content */}
                        <div style={{ background: 'linear-gradient(135deg, #080820, #0a0a30)', minHeight: 360 }}>
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {screens[activeTab].content}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom label */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    style={{ textAlign: 'center', color: '#5a5a80', fontSize: 13, marginTop: 24 }}
                >
                    ✨ Real interface — no mockups. Built with precision and care.
                </motion.p>
            </div>
        </section>
    );
}
