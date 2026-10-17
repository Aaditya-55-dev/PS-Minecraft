import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Info from "../components/Info";
import PrevWinners from "../components/PrevWinners";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Navbar />
      <HeroSection />
      <Info />
      <PrevWinners />
      <Footer />
    </div>
  );
}