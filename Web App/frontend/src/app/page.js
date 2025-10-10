import FeaturesSection from "@/components/FeaturesSection";
import Header from "@/components/Header";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <FeaturesSection />
      <HowItWorks />
    </div>
  );
}
