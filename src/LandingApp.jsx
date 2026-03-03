// Landing page wrapper — imported by App.jsx at route "/"
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductOverview from './components/ProductOverview';
import Features from './components/Features';
import AICapabilities from './components/AICapabilities';
import HowItWorks from './components/HowItWorks';
import Preview from './components/Preview';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function LandingApp() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
            <Navbar />
            <main>
                <Hero />
                <ProductOverview />
                <Features />
                <AICapabilities />
                <HowItWorks />
                <Preview />
                <Benefits />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}
