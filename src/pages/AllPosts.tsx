import { useEffect, useState } from 'react';
import { Calendar, ArrowRight, Eye } from 'lucide-react';
import { commentService } from '../lib/supabase';
import { blogPostsData } from '../data/blogs';
import ScrollReveal from '../components/ui/ScrollReveal';
import { LinkPreview } from '../components/ui/LinkPreview';
import CategorySelector from '../components/ui/CategorySelector';

// Blog post descriptions for listing
const blogDescriptions = {
  'the-unspoken-reality-of-tier-3-colleges': "An honest, first-hand perspective on the challenges, misconceptions, and realities faced by students in Tier 3 engineering colleges, and how to build a successful career anyway.",
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
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);



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

  const filteredPosts =
    activeTag === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category.includes(activeTag));

  return (
    <section className="bg-[#0A0A0A] min-h-screen pt-28 md:pt-36 pb-16">
      <div className="max-w-3xl mx-auto w-full px-6">
        <ScrollReveal>
          <div className="text-left mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Blog & Publications
            </h2>
            <p className="text-[#909092] mt-2 font-poppins text-sm md:text-base">
              Exploring the art of engineering, and the journey of building impactful tech.
            </p>
          </div>
        </ScrollReveal>

        <CategorySelector
          tags={tags}
          selectedCategory={activeTag}
          onSelectCategory={setActiveTag}
        />

        <div className="flex flex-col">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <ScrollReveal key={index} delay={index * 0.05} className="w-full">
                <LinkPreview
                  to={`/blog/${post.slug}`}
                  imageSrc={post.image}
                  onHoverChange={(hovered) => setHoveredSlug(hovered ? post.slug : null)}
                  className={`group block py-6 border-b border-neutral-900/40 last:border-b-0 w-full text-left transition-all duration-300 ${hoveredSlug !== null && hoveredSlug !== post.slug
                    ? 'blur-[1px] opacity-60'
                    : 'blur-0 opacity-100'
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
                    {/* Left Column: Info */}
                    <div className="flex-1 space-y-2 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold font-outfit text-white group-hover:text-neutral-200 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[#909092] font-poppins leading-relaxed font-light">
                        {post.description}
                      </p>

                      {/* Tags/Categories & Views */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {post.category.map((cat, i) => (
                          <span
                            key={i}
                            className="bg-[#18181B] text-neutral-400 px-2.5 py-1 rounded-md text-[11px] font-medium font-poppins border border-neutral-800/80"
                          >
                            {cat}
                          </span>
                        ))}
                        <span className="bg-[#18181B] text-neutral-400 px-2.5 py-1 rounded-md text-[11px] font-medium font-poppins border border-neutral-800/80 flex items-center gap-1.5">
                          <Eye size={13} className="text-neutral-400" />
                          <span>{loadingViews ? '...' : `${blogViews[post.slug] || 0} views`}</span>
                        </span>
                      </div>

                      {/* Bottom Footer Line: Date & Mobile-only Read More */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-outfit">
                          <Calendar size={13} className="text-neutral-500" />
                          <span>{post.date}</span>
                        </div>

                        {/* Mobile Read More */}
                        <div className="flex md:hidden items-center gap-1.5 text-sm font-outfit text-neutral-400 group-hover:text-white transition-colors duration-300">
                          <span>Read more</span>
                          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Desktop Read More */}
                    <div className="hidden md:flex items-center shrink-0">
                      <span className="flex items-center gap-1.5 text-sm font-outfit text-neutral-400 group-hover:text-white transition-colors duration-300">
                        Read more <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </LinkPreview>
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
