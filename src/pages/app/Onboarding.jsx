import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiZap } from 'react-icons/fi';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const FOCUS_AREAS = [
    { id: 'career', label: 'Career Growth', icon: '💼', desc: 'Roadmaps, skills, job tracking' },
    { id: 'finance', label: 'Finance', icon: '💰', desc: 'Budget, savings, investments' },
    { id: 'fitness', label: 'Fitness', icon: '💪', desc: 'Workouts, habits, health' },
    { id: 'mental', label: 'Mental Growth', icon: '🧠', desc: 'Journaling, mood, mindset' },
    { id: 'productivity', label: 'Productivity', icon: '⚡', desc: 'Tasks, focus, planning' },
];

const STEPS = ['Welcome', 'Focus Areas', 'Primary Goal'];

export default function Onboarding() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [name, setName] = useState(user?.user_metadata?.full_name || '');
    const [selectedAreas, setSelectedAreas] = useState([]);
    const [primaryGoal, setPrimaryGoal] = useState('');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const toggleArea = (id) =>
        setSelectedAreas(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );

    const finish = async () => {
        setSaving(true);
        setError('');
        const { error: err } = await supabase.from('profiles').upsert({
            id: user.id,
            full_name: name.trim() || null,
            focus_areas: selectedAreas,
            primary_goal: primaryGoal.trim() || null,
            onboarding_completed: true,
        });
        setSaving(false);
        if (err) { setError('Could not save. Please try again.'); return; }
        navigate('/app/dashboard');
    };

    const canProceed = [
        name.trim().length > 0,
        selectedAreas.length > 0,
        true,
    ][step];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            fontFamily: 'Inter, sans-serif',
        }}>
            {/* Background glow */}
            <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ width: '100%', maxWidth: 560, position: 'relative', zIndex: 1 }}>
                {/* Step indicators */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40 }}>
                    {STEPS.map((s, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: i <= step ? 'linear-gradient(135deg,#7c3aed,#00f5ff)' : 'rgba(255,255,255,0.06)', border: `1px solid ${i <= step ? 'transparent' : 'rgba(255,255,255,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: i <= step ? 'white' : 'var(--text-3)', fontWeight: 700, transition: 'all 0.3s' }}>
                                {i < step ? <FiCheck size={12} /> : i + 1}
                            </div>
                            {i < STEPS.length - 1 && <div style={{ width: 40, height: 1, background: i < step ? '#7c3aed' : 'rgba(255,255,255,0.08)', transition: 'all 0.3s' }} />}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {/* STEP 1: Welcome */}
                    {step === 0 && (
                        <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                                <div style={{ fontSize: 56, marginBottom: 16 }}>👋</div>
                                <h1 style={{ fontSize: 30, fontWeight: 900, color: 'var(--text-1)', marginBottom: 10 }}>Welcome to PriMaX</h1>
                                <p style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.6 }}>Your AI-powered life OS. Let's personalise it for you in 60 seconds.</p>
                            </div>
                            <div style={{ marginBottom: 8, fontSize: 13, fontWeight: 600, color: 'var(--text-2)' }}>What should we call you?</div>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Your name..."
                                autoFocus
                                style={{ width: '100%', padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-1)', fontSize: 16, fontFamily: 'Inter, sans-serif', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
                                onFocus={e => e.target.style.borderColor = '#7c3aed'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                        </motion.div>
                    )}

                    {/* STEP 2: Focus Areas */}
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                                <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', marginBottom: 8 }}>What are you focused on?</h2>
                                <p style={{ fontSize: 14, color: 'var(--text-2)' }}>Select all that apply. You can change this later.</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                {FOCUS_AREAS.map(area => {
                                    const selected = selectedAreas.includes(area.id);
                                    return (
                                        <motion.button key={area.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleArea(area.id)}
                                            style={{ padding: '16px 18px', borderRadius: 14, background: selected ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)', border: `1.5px solid ${selected ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.07)'}`, cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', position: 'relative' }}>
                                            {selected && <div style={{ position: 'absolute', top: 10, right: 10, width: 18, height: 18, borderRadius: '50%', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiCheck size={10} color="white" /></div>}
                                            <div style={{ fontSize: 24, marginBottom: 6 }}>{area.icon}</div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: selected ? '#f0f0ff' : 'var(--text-1)', marginBottom: 3 }}>{area.label}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{area.desc}</div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: Primary Goal */}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                                <div style={{ fontSize: 48, marginBottom: 14 }}>🎯</div>
                                <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', marginBottom: 8 }}>What's your #1 goal right now?</h2>
                                <p style={{ fontSize: 14, color: 'var(--text-2)' }}>In one sentence — what does success look like for you this year?</p>
                            </div>
                            <textarea
                                value={primaryGoal}
                                onChange={e => setPrimaryGoal(e.target.value)}
                                placeholder="e.g. Land a senior engineer role at a product company by December..."
                                rows={4}
                                autoFocus
                                style={{ width: '100%', padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-1)', fontSize: 15, fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
                                onFocus={e => e.target.style.borderColor = '#7c3aed'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                            {error && <p style={{ color: '#ef4444', fontSize: 13, marginTop: 8 }}>{error}</p>}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, alignItems: 'center' }}>
                    <button onClick={() => setStep(s => s - 1)} style={{ background: 'none', border: 'none', color: step > 0 ? 'var(--text-3)' : 'transparent', fontSize: 14, cursor: step > 0 ? 'pointer' : 'default', fontFamily: 'Inter, sans-serif', transition: 'color 0.2s' }}>← Back</button>

                    <motion.button
                        whileHover={{ scale: canProceed ? 1.03 : 1 }}
                        whileTap={{ scale: canProceed ? 0.97 : 1 }}
                        onClick={() => step < STEPS.length - 1 ? setStep(s => s + 1) : finish()}
                        disabled={!canProceed || saving}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 14, background: canProceed ? 'linear-gradient(135deg,#7c3aed,#00f5ff)' : 'rgba(255,255,255,0.06)', border: 'none', color: canProceed ? 'white' : 'var(--text-3)', fontSize: 15, fontWeight: 700, cursor: canProceed ? 'pointer' : 'not-allowed', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s' }}>
                        {saving ? 'Setting up...' : step < STEPS.length - 1 ? <>Continue <FiArrowRight /></> : <><FiZap /> Launch PriMaX</>}
                    </motion.button>
                </div>

                <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-3)', marginTop: 20 }}>Step {step + 1} of {STEPS.length}</p>
            </div>
        </div>
    );
}
