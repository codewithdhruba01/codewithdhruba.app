import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const blogPosts = [
  {
    title: 'Getting Started with React and TypeScript',
    description:
      'Learn how to set up a new React project with TypeScript and best practices for type safety.',
    date: 'March 15, 2024',
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
  {
    title: 'Mastering Python Packages: Organize and Share Your Code',
    description:
      'Understand how Python packages work, how to create them, and how to share your code with the world.',
    date: 'July 2, 2025',
    image: '/blog/thumbnails/blog-python-packages.jpg',
    category: ['Python Programming'],
    readTime: '7 min read',
    slug: 'understanding-python-packages',
  },
];

const AllPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="py-20 bg-neutral-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold text-center mb-12 text-white font-excon py-5" data-aos="fade-up">
          Blog & Publications
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,220,130,0.2)] hover:-translate-y-2 transition-all duration-300"
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
                  <span className="flex items-center gap-1">
                    <Calendar size={16} className="text-[#00DC82]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} className="text-[#00DC82]" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4 hover:text-[#00DC82] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-neutral-800 text-gray-300 text-xs px-3 py-1 rounded-full font-bold"
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
                  className="inline-flex items-center text-[#00DC82] hover:text-white transition-colors text-base font-medium font-outfit"
                >
                  Read More
                  <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
