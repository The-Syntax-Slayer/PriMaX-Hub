import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiAlertCircle, FiArrowLeft, FiCheckCircle, FiShield } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import ParticleCanvas from '../components/ParticleCanvas';
import '../App.css';

export default function ForgotPassword() {
    const { resetPassword, verifyResetOtp } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (!email) { setError('Please enter your email.'); return; }

        try {
            setLoading(true);
            setError('');
            const { error: err } = await resetPassword(email);
            if (err) throw err;
            setStep(2);
            setMessage('A verification code has been sent to your email.');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) { setError('Please enter the OTP.'); return; }

        try {
            setLoading(true);
            setError('');
            const { error: err } = await verifyResetOtp(email, otp);
            if (err) throw err;
            // Success! Supabase automatically logs them in with a recovery session.
            navigate('/reset-password');
        } catch (err) {
            setError(err.message || 'Invalid or expired OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-landscape-wrapper" style={{ justifyContent: 'center' }}>
                <div className="auth-form-side" style={{ width: '100%', maxWidth: 480 }}>
                    <motion.div
                        animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    />

                    <motion.div
                        className="auth-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        <div className="auth-card-glass" style={{ boxShadow: '0 0 0 1px rgba(124,58,237,0.2), 0 40px 100px rgba(0,0,0,0.5), 0 0 80px rgba(124,58,237,0.12), 0 0 30px rgba(0,229,255,0.06)' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h1 className="auth-title" style={{ textAlign: 'left', fontSize: 28, marginBottom: 12 }}>
                                    {step === 1 ? 'Reset Password' : 'Verify Identity'}
                                </h1>
                                <p className="auth-subtitle" style={{ textAlign: 'left', marginBottom: 30 }}>
                                    {step === 1
                                        ? 'Enter your email to receive a recovery code'
                                        : `Enter the code sent to ${email}`}
                                </p>
                            </motion.div>

                            {error && (
                                <motion.div
                                    className="form-error"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)', marginBottom: 20, color: '#ef4444', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FiAlertCircle size={16} /> {error}
                                </motion.div>
                            )}

                            {message && step === 2 && (
                                <motion.div
                                    className="form-success"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)', marginBottom: 20, color: '#22c55e', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
                                >
                                    <FiCheckCircle size={16} /> {message}
                                </motion.div>
                            )}

                            <form onSubmit={step === 1 ? handleSendEmail : handleVerifyOtp}>
                                <AnimatePresence mode="wait">
                                    {step === 1 ? (
                                        <motion.div
                                            key="email-step"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="form-group"
                                            style={{ marginBottom: 24 }}
                                        >
                                            <label className="form-label">Email address</label>
                                            <div style={{ position: 'relative' }}>
                                                <FiMail size={15} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#44446a' }} />
                                                <input
                                                    className="form-input"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    style={{ paddingLeft: 44 }}
                                                />
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="otp-step"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="form-group"
                                            style={{ marginBottom: 24 }}
                                        >
                                            <label className="form-label">Verification Code (OTP)</label>
                                            <div style={{ position: 'relative' }}>
                                                <FiShield size={15} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#44446a' }} />
                                                <input
                                                    className="form-input"
                                                    type="text"
                                                    placeholder="••••••••"
                                                    maxLength={8}
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                    style={{ paddingLeft: 44, letterSpacing: '0.5em', fontWeight: 'bold', fontSize: '18px' }}
                                                />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="btn-auth"
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading
                                        ? (step === 1 ? 'Sending code...' : 'Verifying...')
                                        : (step === 1 ? 'Send Recovery Code' : 'Verify & Proceed')}
                                </motion.button>
                            </form>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                style={{ marginTop: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}
                            >
                                {step === 2 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 13, cursor: 'pointer' }}
                                    >
                                        Use a different email
                                    </button>
                                )}
                                <Link to="/login" style={{ color: '#00e5ff', textDecoration: 'none', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                    <FiArrowLeft size={14} /> Back to Login
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <ParticleCanvas count={30} networking={false} color="#7c3aed" speed={0.3} opacity={0.2} />
        </div>
    );
}
