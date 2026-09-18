import { Header } from '@/components/organisms/Header';
import { ValuePropositionSection } from '@/components/organisms/ValuePropositionSection';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';
import { ServicesSection, GuidesSection } from '@/components/organisms/ServicesSection';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Sites internet, applications et automatisations',
  'Clément Cochod crée votre site internet, votre application sur mesure et vos automatisations. Découvrez mes projets et parlons de votre activité en France.', '/');

export default function Home() {
  return (
    <main className="min-h-screen bg-cream" style={{ backgroundColor: '#FDFCF0' }}>
      {/* Header avec z-index élevé pour être visible au-dessus du Hero */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero Section avec effet Portal - Pin & Zoom */}
      <HeroSection />

      <ServicesSection />

      {/* Valeur apportée et exemples de réalisations */}
      <ValuePropositionSection />

      <GuidesSection />

      {/* Section de contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
