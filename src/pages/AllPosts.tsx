import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    title: 'Getting Started with React and TypeScript',
    description:
      'Learn how to set up a new React project with TypeScript and best practices for type safety.',
    date: 'March 15, 2024',
    image: '/blog/blog2.png',
    category: ['Development'],
    readTime: '5 min read',
    slug: 'getting-started-with-react-typescript',
  },
  {
    title: '10 Chrome Keyboard Shortcuts to Boost Your Productivity',
    description:
      'Discover the most useful Chrome keyboard shortcuts to browse faster, save time, and increase your daily productivity.',
    date: 'July 2, 2025',
    image: '/blog/chrome_shortcuts.png',
    category: ['Productivity & Tech Tips'],
    readTime: '5 min read',
    slug: 'chrome-keyboard-shortcuts',
  },
  {
    title:
      'The Ultimate Guide to OpenWeather API: Features, API Key Generation & Integration',
    description:
      'The OpenWeather API is one of the most popular and reliable weather data services available.',
    date: 'Oct 8, 2025',
    image: '/blog/OpenWeather.png',
    category: ['Tools', 'API'],
    readTime: '15 min read',
    slug: 'openweather-api-guide',
  },
  {
    title: 'Building My First Website from Scratch with React and Tailwind CSS',
    description:
      'Learn how I built my first website from scratch using React and Tailwind CSS — from setup to responsive design, with tips and key takeaways.',
    date: 'Oct 10, 2025',
    image: '/blog/blog3.png',
    category: ['Development', 'Setup'],
    readTime: '5 min read',
    slug: 'building-my-first-website-with-react-and-tailwind',
  },
  {
    title: 'Essential Linux Commands: A Comprehensive Guide',
    description:
      'Learn the most essential Linux commands every beginner and intermediate user must know. This comprehensive guide explains each command in simple,',
    date: 'Dec 8, 2025',
    image: '/blog/linux_commands.png',
    category: ['CLI', 'Devlopment', 'Terminal'],
    readTime: '10 min read',
    slug: 'essential-linux-commands',
  },
];

const tags = [
  { name: 'All', count: blogPosts.length },
  { name: 'Development', count: 1 },
  { name: 'Tools', count: 2 },
  { name: 'Productivity & Tech Tips', count: 1 },
];

const AllPosts = () => {
  const [activeTag, setActiveTag] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPosts =
    activeTag === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category.includes(activeTag));

  return (
    <section className="py-20 bg-neutral-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold font-excon mb-4">
            Blog & Publications
          </h1>
          <p className="text-gray-400 mt-2 text-base sm:text-lg font-poppins">
            Exploring the art of engineering, the craft of code, and the journey
            of building impactful tech.
          </p>
        </div>

        <div className="border-t border-gray-700 max-w-3xl mx-auto mb-8"></div>

        <div className="mt-10 mb-12">
          <div className="flex flex-wrap gap-3 text-center justify-center">
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => setActiveTag(tag.name)}
                className={`px-4 py-2 text-sm rounded-full font-outfit ${
                  activeTag === tag.name
                    ? 'bg-gradient-to-r from-green-600 to-green-900 text-white'
                    : 'border-neutral-800 text-gray-300 bg-neutral-900 hover:bg-neutral-800'
                } transition`}
              >
                {tag.name} <span className="text-gray-100">({tag.count})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <article
                key={index}
                className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,220,130,0.25)] hover:-translate-y-2 transition-all duration-300 w-full max-w-[360px] mx-auto"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date + read time */}
                  <div className="flex items-center text-sm text-neutral-400 font-outfit mb-3 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} className="text-neutral-300" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} className="text-neutral-300" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-outfit font-semibold mb-3 hover:text-[#ffffff] transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.category.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-[#1e1e1e] text-neutral-300 font-poppins text-xs px-3 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4 font-poppins font-light">
                    {post.description}
                  </p>

                  {/* Read More */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#00DC82] hover:text-white transition-colors text-sm font-medium font-outfit"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No posts found for "{activeTag}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
