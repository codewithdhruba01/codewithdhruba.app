import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Getting Started with React project with TypeScript",
      description:
        "Learn how to set up a new React project with TypeScript and best practices for type safety.",
      date: "March 15, 2025",
      image: "/blog/blog2.png",
      category: ["React", "Setting", "Setup"],
      slug: "getting-started-with-react-typescript",
    },
    {
      title: "Getting Started with Visual Studio Code: The Complete Guide",
      description:
        "A complete beginner guide to using Visual Studio Code, the world’s most popular code editor.",
      date: "July 2, 2025",
      image: "/blog/blog1.png",
      category: ["Editor", "development"],
      slug: "getting-started-with-vs-code",
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
                <h3 className="text-lg font-semibold mb-2 text-white hover:text-[#00DC82] transition-colors">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.category.map((cat, i) => (
                    <span
                      key={i}
                      className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-zinc-500 mt-auto">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
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
            Show all blogs
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog;
