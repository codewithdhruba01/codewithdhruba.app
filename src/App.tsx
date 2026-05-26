import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SEO from './components/SEO';
import Navbar from './components/layout/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/layout/Footer';
import AllPosts from './pages/AllPosts';
import AllProjects from './pages/AllProjects';
import ChatAssistant from './pages/ChatAssistant';
import Contact from './pages/Contact';
import Gears from './pages/Gears';
import Extensions from './pages/Extensions';
import GitHubContributions from './components/GitHubContributions';
import Sponsors from './components/Sponsors';
import ChatBotLauncher from './components/ChatBotLauncher';
import Certificates from './pages/Certificates';
import Photos from './pages/Photos';
import Resume from './pages/Resume';
import Tools from './components/Tools';
import Touch from './components/Touch';
import WorkExperience from './pages/WorkExperience';
import BucketList from './pages/BucketList';
import AOS from 'aos';
import ScrollToTop from './components/common/ScrollToTop';
import PageTransition from './components/ui/PageTransition';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Hero />
              <Projects />
              <GitHubContributions />
              <Sponsors />
              <Skills />
              <Education />
              <Blog />
              <Tools />
              <Touch />
            </PageTransition>
          }
        />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
        <Route path="/all-posts" element={<PageTransition><AllPosts /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><AllProjects /></PageTransition>} />
        <Route path="/chat-assistant" element={<PageTransition><ChatAssistant /></PageTransition>} />
        <Route path="/certificates" element={<PageTransition><Certificates /></PageTransition>} />
        <Route path="/photos" element={<PageTransition><Photos /></PageTransition>} />
        <Route path="/resume" element={<PageTransition><Resume /></PageTransition>} />
        <Route path="/experience" element={<PageTransition><WorkExperience /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/gears" element={<PageTransition><Gears /></PageTransition>} />
        <Route path="/extensions" element={<PageTransition><Extensions /></PageTransition>} />
        <Route path="/bucket-list" element={<PageTransition><BucketList /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <SEO />
      <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden relative">
        <Navbar />
        <AnimatedRoutes />
        <ChatBotLauncher />
        <Footer />
      </div>
    </Router>
  );
};

export default App;