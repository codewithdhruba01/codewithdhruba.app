import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const blogPosts = [
  {
    title: 'Getting Started with React and TypeScript',
    description:
      'Learn how to set up a new React project with TypeScript and best practices for type safety.',
    date: 'March 15, 2024',
    image: '/blog/thumbnails/blog2.jpg',
    category: 'Development',
    readTime: '5 min read',
    slug: 'getting-started-with-react-typescript'
  },
  {
  title: 'Getting Started with Visual Studio Code: The Complete Guide',
  description: 'A complete beginner guide to using Visual Studio Code, the world’s most popular code editor.',
  date: 'July 2, 2025',
  image: '/blog/thumbnails/blog-vs-code.png',
  category: 'Development Tools',
  readTime: '8 min read',
  slug: 'getting-started-with-vs-code'
},
  {
    title: 'Mastering Python Packages: Organize and Share Your Code',
    description:
      'Understand how Python packages work, how to create them, and how to share your code with the world.',
    date: 'July 2, 2025',
    image: '/blog/thumbnails/blog-python-packages.jpg',
    category: 'Python Programming',
    readTime: '7 min read',
    slug: 'understanding-python-packages'
  }
];

const AllPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to top when page loads
  }, []);
  return (
    <section className="py-20 bg-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-12 text-white">Blog Posts</h1>
        <div className="grid md:grid-cols-2 gap-10">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-[#0A0A0A] rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#00DC82] text-black px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 hover:text-[#00DC82] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-neutral-400 mb-6 leading-relaxed">
                  {post.description}
                </p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center text-[#00DC82] hover:text-white transition-colors"
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
