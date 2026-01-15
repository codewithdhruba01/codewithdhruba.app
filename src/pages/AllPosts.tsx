import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Clock, ArrowRight, Eye } from 'lucide-react';
import { commentService } from '../lib/supabase';
import { blogPostsData } from '../data/blogs';

// Blog post descriptions for listing
const blogDescriptions = {
  'getting-started-with-react-typescript': 'Learn how to set up a new React project with TypeScript and best practices for type safety.',
  'chrome-keyboard-shortcuts': 'Discover the most useful Chrome keyboard shortcuts to browse faster, save time, and increase your daily productivity.',
  'openweather-api-guide': 'Master OpenWeather API with production-ready patterns, advanced integrations, and enterprise-grade implementations.',
  'building-my-first-website-with-react-and-tailwind': 'Learn how I built my Portfolio website from scratch using React and Tailwind CSS — from setup to responsive design, with tips and key takeaways.',
  'essential-linux-commands': 'Learn the most essential Linux commands every beginner and intermediate user must know. This comprehensive guide explains each command in simple terms.',
};

// Extract simplified blog post data for listing
const blogPosts = Object.entries(blogPostsData).map(([slug, post]) => ({
  title: post.title.replace(/:.*$/, ''), // Remove everything after colon for cleaner titles
  description: blogDescriptions[slug as keyof typeof blogDescriptions] || 'Read this interesting blog post about web development.',
  date: post.date,
  image: post.image,
  category: [post.category], // Convert single category to array
  readTime: post.readTime,
  slug: slug,
}));

// Calculate tag counts dynamically
const calculateTagCounts = () => {
  const tagCounts: Record<string, number> = {};

  blogPosts.forEach(post => {
    post.category.forEach(cat => {
      tagCounts[cat] = (tagCounts[cat] || 0) + 1;
    });
  });

  return [
    { name: 'All', count: blogPosts.length },
    ...Object.entries(tagCounts).map(([name, count]) => ({ name, count }))
  ];
};

const tags = calculateTagCounts();

const AllPosts = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [blogViews, setBlogViews] = useState<Record<string, number>>({});
  const [loadingViews, setLoadingViews] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBlogViews();
  }, []);

  const loadBlogViews = async () => {
    try {
      setLoadingViews(true);
      const viewsData: Record<string, number> = {};

      // Load views for all blog posts
      await Promise.all(
        blogPosts.map(async (post) => {
          try {
            const views = await commentService.getBlogViews(post.slug);
            viewsData[post.slug] = views;
          } catch (error) {
            console.warn(`Error loading views for ${post.slug}:`, error);
            viewsData[post.slug] = 0;
          }
        })
      );

      setBlogViews(viewsData);
    } catch (error) {
      console.error('Error loading blog views:', error);
    } finally {
      setLoadingViews(false);
    }
  };

  const handleImageLoad = (slug: string) => {
    setLoadedImages(prev => ({ ...prev, [slug]: true }));
  };

  const filteredPosts =
    activeTag === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category.includes(activeTag));

  return (
    <section className="py-20 bg-neutral-950 min-h-screen" data-aos="fade-up">
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
                className={`px-4 py-2 text-sm rounded-full font-outfit ${activeTag === tag.name
                  ? 'bg-gradient-to-r from-green-600 to-green-900 text-white'
                  : 'border-neutral-800 text-gray-300 bg-neutral-900'
                  }`}
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
                className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden w-full max-w-[360px] mx-auto"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                      loadedImages[post.slug] ? 'blur-0' : 'blur-md'
                    }`}
                    onLoad={() => handleImageLoad(post.slug)}
                  />
                </div>

                <div className="p-6">
                  {/* Views + read time */}
                  <div className="flex items-center text-sm text-neutral-400 font-outfit mb-3 gap-4">
                    <span className="flex items-center gap-1">
                      <Eye size={17} style={{ color: '#00DC82' }} />
                      {loadingViews ? '...' : `${blogViews[post.slug] || 0} views`}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} style={{ color: '#00DC82' }} />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-outfit font-semibold mb-3">
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
                    className="inline-flex items-center text-[#00DC82] text-sm font-medium font-outfit"
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
