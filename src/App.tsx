import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AllPosts from './pages/AllPosts';
import AllProjects from './pages/AllProjects';
import GitHubContributions from './components/GitHubContributions';
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
      <div className="min-h-screen bg-[#0A0A0A] text-white overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Education />
              <Skills />
              <Projects />
              <GitHubContributions />
              <Blog />
              <Contact />
            </>
          } />
          <Route path="/blog/:slug" element={<BlogPost />} />
           <Route path="/all-posts" element={<AllPosts />} />
           <Route path="/projects" element={<AllProjects />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;