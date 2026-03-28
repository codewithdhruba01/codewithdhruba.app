import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { SectionButton } from './ui/SectionButton';

const Blog = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set([...prev, index]));
  };

  const blogPosts = [
    {
      title: 'How NextAuth.js Works',
      description:
        'NextAuth.js is a complete open-source authentication solution for Next.js applications. It handles authentication, authorization, and session management',
      date: 'January 31, 2026',
      image: '/blog/blog6.png',
      category: ['NextAuth.js', 'Authentication'],
      readTime: '10 min read',
      slug: 'how-nextauth-works',
    },
    {
      title:
        'Built a RAG-based own AI Chatbot',
      description:
        'This blog explains how I built a RAG-based AI chatbot that can answer questions from personal documents like PDFs, notes, and images using LangChain, Chroma DB, Ollama (Llama 3), and Streamlit.',
      date: 'March 07, 2026',
      image: '/blog/ragCover.png',
      category: ['AI', 'ML', 'RAG', 'LLM'],
      slug: 'rag-ai-chatbot',
    },
  ];

  return (
    <section id="blog" className="pt-8 pb-8 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-lg text-neutral-400 font-outfit text-center">
            Latest
          </p>
          <h2 className="text-3xl font-bold text-center font-excon text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Blog Posts
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-[#111111] border border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image */}
              {/* Image Container with Noise Placeholder */}
              <div className="relative w-full h-70 overflow-hidden bg-neutral-900">
                <div
                  className={`absolute inset-0 z-10 transition-opacity duration-700 ${loadedImages.has(index) ? 'opacity-0' : 'opacity-100'
                    } ${[
                      'bg-gradient-to-br from-blue-900/40 via-neutral-900 to-black',
                      'bg-gradient-to-br from-emerald-900/40 via-neutral-900 to-black',
                      'bg-gradient-to-br from-purple-900/40 via-neutral-900 to-black'
                    ][index % 3]}`}
                >
                  <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')]"></div>
                </div>

                <img
                  src={post.image}
                  alt={post.title}
                  className={`w-full h-full object-cover transition-all duration-500 hover:scale-105 ${loadedImages.has(index) ? 'blur-0' : 'blur-md'
                    }`}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between">
                {/* Title */}
                <h3 className="text-lg font-outfit mb-3 hover:text-[#f4f4f4] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Description */}
                <p className="text-sm text-[#909092] leading-relaxed mb-4 font-poppins font-light">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-[#1f1e1e] text-[#909092] text-xs px-3 py-1 rounded-full font-poppins"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-neutral-400 font-outfit mt-auto">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-neutral-300" />
                    {post.date}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="flex items-center text-neutral-400 hover:text-white transition-colors font-medium"
                  >
                    Read More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div
          className="text-center mt-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <SectionButton to="/all-posts" text="Show all blogs" />
        </div>
      </div>
    </section>
  );
};

export default Blog;
