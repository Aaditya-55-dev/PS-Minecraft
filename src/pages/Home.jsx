import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"

export default function Home(){
    return(
        <div className="overflow-x-hidden">
            <Navbar></Navbar>
            <HeroSection></HeroSection>
        </div>
    )
}