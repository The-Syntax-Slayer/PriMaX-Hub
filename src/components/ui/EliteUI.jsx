import { motion } from 'framer-motion';
import { FiChevronRight, FiActivity, FiZap, FiStar, FiTriangle } from 'react-icons/fi';

/**
 * Premium Card with glassmorphism and top-border glow
 */
export function GlassCard({ children, style = {}, glowColor, hoverScale = 1.01, ...props }) {
    return (
        <motion.div
            whileHover={hoverScale ? { scale: hoverScale, y: -2, zIndex: 1 } : {}}
            style={{
                borderRadius: 22,
                background: 'var(--app-surface)',
                border: '1px solid var(--app-border)',
                backdropFilter: 'blur(16px)',
                padding: 24,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: glowColor ? `0 0 40px ${glowColor}15` : 'var(--glow-subtle)',
                ...style,
            }}
            {...props}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: `linear-gradient(90deg, transparent, ${glowColor || 'rgba(255,255,255,0.08)'}, transparent)`,
                pointerEvents: 'none'
            }} />
            {children}
        </motion.div>
    );
}

/**
 * Animated Section Title
 */
export function EliteSectionTitle({ title, icon, actionLabel, onAction, color = 'var(--accent)' }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{
                fontSize: 11,
                fontWeight: 800,
                color: 'var(--text-3)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textTransform: 'uppercase',
                letterSpacing: '0.15em'
            }}>
                <span style={{ color }}>{icon}</span> {title}
            </h3>
            {actionLabel && (
                <button
                    onClick={onAction}
                    style={{
                        fontSize: 11,
                        color: 'var(--accent-cyan)',
                        fontWeight: 700,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        opacity: 0.7,
                        transition: 'all 0.2s',
                        letterSpacing: '0.05em'
                    }}
                    onMouseOver={e => e.currentTarget.style.opacity = 1}
                    onMouseOut={e => e.currentTarget.style.opacity = 0.7}
                >
                    {actionLabel} <FiChevronRight size={12} />
                </button>
            )}
        </div>
    );
}

/**
 * Modern Stat Badge
 */
export function EliteStat({ label, value, icon, color, delta }) {
    return (
        <div style={{
            padding: '16px 20px',
            borderRadius: 18,
            background: `${color}08`,
            border: `1px solid ${color}15`,
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{ fontSize: 20, marginBottom: 12, color }}>{icon}</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 22, fontWeight: 900, color: 'var(--text-1)', lineHeight: 1 }}>{value}</div>
                {delta && <div style={{ fontSize: 10, color: delta.startsWith('+') ? 'var(--accent-emerald)' : 'var(--accent-violet)', fontWeight: 700, marginBottom: 2 }}>{delta}</div>}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 600, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ position: 'absolute', bottom: -10, right: -10, fontSize: 40, opacity: 0.03, color }}>{icon}</div>
        </div>
    );
}

/**
 * Gradient Button Premium
 */
export function EliteButton({ children, onClick, type = 'button', variant = 'primary', icon: Icon, loading }) {
    const isPrimary = variant === 'primary';
    return (
        <motion.button
            whileHover={{ scale: 1.02, boxShadow: isPrimary ? '0 8px 25px rgba(var(--accent-rgb), 0.4)' : 'none' }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            type={type}
            disabled={loading}
            style={{
                padding: '12px 24px',
                borderRadius: 14,
                background: isPrimary ? 'linear-gradient(135deg, var(--accent), var(--accent-cyan))' : 'rgba(255,255,255,0.05)',
                border: isPrimary ? 'none' : '1px solid var(--app-border)',
                color: 'white',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                opacity: loading ? 0.6 : 1,
                fontFamily: 'Inter, sans-serif'
            }}
        >
            {Icon && <Icon size={18} />}
            {children}
        </motion.button>
    );
}

/**
 * Animated Mesh Background Component
 */
export function MeshBackground() {
    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: -1,
            pointerEvents: 'none',
            background: 'var(--bg-primary)'
        }}>
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    top: '-20%',
                    left: '-10%',
                    width: '60%',
                    height: '60%',
                    background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)'
                }}
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    x: [0, -100, 0],
                    y: [0, -50, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{
                    position: 'absolute',
                    bottom: '-20%',
                    right: '-10%',
                    width: '70%',
                    height: '70%',
                    background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
                    filter: 'blur(100px)'
                }}
            />
        </div>
    );
}
