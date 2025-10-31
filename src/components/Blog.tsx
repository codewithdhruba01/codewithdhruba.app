import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Getting Started with React project with TypeScript',
      description:
        'Learn how to set up a new React project with TypeScript and best practices for type safety.',
      date: 'March 15, 2025',
      image: '/blog/blog2.png',
      category: ['React', 'Setting', 'Setup'],
      slug: 'getting-started-with-react-typescript',
    },
    {
      title:
        'Building My First Website from Scratch with React and Tailwind CSS',
      description:
        'Learn how I built my first website from scratch using React and Tailwind CSS — from setup to responsive design, with tips and key takeaways.',
      date: 'July 2, 2025',
      image: '/blog/blog3.png',
      category: ['Development', 'Setup'],
      slug: 'building-my-first-website-with-react-and-tailwind',
    },
  ];

  return (
    <section id="blog" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl font-bold mb-12 text-center font-synonym"
          data-aos="fade-up"
        >
          Latest Blog Posts
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-70 object-cover rounded-t-2xl"
              />

              {/* Content */}
              <div className="p-6 flex flex-col justify-between">
                {/* Title */}
                <h3 className="text-lg font-supreme mb-3 hover:text-[#ffffff] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-4 font-poppins font-light">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-[#242424] text-neutral-300 text-xs px-3 py-1 rounded-full font-poppins"
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
                    className="flex items-center text-[#00DC82] hover:text-white transition-colors font-medium"
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
          <Link
            to="/all-posts"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#00DC82] text-[#00DC82] font-outfit font-bold rounded-lg hover:bg-[#00DC82] hover:text-black transition-all duration-300"
          >
            Show all blogs
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
