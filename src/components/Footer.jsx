import { motion } from 'framer-motion';
import { FiActivity, FiTwitter, FiLinkedin, FiGithub, FiInstagram } from 'react-icons/fi';


const links = {
    Product: ['Features', 'AI Engine', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About Us', 'Blog', 'Careers', 'Press', 'Partners'],
    Resources: ['Documentation', 'Community', 'Webinars', 'Success Stories', 'API'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'],
};

export default function Footer() {
    return (
        <footer className="footer-wrapper" style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid rgba(0,245,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="glow-orb" style={{ width: 400, height: 400, background: '#7c3aed', bottom: '-50%', left: '50%', transform: 'translateX(-50%)', opacity: 0.05 }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                {/* Top row */}
                <div className="footer-grid">
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                            <div style={{
                                width: 38, height: 38, borderRadius: 10,
                                background: 'linear-gradient(135deg, #7c3aed, #00f5ff)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 20px rgba(124,58,237,0.5)',
                            }}>
                                <FiActivity size={20} color="white" />
                            </div>
                            <span style={{ fontFamily: 'Orbitron, monospace', fontSize: 16, fontWeight: 700, color: '#f0f0ff' }}>
                                PriMaX<span style={{ color: '#00f5ff' }}>Hub</span>
                            </span>
                        </div>
                        <p style={{ color: '#9898c0', fontSize: 14, lineHeight: 1.8, marginBottom: 24, maxWidth: 240 }}>
                            The AI-powered personal growth platform that helps you achieve your goals 10x faster.
                        </p>
                        <div style={{ display: 'flex', gap: 12 }}>
                            {[FiTwitter, FiLinkedin, FiGithub, FiInstagram].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ scale: 1.15, color: '#00f5ff' }}
                                    style={{
                                        width: 36, height: 36, borderRadius: 8,
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#9898c0', transition: 'all 0.2s',
                                    }}
                                >
                                    <Icon size={16} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([category, items]) => (
                        <div key={category}>
                            <h4 style={{ color: '#f0f0ff', fontWeight: 700, fontSize: 13, letterSpacing: '0.05em', marginBottom: 16, textTransform: 'uppercase' }}>
                                {category}
                            </h4>
                            <ul className="footer-links" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {items.map((item) => (
                                    <li key={item}>
                                        <motion.a
                                            href="#"
                                            whileHover={{ color: '#00f5ff', x: 3 }}
                                            style={{ color: '#9898c0', textDecoration: 'none', fontSize: 14, display: 'inline-block', transition: 'color 0.2s' }}
                                        >
                                            {item}
                                        </motion.a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="footer-newsletter" style={{
                    borderRadius: 16,
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(124,58,237,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    flexWrap: 'wrap',
                }}>
                    <div>
                        <h4 style={{ color: '#f0f0ff', fontWeight: 700, marginBottom: 4 }}>Stay in the growth loop</h4>
                        <p style={{ color: '#9898c0', fontSize: 14 }}>Weekly insights on AI, habits, and peak performance.</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            style={{
                                padding: '12px 18px',
                                borderRadius: 100,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(0,245,255,0.2)',
                                color: '#f0f0ff',
                                fontSize: 14,
                                outline: 'none',
                                width: 220,
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="btn btn-primary"
                            style={{ padding: '12px 24px', fontSize: 14 }}
                        >
                            Subscribe
                        </motion.button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 12,
                    paddingTop: 24,
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <p style={{ color: '#5a5a80', fontSize: 13 }}>
                        © 2026 PriMaX Hub. All rights reserved.
                    </p>
                    <p style={{ color: '#5a5a80', fontSize: 13 }}>
                        Built with ❤️ and AI — for human potential.
                    </p>
                </div>
            </div>

            <style>{`
        .footer-wrapper {
            padding-top: 72px;
            padding-bottom: 40px;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: 1.5fr repeat(4, 1fr);
            gap: 40px;
            margin-bottom: 64px;
        }
        .footer-newsletter {
            padding: 28px 32px;
            margin-bottom: 48px;
        }
        
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-wrapper {
             padding-top: 40px !important;
             padding-bottom: 24px !important;
          }
          .footer-grid {
            /* Keep brand description full width, put links in 2 columns */
            grid-template-columns: 1fr 1fr !important;
            gap: 24px;
            margin-bottom: 32px;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
          .footer-links {
             gap: 6px !important;
          }
          .footer-newsletter {
            padding: 20px;
            margin-bottom: 32px;
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}</style>
        </footer>
    );
}
