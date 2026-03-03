import { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import GlobalAI from './GlobalAI';
import ParticleCanvas from '../ParticleCanvas';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu, FiBell, FiCheck } from 'react-icons/fi';
import '../../App.css';

// Detect if mobile
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return isMobile;
}

// Subtle grid + ambient orbs (remain as before for performance)
function AmbientOrbs() {
    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Grid */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(124,58,237,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.022) 1px, transparent 1px)',
                backgroundSize: '72px 72px',
            }} />
            {/* Violet orb */}
            <motion.div
                animate={{ x: [0, 25, 0], y: [0, -18, 0], scale: [1, 1.06, 1] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
                style={{ position: 'absolute', top: '-12%', left: '-8%', width: 650, height: 650, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(124,58,237,0.13) 0%, transparent 70%)', filter: 'blur(50px)' }}
            />
            {/* Cyan orb */}
            <motion.div
                animate={{ x: [0, -20, 0], y: [0, 22, 0], scale: [1, 1.09, 1] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
                style={{ position: 'absolute', bottom: '-18%', right: '-8%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
            />
            {/* Pink accent */}
            <motion.div
                animate={{ x: [0, 18, -12, 0], y: [0, -12, 16, 0], scale: [1, 1.04, 0.97, 1] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
                style={{ position: 'absolute', top: '38%', left: '43%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(232,121,249,0.055) 0%, transparent 70%)', filter: 'blur(70px)' }}
            />
        </div>
    );
}

// Mobile-only top bar
function MobileTopBar({ onMenuOpen, user, notifCount, onNotifClick, showNotifs, notifs, onMarkRead, onMarkAllRead, notifRef }) {
    return (
        <header className="mobile-topbar">
            <motion.button
                className="mobile-topbar-menu"
                whileTap={{ scale: 0.92 }}
                onClick={onMenuOpen}
                aria-label="Open navigation"
            >
                <FiMenu size={22} />
            </motion.button>

            {/* Brand */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #00e5ff 100%)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 16px rgba(124,58,237,0.5)',
                }}>
                    <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 10, fontWeight: 900, color: 'white' }}>PX</span>
                </div>
                <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 13, fontWeight: 800, letterSpacing: '0.04em' }}>
                    <span style={{ background: 'linear-gradient(135deg, #c4b5fd, #f0f0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>PriMaX</span>
                    <span style={{ color: '#00e5ff' }}> Hub</span>
                </span>
            </div>

            {/* Notification bell */}
            <div style={{ position: 'relative', marginLeft: 'auto' }} ref={notifRef}>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={onNotifClick}
                    className="mobile-topbar-icon-btn"
                    aria-label="Notifications"
                >
                    <FiBell size={18} />
                    {notifCount > 0 && (
                        <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: '#7c3aed', borderRadius: '50%', border: '1.5px solid var(--app-bg)', boxShadow: '0 0 8px rgba(124,58,237,0.6)' }} />
                    )}
                </motion.button>

                <AnimatePresence>
                    {showNotifs && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            style={{
                                position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                                width: 'calc(100vw - 32px)', maxWidth: 320,
                                background: 'var(--app-surface-solid)',
                                border: '1px solid var(--app-border)', borderRadius: 16,
                                boxShadow: '0 20px 60px rgba(0,0,0,0.6)', zIndex: 2000,
                                padding: '14px', backdropFilter: 'blur(32px)',
                                borderTop: '1px solid rgba(124,58,237,0.3)'
                            }}
                        >
                            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-2)', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', letterSpacing: '0.08em' }}>
                                NOTIFICATIONS
                                {notifCount > 0 && (
                                    <button onClick={onMarkAllRead} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: 10, cursor: 'pointer', fontWeight: 700 }}>
                                        Mark all read
                                    </button>
                                )}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 260, overflowY: 'auto' }}>
                                {notifs.length === 0 ? (
                                    <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--text-3)', fontSize: 12 }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>🔔</div>
                                        No new notifications
                                    </div>
                                ) : notifs.map(n => (
                                    <div key={n.id} style={{ padding: '10px 12px', borderRadius: 10, background: n.is_read ? 'transparent' : 'rgba(124,58,237,0.04)', border: '1px solid var(--app-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)' }}>{n.title}</div>
                                            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, lineHeight: 1.5 }}>{n.message}</div>
                                        </div>
                                        {!n.is_read && (
                                            <button onClick={() => onMarkRead(n.id)} style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(124,58,237,0.1)', border: 'none', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                                <FiCheck size={12} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}

export default function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileNotifOpen, setMobileNotifOpen] = useState(false);
    const [notifs, setNotifs] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate();
    const isMobile = useIsMobile();
    const mobileNotifRef = { current: null }; // ref for outside-click handler

    const fetchNotifs = useCallback(async () => {
        if (!user) return;
        const { data } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);
        if (data) setNotifs(data);
    }, [user]);

    const markAsRead = async (id) => {
        await supabase.from('notifications').update({ is_read: true }).eq('id', id);
        fetchNotifs();
    };

    const markAllAsRead = async () => {
        if (!user) return;
        await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false);
        fetchNotifs();
    };

    useEffect(() => {
        if (!user) return;
        fetchNotifs();
    }, [user, fetchNotifs]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('onboarding_completed')
                .eq('id', user.id)
                .maybeSingle();
            if (!error && data && data.onboarding_completed === false) {
                navigate('/app/onboarding', { replace: true });
            }
        })();
    }, [user, navigate]);

    // Close mobile sidebar when clicking backdrop
    const closeMobileSidebar = () => setMobileOpen(false);

    // Close notifs on outside click
    useEffect(() => {
        if (!mobileNotifOpen) return;
        const handler = (e) => {
            // simple check - if clicked outside of the topbar area
            const topbar = document.querySelector('.mobile-topbar');
            if (topbar && !topbar.contains(e.target)) {
                setMobileNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [mobileNotifOpen]);

    // Close mobile sidebar on route change
    useEffect(() => {
        setMobileOpen(false);
    }, []);

    const unreadCount = notifs.filter(n => !n.is_read).length;

    return (
        <div className={`app-shell ${isMobile ? 'is-mobile' : ''}`}>
            {/* HEAVY NETWORKING PARTICLES — use fewer on mobile for performance */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                <ParticleCanvas
                    count={isMobile ? 25 : 70}
                    networking={!isMobile}
                    color="#7c3aed"
                    accent="#00e5ff"
                    speed={0.35}
                    maxDist={130}
                    size={1.4}
                    opacity={0.6}
                />
            </div>

            {/* Ambient glow orbs on top of particles */}
            <AmbientOrbs />

            {/* Mobile-only top bar */}
            {isMobile && (
                <MobileTopBar
                    onMenuOpen={() => setMobileOpen(true)}
                    user={user}
                    notifCount={unreadCount}
                    onNotifClick={() => setMobileNotifOpen(o => !o)}
                    showNotifs={mobileNotifOpen}
                    notifs={notifs}
                    onMarkRead={markAsRead}
                    onMarkAllRead={markAllAsRead}
                    notifRef={mobileNotifRef}
                />
            )}

            {/* Mobile sidebar backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMobileSidebar}
                        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 49 }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar (mobile-aware) */}
            <Sidebar
                collapsed={collapsed}
                onToggle={() => setCollapsed(c => !c)}
                mobileOpen={mobileOpen}
                onMobileClose={closeMobileSidebar}
                onMobileOpen={() => setMobileOpen(true)}
                isMobile={isMobile}
            />

            <AnimatePresence mode="wait">
                <motion.main
                    key="main"
                    className={`main-content${collapsed ? ' collapsed' : ''}`}
                    layout
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                >
                    <motion.div
                        key="outlet"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </motion.main>
            </AnimatePresence>

            <GlobalAI isMobile={isMobile} />
        </div>
    );
}
