import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
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
import ChatBotLauncher from './components/ChatBotLauncher';
import Certificates from './pages/Certificates';
import Photos from './pages/Photos';
import Resume from './pages/Resume';
import Tools from './components/Tools';
import Touch from './components/Touch';
import WorkExperience from './pages/WorkExperience';
import AOS from 'aos';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  return (
    <Router>
      <SmoothScroll>
        <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden relative">
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Projects />
                <GitHubContributions />
                <Skills />
                <Education />
                <Blog />
                <Tools />
                <Touch />
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/all-posts" element={<AllPosts />} />
            <Route path="/projects" element={<AllProjects />} />
            <Route path="/chat-assistant" element={<ChatAssistant />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/experience" element={<WorkExperience />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gears" element={<Gears />} />
            <Route path="/extensions" element={<Extensions />} />
          </Routes>
          <ChatBotLauncher />
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
};

export default App;