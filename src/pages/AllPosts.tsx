import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Getting Started with React and TypeScript",
    description:
      "Learn how to set up a new React project with TypeScript and best practices for type safety.",
    date: "March 15, 2024",
    image: "/blog/thumbnails/blog2.png",
    category: ["Development"],
    readTime: "5 min read",
    slug: "getting-started-with-react-typescript",
  },
  {
    title: "Getting Started with Visual Studio Code: The Complete Guide",
    description:
      "A complete beginner guide to using Visual Studio Code, the world’s most popular code editor.",
    date: "July 2, 2025",
    image: "/blog/thumbnails/blog1.png",
    category: ["Development Tools"],
    readTime: "8 min read",
    slug: "getting-started-with-vs-code",
  },
  {
    title: "Mastering Python Packages: Organize and Share Your Code",
    description:
      "Understand how Python packages work, how to create them, and how to share your code with the world.",
    date: "July 2, 2025",
    image: "/blog/thumbnails/blog-python-packages.jpg",
    category: ["Python Programming"],
    readTime: "7 min read",
    slug: "understanding-python-packages",
  },
];

const tags = [
  { name: "All", count: blogPosts.length },
  { name: "Development", count: 1 },
  { name: "Development Tools", count: 1 },
  { name: "Python Programming", count: 1 },
];

const AllPosts = () => {
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter blogs based on tag
  const filteredPosts =
    activeTag === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category.includes(activeTag));

  return (
    <section className="py-20 bg-neutral-950 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <h1 className="text-5xl font-bold text-center text-white font-excon">
          Blog & Publications
        </h1>

        {/* Subline */}
        <p className="text-center text-gray-400 mt-4 font-poppins text-lg">
          Exploring the art of engineering, the craft of code, and the journey of building impactful tech.
        </p>

        {/* Popular Tags */}
        <div className="mt-10 mb-12">
          <p className="text-lg md:text-lg font-semibold font-synonym mb-4">
            Popular Tags
          </p>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <button
                key={i}
                onClick={() => setActiveTag(tag.name)}
                className={`px-4 py-2 text-sm rounded-full font-outfit ${
                  activeTag === tag.name
                    ? "bg-gradient-to-r from-green-600 to-green-900 text-white"
                    : "border-neutral-800 text-gray-300 bg-neutral-900 hover:bg-neutral-800"
                } transition`}
              >
                {tag.name}{" "}
                <span className="text-gray-100">({tag.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <article
                key={index}
                className="bg-[#141414] border border-neutral-800 rounded-2xl overflow-hidden hover:shadow-[0_0_20px_rgba(0,220,130,0.25)] hover:-translate-y-2 transition-all duration-300 w-full max-w-[360px] mx-auto"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date + read time */}
                  <div className="flex items-center text-sm text-gray-400 mb-3 gap-4">
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
                  <h3 className="text-lg font-semibold mb-3 hover:text-[#00DC82] transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.category.map((cat, i) => (
                      <span
                        key={i}
                        className="bg-neutral-800 text-gray-300 text-xs px-3 py-1 rounded-full font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 leading-relaxed mb-4 font-poppins">
                    {post.description}
                  </p>

                  {/* Read More */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-[#00DC82] hover:text-white transition-colors text-sm font-medium font-outfit"
                  >
                    Read More
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No posts found for "{activeTag}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
