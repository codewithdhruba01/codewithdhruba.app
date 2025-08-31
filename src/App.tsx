import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllPosts from './pages/AllPosts';
import AllProjects from './pages/AllProjects';
import ChatAssistant from './pages/ChatAssistant';
import GitHubContributions from './components/GitHubContributions';
import ChatBotLauncher from './components/ChatBotLauncher';
import Certificates from './pages/Certificates';
import Badges from './components/Badges';
import AOS from 'aos';

const App = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: true
    });

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    })


    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden relative">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Projects />
              <Education />
              <Skills />
              <GitHubContributions />
              <Blog />
              <Badges />
              <Contact />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/chat-assistant" element={<ChatAssistant />} />
           <Route path="/certificates" element={<Certificates />} />
        </Routes>
        <ChatBotLauncher /> {/* Floating chat icon */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;