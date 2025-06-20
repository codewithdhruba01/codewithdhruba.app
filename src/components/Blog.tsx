import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: 'Getting Started with React and TypeScript',
      description: 'Learn how to set up a new React project with TypeScript and best practices for type safety.',
      date: 'March 15, 2024',
      image: './src/assets/blog/blog2.jpg',
      category: 'Development',
      readTime: '5 min read',
      slug: 'getting-started-with-react-typescript'
    },
    {
      title: 'Optimizing Neural Networks for Edge Devices',
      description: 'Learn about various techniques to optimize neural networks for deployment on edge devices.',
      date: 'March 20, 2024',
      image: './src/assets/blog/blog3.jpg',
      category: 'Machine Learning',
      readTime: '8 min read',
      slug: 'optimizing-neural-networks-edge-devices'
    }
  ];

  return (
    <section id="blog" className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          Latest Blog Posts
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <article 
              key={index}
              className="bg-[#0A0A0A] rounded-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
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
                <p className="text-gray-300 mb-4 line-clamp-2">
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
        <div 
          className="text-center mt-12"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Link 
            to="/blog"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#00DC82] text-[#00DC82] rounded-lg hover:bg-[#00DC82] hover:text-black transition-all duration-300"
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