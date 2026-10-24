import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
const Home = lazy(() => import("../src/pages/Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
import ProblemStatement from "./pages/ProblemStatement";
import SplashGate from "./components/SplashGate";
// import Schedule from "./pages/Schedule";
// import RegistrationForm from "./pages/RegistrationForm";
// import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
// import Sponsor from "./pages/Sponsor";
// import Contact from "./pages/Contact";
// import FirebaseStats from "./pages/FirebaseStats";
// // import MaleParticipantsOutsideCampus from "./pages/Male";
// import CountDown from "./pages/CountDown";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Receipt from './pages/Receipt';

import SmoothScroll from "./components/SmoothScroll";

function App() {
  // The splash is handled entirely by <SplashGate>: it shows the loading screen,
  // then renders everything inside it. No extra splash state is needed here.
  return (
    <SplashGate>
      <Router>
        <SmoothScroll>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contact" element={<Contact />} /> {/* ADDED */}
              <Route path="/faq" element={<Faq />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/problem-statement" element={<ProblemStatement />} />
              {/* <Route path="/registration" element={<RegistrationForm/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/sponsors" element={<Sponsor/>} />
              <Route path="/schedule" element={<Schedule/>} />
              <Route path="/admin" element={<FirebaseStats/>} />
              <Route path="/receipt" element={<Receipt />} />
              <Route path="/CountDown" element={<CountDown/>}/> */}
            </Routes>
          </Suspense>
        </SmoothScroll>
      </Router>
    </SplashGate>
  );
}

export default App;