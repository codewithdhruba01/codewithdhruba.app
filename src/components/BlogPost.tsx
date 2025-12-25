import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Undo2,
  Heart,
  Loader2,
  ThumbsUp,
  Calendar,
  Share2,
} from 'lucide-react';
import GiscusComments from './GiscusComments';
import ShareModal from './modals/ShareModal';
import { useBlogReactions } from '../hooks/useBlogReactions';
import { commentService } from '../lib/supabase';

// Prism.js imports for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-docker';

import { blogPostsData } from '../data/blogs';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contentLoaded, setContentLoaded] = useState<boolean>(false);

  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  // Blog reactions hook
  const {
    blogLoves,
    userHasLoved,
    lovingBlog,
    blogLikes,
    userHasLiked,
    likingBlog,
    blogReactionsError,
    handleBlogLove,
    handleBlogLike,
  } = useBlogReactions(slug);


  const enhanceCodeBlocks = () => {

    const preElements = document.querySelectorAll('pre:not(.code-enhanced)');

    preElements.forEach((pre) => {
      const preElement = pre as HTMLElement;


      preElement.classList.add('code-enhanced');


      const codeElement = preElement.querySelector('code');
      if (!codeElement) return;


      const languageClass = Array.from(codeElement.classList).find(cls =>
        cls.startsWith('language-')
      );
      const language = languageClass ? languageClass.replace('language-', '') : 'text';


      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper-modern';
      wrapper.setAttribute('data-language', language);


      const header = document.createElement('div');
      header.className = 'code-header';

      const languageLabel = document.createElement('span');
      languageLabel.className = 'code-language';
      languageLabel.textContent = language.toUpperCase();

      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn-modern';
      copyButton.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
          <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
      `;

      copyButton.onclick = () => {
        const codeText = codeElement.textContent || '';
        navigator.clipboard.writeText(codeText).then(() => {
          // Show success state
          const copyIcon = copyButton.querySelector('.copy-icon') as HTMLElement;
          const checkIcon = copyButton.querySelector('.check-icon') as HTMLElement;

          if (copyIcon && checkIcon) {
            copyIcon.style.display = 'none';
            checkIcon.style.display = 'block';
            copyButton.classList.add('copied');

            setTimeout(() => {
              copyIcon.style.display = 'block';
              checkIcon.style.display = 'none';
              copyButton.classList.remove('copied');
            }, 2000);
          }
        });
      };

      header.appendChild(languageLabel);
      header.appendChild(copyButton);

      // Wrap the pre element
      preElement.parentNode?.insertBefore(wrapper, preElement);
      wrapper.appendChild(header);
      wrapper.appendChild(preElement);

      // Apply Prism.js highlighting
      Prism.highlightElement(codeElement);
    });
  };

  useEffect(() => {
    // Smooth scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simulate loading time for smooth animation
    const loadTimer = setTimeout(() => {
      if (slug && blogPostsData[slug as keyof typeof blogPostsData]) {
        setPost(blogPostsData[slug as keyof typeof blogPostsData]);
        setIsLoading(false);
        incrementBlogViews();
      }
    }, 300); // Small delay for smooth transition

    return () => clearTimeout(loadTimer);
  }, [slug]);

  // Enhance code blocks after content is rendered
  useEffect(() => {
    if (post) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        enhanceCodeBlocks();
        // Trigger content animation after code blocks are enhanced
        setTimeout(() => setContentLoaded(true), 200);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [post]);

  const incrementBlogViews = async () => {
    if (!slug) return;
    try {
      await commentService.incrementBlogViews(slug);
    } catch { }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <article className="py-20 px-4 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto py-10 mb-8">
        {/* Back button skeleton */}
        <div className="mb-8">
          <div className="inline-flex items-center text-gray-400">
            <div className="h-4 w-4 bg-gray-600 rounded mr-2 animate-shimmer"></div>
            <div className="h-4 w-20 bg-gray-600 rounded animate-shimmer"></div>
          </div>
        </div>

        {/* Header skeleton */}
        <header className="mb-12">
          <div className="flex items-center text-gray-400 mb-8">
            <div className="w-10 h-10 bg-gray-600 rounded-full mr-4 animate-shimmer"></div>
            <div>
              <div className="h-5 w-32 bg-gray-600 rounded mb-1 animate-shimmer"></div>
              <div className="h-4 w-24 bg-gray-600 rounded animate-shimmer"></div>
            </div>
          </div>
        </header>

        {/* Image skeleton */}
        <div className="mb-6">
          <div className="w-full h-64 bg-gray-600 rounded-2xl animate-shimmer"></div>
        </div>

        {/* Category skeleton */}
        <div className="mb-6">
          <div className="h-6 w-24 bg-gray-600 rounded-full animate-shimmer"></div>
        </div>

        {/* Title skeleton */}
        <div className="mb-6">
          <div className="h-10 w-3/4 bg-gray-600 rounded mb-2 animate-shimmer"></div>
          <div className="h-10 w-1/2 bg-gray-600 rounded animate-shimmer"></div>
        </div>

        {/* Meta info skeleton */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-600 rounded animate-shimmer"></div>
            <div className="h-4 w-16 bg-gray-600 rounded animate-shimmer"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-20 bg-gray-600 rounded-full animate-shimmer"></div>
            <div className="h-8 w-20 bg-gray-600 rounded-full animate-shimmer"></div>
            <div className="h-8 w-20 bg-gray-600 rounded-full animate-shimmer"></div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-600 rounded animate-shimmer"></div>
          <div className="h-4 w-5/6 bg-gray-600 rounded animate-shimmer"></div>
          <div className="h-4 w-4/5 bg-gray-600 rounded animate-shimmer"></div>
          <div className="h-4 w-full bg-gray-600 rounded animate-shimmer"></div>
          <div className="h-4 w-3/4 bg-gray-600 rounded animate-shimmer"></div>
          <div className="h-4 w-4/6 bg-gray-600 rounded animate-shimmer"></div>
          <div className="h-4 w-full bg-gray-600 rounded animate-shimmer"></div>
        </div>

        {/* Comments skeleton */}
        <div className="mt-12 space-y-4">
          <div className="h-6 w-32 bg-gray-600 rounded animate-shimmer"></div>
          <div className="h-32 w-full bg-gray-600 rounded animate-shimmer"></div>
        </div>
      </div>
    </article>
  );

  if (isLoading || !post) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <article className={`py-20 px-4 transition-all duration-700 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-4xl mx-auto py-10 mb-8">
          {/* Back */}
          <div className={`mb-8 transition-all duration-500 delay-100 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <a
              href="/all-posts"
              className="inline-flex items-center text-gray-400 hover:text-white transition"
            >
              <Undo2 className="h-4 w-4 mr-2" />
              Back to Blog
            </a>
          </div>

          {/* Header */}
          <header className={`mb-12 transition-all duration-500 delay-200 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>

            <div className="flex items-center text-gray-400 mb-8">
              <img
                src="https://avatars.githubusercontent.com/u/146111647?v=4"
                alt={post.author}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="text-white font-bold">{post.author}</div>
                <div className="text-sm text-neutral-400">{post.readTime}</div>
              </div>
            </div>
          </header>

          {/* Image */}
          <div className={`mb-6 transition-all duration-500 delay-300 ${contentLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full"
              style={{
                maxHeight: '500px',
                objectFit: 'contain',
                borderRadius: '16px'
              }}
            />
          </div>
          <div className={`mb-6 transition-all duration-500 delay-400 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <span className="bg-[#1e1e1e] text-neutral-300 px-3 py-1 font-outfit rounded-full text-sm">
              {post.category}
            </span>
          </div>

          <div className={`mb-6 transition-all duration-500 delay-500 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-3xl md:text-4xl font-pally text-white leading-tight">
              {post.title}
            </h1>
          </div>

          <div className={`mb-10 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-400 transition-all duration-500 delay-600 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBlogLove}
                disabled={userHasLoved || lovingBlog}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition ${userHasLoved
                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-red-500/10'
                  }`}
              >
                <Heart
                  className={`h-4 w-4 ${userHasLoved ? 'fill-red-400 text-red-400' : ''
                    }`}
                />
                <span>{blogLoves}</span>
              </button>
              <button
                onClick={handleBlogLike}
                disabled={userHasLiked || likingBlog}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition ${userHasLiked
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-blue-500/10'
                  }`}
              >
                <ThumbsUp
                  className={`h-4 w-4 ${userHasLiked ? 'fill-blue-400 text-blue-400' : ''
                    }`}
                />
                <span>{blogLikes}</span>
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <Share2 className="h-4 w-4 text-purple-400" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className={`prose prose-sm md:prose-base lg:prose-lg font-poppins prose-invert max-w-none text-neutral-400 transition-all duration-500 delay-700 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className={`mt-12 pt-8 border-t font-outfit border-gray-800 transition-all duration-500 delay-800 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-[#1a1919] text-neutral-400 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Reactions */}
          <div className={`mt-12 flex items-center justify-center space-x-4 transition-all duration-500 delay-900 ${contentLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {blogReactionsError && (
              <p className="text-red-400 text-sm mb-4">{blogReactionsError}</p>
            )}

            <button
              onClick={handleBlogLove}
              disabled={userHasLoved || lovingBlog}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition
              ${userHasLoved
                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-red-500/10'
                }`}
            >
              {lovingBlog ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Heart
                  className={`h-4 w-4 ${userHasLoved ? 'fill-red-400 text-red-400' : ''
                    }`}
                />
              )}
              <span>{blogLoves}</span>
            </button>

            <button
              onClick={handleBlogLike}
              disabled={userHasLiked || likingBlog}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border transition
              ${userHasLiked
                  ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                  : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-blue-500/10'
                }`}
            >
              {likingBlog ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ThumbsUp
                  className={`h-4 w-4 ${userHasLiked ? 'fill-blue-400 text-blue-400' : ''
                    }`}
                />
              )}
              <span>{blogLikes}</span>
            </button>
          </div>

          {/* Comments */}
          <div className={`transition-all duration-500 delay-1000 ${contentLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <GiscusComments slug={slug || ''} />
          </div>
        </div>
      </article>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title={post?.title || ''}
        slug={slug || ''}
      />
    </>
  );
};
export default BlogPost;
