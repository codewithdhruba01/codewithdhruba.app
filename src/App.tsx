import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './pages/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Footer from './components/Footer';
import AllPosts from './pages/AllPosts';
import AllProjects from './pages/AllProjects';
import ChatAssistant from './pages/ChatAssistant';
import Contact from './pages/Contact';
import Gears from './pages/Gears';
import GitHubContributions from './components/GitHubContributions';
import ChatBotLauncher from './components/ChatBotLauncher';
import Certificates from './pages/Certificates';
import Tools from './components/Tools';
import Touch from './components/Touch';
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
              <Tools/>
              <Touch />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/chat-assistant" element={<ChatAssistant />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gears" element={<Gears />} />
        </Routes>
        <ChatBotLauncher />
        <Footer />
      </div>
    </Router>
  );
};

export default App;