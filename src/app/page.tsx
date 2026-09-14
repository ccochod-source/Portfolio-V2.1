import { Header } from '@/components/organisms/Header';
import { ValuePropositionSection } from '@/components/organisms/ValuePropositionSection';
import { HeroSection } from '@/components/organisms/HeroSection';
import { ContactSection } from '@/components/organisms/ContactSection';
import { Footer } from '@/components/organisms/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-cream" style={{ backgroundColor: '#FDFCF0' }}>
      {/* Header avec z-index élevé pour être visible au-dessus du Hero */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header />
      </div>

      {/* Hero Section avec effet Portal - Pin & Zoom */}
      <HeroSection />

      {/* Valeur apportée et exemples de réalisations */}
      <ValuePropositionSection />

      {/* Section de contact */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
