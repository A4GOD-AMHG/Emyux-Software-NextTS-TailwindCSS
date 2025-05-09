import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ImprovedCTA from '@/components/ImprovedCTA';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProblemsSection from '@/components/ProblemsSection';
// import AboutSection from '@/components/AboutSection';

export default function Home() {

    return (
        <main className="max-w-7xl not-first:flex flex-col grow mx-auto px-4 sm:px-6 lg:px-8">
            <HeroSection />
            {/* <AboutSection /> */}
            <ProblemsSection />
            <ServicesSection />
            <TestimonialsCarousel />
            <ImprovedCTA />
        </main>
    )
}