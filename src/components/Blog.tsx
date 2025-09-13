import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Getting Started with React and TypeScript',
      description:
        'Learn how to set up a new React project with TypeScript and best practices for type safety.',
      date: 'March 15, 2025',
      image: '/blog/thumbnails/blog2.jpg',
      category: ['Development'],
      readTime: '5 min read',
      slug: 'getting-started-with-react-typescript',
    },
    {
      title: 'Getting Started with Visual Studio Code: The Complete Guide',
      description:
        'A complete beginner guide to using Visual Studio Code, the world’s most popular code editor.',
      date: 'July 2, 2025',
      image: '/blog/thumbnails/blog-vs-code.png',
      category: ['Development Tools'],
      readTime: '8 min read',
      slug: 'getting-started-with-vs-code',
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
        <div className="grid md:grid-cols-2 gap-10">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-[#141414]  rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,220,130,0.2)] hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover border-b border-neutral-800"
              />

              {/* Content */}
              <div className="p-8">
                {/* Date + read time */}
                <div className="flex items-center text-sm text-gray-400 mb-4 gap-4">
                  <span className="flex items-center gap-1 font-outfit text-slate-400">
                    <Calendar size={16} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1 font-outfit text-slate-400">
                    <Clock size={16} />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 hover:text-[#00DC82] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-[#08350ee0] text-[#00DC82] text-xs px-3 py-1 rounded-full font-poppins"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-base text-neutral-400 leading-relaxed mb-3 font-poppins">
                  {post.description}
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#029155] hover:text-white transition-colors text-base font-medium font-outfit"
                >
                  Read More
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View all button */}
        <div
          className="text-center mt-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Link
            to="/all-posts"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#00DC82] text-[#00DC82] font-outfit font-bold rounded-lg hover:bg-[#00DC82] hover:text-black transition-all duration-300"
          >
            View All Posts
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;