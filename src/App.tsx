import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SEO from './components/SEO';
import Navbar from './components/layout/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogContent from './components/BlogContent';
import Footer from './components/layout/Footer';
import BlogList from './pages/BlogList';
import AllProjects from './pages/AllProjects';
import Contact from './pages/Contact';
import Gears from './pages/Gears';
import Extensions from './pages/Extensions';
import GitHubContributions from './components/GitHubContributions';
import Certificates from './pages/Certificates';
import Photos from './pages/Photos';
import Resume from './pages/Resume';
import Tools from './components/Tools';
import Bookshelf from './components/Bookshelf';
import BookThoughts from './components/BookThoughts';
import Touch from './components/Touch';
import WorkExperience from './pages/WorkExperience';
import BucketList from './pages/BucketList';
import ScrollToTop from './components/common/ScrollToTop';
import PageTransition from './components/ui/PageTransition';
import CommandPalette from './components/CommandPalette';
import useUIStore from './store/useUIStore';
import useAppStore from './store/useAppStore';

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
              <Experience />
              <Projects />
              <GitHubContributions />
              <Blog />
              <Tools />
              <Bookshelf />
              <Touch />
            </PageTransition>
          }
        />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogContent /></PageTransition>} />
        <Route path="/thoughts/:slug" element={<PageTransition><BookThoughts /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogList /></PageTransition>} />
        <Route path="/all-posts" element={<Navigate to="/blog" replace />} />
        <Route path="/projects" element={<PageTransition><AllProjects /></PageTransition>} />
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
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const { setActiveLink } = useAppStore();

  return (
    <Router>
      <ScrollToTop />
      <SEO />
      <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden relative">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
        {/* Bottom blur overlay effect */}
        <div className="bottom-blur-overlay" />
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onNavigate={setActiveLink}
        />
      </div>
    </Router>
  );
};

export default App;