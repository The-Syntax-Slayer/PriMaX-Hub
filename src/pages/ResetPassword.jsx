import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiAlertCircle, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import ParticleCanvas from '../components/ParticleCanvas';
import '../App.css';

export default function ResetPassword() {
    const { updatePassword } = useAuth();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) { setError('Please enter a new password.'); return; }
        if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
        if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

        try {
            setLoading(true);
            setError('');
            const { error: err } = await updatePassword(password);
            if (err) throw err;
            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.message);
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
                                    Set New Password
                                </h1>
                                <p className="auth-subtitle" style={{ textAlign: 'left', marginBottom: 30 }}>Secure your account with a new master key</p>
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

                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ textAlign: 'center', padding: '20px 0' }}
                                >
                                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#22c55e' }}>
                                        <FiCheckCircle size={32} />
                                    </div>
                                    <h3 style={{ color: 'white', marginBottom: 10 }}>Password Updated!</h3>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Redirecting you to login...</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="form-group"
                                        style={{ marginBottom: 20 }}
                                    >
                                        <label className="form-label">New Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <FiLock size={15} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#44446a' }} />
                                            <input
                                                className="form-input"
                                                type={showPass ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                style={{ paddingLeft: 44, paddingRight: 46 }}
                                            />
                                            <button type="button" onClick={() => setShowPass(p => !p)}
                                                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#44446a', cursor: 'pointer', padding: 4 }}>
                                                {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                                            </button>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="form-group"
                                        style={{ marginBottom: 30 }}
                                    >
                                        <label className="form-label">Confirm Password</label>
                                        <div style={{ position: 'relative' }}>
                                            <FiLock size={15} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#44446a' }} />
                                            <input
                                                className="form-input"
                                                type={showPass ? 'text' : 'password'}
                                                placeholder="••••••••"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                style={{ paddingLeft: 44, paddingRight: 46 }}
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="btn-auth"
                                        type="submit"
                                        disabled={loading}
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(124,58,237,0.4)' }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {loading ? 'Updating Master Key...' : 'Update Password'}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
            <ParticleCanvas count={30} networking={false} color="#7c3aed" speed={0.3} opacity={0.2} />
        </div>
    );
}
