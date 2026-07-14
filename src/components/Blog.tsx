import { Calendar, ArrowRight } from 'lucide-react';
import { SectionButton } from './ui/SectionButton';
import ScrollReveal from './ui/ScrollReveal';
import { blogPostsData } from '../data/blogs';
import { LinkPreview } from './ui/LinkPreview';

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

const blogPosts = Object.entries(blogPostsData).map(([slug, post]) => ({
  title: post.title.replace(/:.*$/, ''), // Remove everything after colon for cleaner titles
  description: blogDescriptions[slug as keyof typeof blogDescriptions] || 'NextAuth.js is a complete open-source authentication solution for Next.js applications.',
  date: post.date,
  slug: slug,
  image: post.image,
}));

const Blog = () => {
  return (
    <section id="blog" className="pt-8 pb-8 bg-neutral-950">
      <div className="max-w-3xl mx-auto w-full px-6">
        <ScrollReveal className="mb-2">
          <h4 className="text-2xl md:text-2xl font-extrabold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-hanken">
            Blog
          </h4>
        </ScrollReveal>

        <div className="flex flex-col">
          {blogPosts.slice(0, 3).map((post, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className="w-full"
            >
              <LinkPreview
                to={`/blog/${post.slug}`}
                imageSrc={post.image}
                className="group block py-6 border-b border-neutral-900/60 last:border-b-0"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Left Column: Info */}
                  <div className="flex-1 space-y-2 min-w-0">
                    <h3 className="text-lg font-bold font-outfit text-white group-hover:text-neutral-200 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-[#909092] font-poppins leading-relaxed font-light">
                      {post.description}
                    </p>

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

                  {/* Desktop Read More */}
                  <div className="hidden md:flex items-center shrink-0">
                    <span className="flex items-center gap-1.5 text-sm font-outfit text-neutral-400 group-hover:text-white transition-colors duration-300">
                      Read more <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </LinkPreview>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          className="text-center mt-12"
          delay={0.3}
        >
          <SectionButton to="/all-posts" text="Show all blogs" />
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Blog;
