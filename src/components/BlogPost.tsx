import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Mock blog post data - In a real application, this would come from an API
const blogPostsData = {
  'getting-started-with-react-typescript': {
    title: 'Getting Started with React and TypeScript',
    date: 'March 15, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Development',
    readTime: '5 min read',
    content: `
      <h2>Introduction</h2>
      <p>TypeScript has become an essential tool in modern React development...</p>
      
      <h2>Setting Up Your Development Environment</h2>
      <p>First, ensure you have Node.js installed on your system...</p>
      
      <h2>Creating a New React TypeScript Project</h2>
      <p>You can create a new React TypeScript project using Create React App...</p>
      
      <h2>Basic TypeScript Concepts for React</h2>
      <p>Let's explore some fundamental TypeScript concepts that you'll use frequently in React development...</p>
      
      <h2>Conclusion</h2>
      <p>TypeScript brings many benefits to React development, including better tooling support and catch errors early...</p>
    `,
    image: 'https://via.placeholder.com/1200x600',
    tags: ['React', 'TypeScript', 'Web Development']
  },
  'optimizing-neural-networks-edge-devices': {
    title: 'Optimizing Neural Networks for Edge Devices',
    date: 'March 20, 2025',
    author: 'Dhrubaraj Pati',
    category: 'Machine Learning',
    readTime: '8 min read',
    content: `
      <h2>Introduction to Edge AI</h2>
      <p>Edge AI is revolutionizing how we deploy machine learning models by bringing computation closer to where data is generated...</p>
      
      <h2>Challenges in Edge Deployment</h2>
      <p>Deploying neural networks on edge devices presents unique challenges due to limited computational resources and power constraints...</p>
      
      <h2>Optimization Techniques</h2>
      <p>Several techniques can be employed to optimize neural networks for edge deployment:</p>
      <ul>
        <li>Model Quantization</li>
        <li>Network Pruning</li>
        <li>Knowledge Distillation</li>
        <li>Architecture Optimization</li>
      </ul>
      
      <h2>Implementation Examples</h2>
      <p>Let's look at some practical examples of implementing these optimization techniques...</p>
      
      <h2>Performance Metrics</h2>
      <p>We'll examine how these optimizations affect model performance and resource utilization...</p>
      
      <h2>Best Practices and Future Directions</h2>
      <p>Here are some best practices to follow when optimizing neural networks for edge devices...</p>
    `,
    image: 'https://via.placeholder.com/1200x600',
    tags: ['Machine Learning', 'Edge Computing', 'Neural Networks', 'Optimization']
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    // In a real application, you would fetch the blog post data from an API
    if (slug && blogPostsData[slug as keyof typeof blogPostsData]) {
      setPost(blogPostsData[slug as keyof typeof blogPostsData]);
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <a href="/blog" className="text-[#00DC82] hover:text-white transition-colors">
            Return to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12" data-aos="fade-up">
          <div className="mb-6">
            <span className="bg-[#00DC82] text-black px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center text-gray-400 mb-8">
            <img
              src="https://via.placeholder.com/40x40"
              alt={post.author}
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              <div className="font-medium text-white">{post.author}</div>
              <div className="text-sm">
                {post.date} · {post.readTime}
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-12" data-aos="fade-up">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div 
          className="prose prose-lg prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          data-aos="fade-up"
        />

        {/* Tags */}
        <div className="mt-12 pt-8 border-t border-gray-800" data-aos="fade-up">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-[#111111] text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 flex items-center justify-between" data-aos="fade-up">
          <div className="text-gray-400">Share this article:</div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-[#00DC82] transition-colors">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#00DC82] transition-colors">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-[#00DC82] transition-colors">
              <i className="fab fa-facebook text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;