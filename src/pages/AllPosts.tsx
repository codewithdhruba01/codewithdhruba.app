import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Clock, Eye } from 'lucide-react';
import { commentService } from '../lib/supabase';
import { blogPostsData } from '../data/blogs';
import ScrollReveal from '../components/ui/ScrollReveal';

// Blog post descriptions for listing
const blogDescriptions = {
  'getting-started-with-react-typescript': 'Learn how to set up a new React project with TypeScript and best practices for type safety.',
  'chrome-keyboard-shortcuts': 'Discover the most useful Chrome keyboard shortcuts to browse faster, save time, and increase your daily productivity.',
  'openweather-api-guide': 'Master OpenWeather API with production-ready patterns, advanced integrations, and enterprise-grade implementations.',
  'building-my-first-website-with-react-and-tailwind': 'Learn how I built my Portfolio website from scratch using React and Tailwind CSS — from setup to responsive design, with tips and key takeaways.',
  'essential-linux-commands': 'Learn the most essential Linux commands every beginner and intermediate user must know. This comprehensive guide explains each command in simple terms.',
  'essential-tools-for-nextjs-and-react': 'A curated list of the best UI libraries, icons, animation tools, and utilities to supercharge your Next.js and React development workflow.',
  'rag-ai-chatbot': 'Learn how to build a personalized AI chatbot that answers questions from your own data using RAG, LangChain, and local LLMs.',
};

// Extract simplified blog post data for listing
const blogPosts = Object.entries(blogPostsData).map(([slug, post]) => ({
  title: post.title.replace(/:.*$/, ''), // Remove everything after colon for cleaner titles
  description: blogDescriptions[slug as keyof typeof blogDescriptions] || 'NextAuth.js is a complete open-source authentication solution for Next.js applications. It handles authentication, authorization, and session management',
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

// Distinct gradients for loading placeholders
const placeholderGradients = [
  'bg-gradient-to-br from-blue-900/40 via-neutral-900 to-black',
  'bg-gradient-to-br from-emerald-900/40 via-neutral-900 to-black',
  'bg-gradient-to-br from-purple-900/40 via-neutral-900 to-black',
  'bg-gradient-to-br from-orange-900/40 via-neutral-900 to-black',
  'bg-gradient-to-br from-cyan-900/40 via-neutral-900 to-black',
];

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
    <section className="bg-[#0A0A0A] min-h-screen pt-28 md:pt-36 pb-16">
      <div className="max-w-4xl mx-auto w-full px-6">
        <ScrollReveal>
          <div className="text-left mb-10">
            <h1 className="text-3xl md:text-4xl font-bold font-outfit mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Blog & Publications
            </h1>
            <p className="text-[#909092] mt-2 text-base font-poppins">
              Exploring the art of engineering, and the journey of building impactful tech.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="mt-10 mb-12">
            <div className="flex flex-wrap gap-2.5 justify-start items-center">
              {tags.map((tag, i) => {
                const isActive = activeTag === tag.name;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveTag(tag.name)}
                    className={`pl-4 pr-2.5 py-1.5 text-sm rounded-full font-outfit font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                      ? 'bg-[#E4E4E7] text-[#121214]'
                      : 'bg-[#18181A] hover:bg-[#202024] text-[#909092] hover:text-white'
                      }`}
                  >
                    <span>{tag.name}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-sans font-semibold ${isActive
                        ? 'bg-black/10 text-[#27272A]'
                        : 'bg-[#0F0F10] text-[#52525B]'
                        }`}
                    >
                      {tag.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        <div className="flex flex-col space-y-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <ScrollReveal key={index} delay={index * 0.05} className="group">
                <article className="flex flex-col md:flex-row gap-5 md:gap-8 items-start">
                  {/* Content - 70% width */}
                  <div className="flex-1 order-2 md:order-1 w-full">
                    {/* Date */}
                    <div className="text-neutral-500 text-xs mb-1.5 font-outfit">
                      {post.date}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#f4f4f4] mb-2 font-outfit leading-tight">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="transition-all duration-200 group-hover:bg-[#00DC82]/20 rounded-md px-1 -ml-1"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {/* Description */}
                    <p className="text-[#909092] text-sm leading-relaxed mb-4 font-poppins font-light line-clamp-2">
                      {post.description}
                    </p>

                    {/* Metadata & Tags */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-4 text-xs text-neutral-400 font-outfit">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-[#00DC82]" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye size={15} className="text-[#00DC82]" />
                          {loadingViews ? '...' : `${blogViews[post.slug] || 0} views`}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {post.category.map((cat, i) => (
                          <span
                            key={i}
                            className="bg-[#1e1e1e] text-neutral-500 px-2.5 py-0.5 rounded-md text-[10px] font-medium font-poppins border border-neutral-800"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Image - 30% width */}
                  <div className="w-full md:w-[220px] shrink-0 order-1 md:order-2">
                    <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden rounded-lg border border-neutral-800 aspect-video md:aspect-[4/3]">

                      {/* Gradient Placeholder */}
                      <div
                        className={`absolute inset-0 transition-opacity duration-700 ${loadedImages[post.slug] ? 'opacity-0' : 'opacity-100'
                          } ${placeholderGradients[index % placeholderGradients.length]}`}
                      >
                        {/* Noise/Texture overlay for more realism */}
                        <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.svg')]"></div>
                      </div>

                      {/* Actual Image */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 transform ${loadedImages[post.slug]
                          ? 'opacity-100 scale-100 blur-0'
                          : 'opacity-0 scale-110 blur-xl'
                          }`}
                        onLoad={() => handleImageLoad(post.slug)}
                      />
                    </Link>
                  </div>
                </article>

                {/* Separator Line (except for last item) */}
                {index !== filteredPosts.length - 1 && (
                  <div className="border-t border-dashed border-neutral-800 mt-8"></div>
                )}
              </ScrollReveal>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center py-20 text-lg">
              No posts found for "{activeTag}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
