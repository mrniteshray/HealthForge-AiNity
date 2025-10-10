import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import FooterSection from "@/components/Footer";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import TestimonialsSection from "@/components/TestimonialsSection";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
