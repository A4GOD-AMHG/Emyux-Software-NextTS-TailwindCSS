import HeroSection from '@/components/HeroSection';
// import AboutSection from '@/components/AboutSection';
import ProblemsSection from '@/components/ProblemsSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ImprovedCTA from '@/components/ImprovedCTA';

export default function Home() {

    return (
        <main className="w-full sm:max-w-7xl not-first:flex flex-col grow mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection />
            {/* <AboutSection /> */}
            <ProblemsSection />
            <ServicesSection />
            <TestimonialsSection />
            <ImprovedCTA />
        </main>
    )
}