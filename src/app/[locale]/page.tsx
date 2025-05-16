
import { HeroSection } from '@/components/Hero';
// import AboutSection from '@/components/AboutSection';
import ProblemsSection from '@/components/ProblemsSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ImprovedCTA from '@/components/ImprovedCTA';
import AdvantagesSection from '@/components/AdventagesSection';
import ControlSection from '@/components/ControlSection';
import TimelineSection from '@/components/TimelineSection';
import ContactSection from '../../components/ContactSection';

export default function Home() {

    return (
        <main className="w-full sm:max-w-7xl not-first:flex flex-col grow mx-auto px-8 sm:px-2">
            <HeroSection />
            {/* <AboutSection /> */}
            <ProblemsSection />
            <AdvantagesSection />
            <ServicesSection />
            <ControlSection />
            <TimelineSection />
            <TestimonialsSection />
            <ImprovedCTA />
            <ContactSection />
        </main>
    )
}