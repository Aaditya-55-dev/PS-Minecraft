import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Info from "../components/Info";
import PrevWinners from "../components/PrevWinners";
import Footer from "../components/Footer";
import CherryBlossom from "../components/Cherryblossom"
import PrizePool from "../components/PrizePool";
export default function Home() {
    return (
        <div className="overflow-x-clip">
            <Navbar />
            <CherryBlossom>
                <HeroSection />
            </CherryBlossom>
            <Info />
            <PrevWinners />
            <PrizePool/>
            <Footer />
        </div>
    );
}