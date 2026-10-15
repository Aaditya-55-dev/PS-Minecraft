import HeroSection from "../components/HeroSection"
import Navbar from "../components/Navbar"
import Info from "../components/Info"

export default function Home(){
    return(
        <div className="overflow-x-clip">
            <Navbar></Navbar>
            <HeroSection></HeroSection>
            <Info></Info>
        </div>
    )
}