import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  X,
} from 'lucide-react';
import GiscusComments from './ui/GiscusComments';
import ShareModal from './modals/ShareModal';
import { useBlogReactions } from '../hooks/useBlogReactions';
import { commentService } from '../lib/supabase';
import LoveReactionButton from './ui/LoveReactionButton';
import ReadingProgressPill from './ui/ReadingProgressPill';
import Subscribe from './ui/Subscribe';
import ZoomControls from './ui/ZoomControls';
import BlogReactions from './ui/BlogReactions';

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

const BlogContent = () => {
  const { slug } = useParams();
  const post = slug ? blogPostsData[slug as keyof typeof blogPostsData] : null;

  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  // Font size zoom functionality
  const [fontSize, setFontSize] = useState<number>(100); // percentage
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);


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

      const copyButton = document.createElement('button');
      copyButton.className = 'code-copy-btn-modern';
      copyButton.title = 'Copy Code';
      copyButton.innerHTML = `
        <svg class="copy-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="display: none; color: #22c55e;">
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

      // Wrap the pre element
      preElement.parentNode?.insertBefore(wrapper, preElement);
      wrapper.appendChild(copyButton);
      wrapper.appendChild(preElement);

      // Apply Prism.js highlighting
      Prism.highlightElement(codeElement);
    });
  };

  const enhanceImages = () => {
    const images = document.querySelectorAll('.prose img:not(.image-enhanced)');
    images.forEach((img) => {
      const imgElement = img as HTMLImageElement;
      imgElement.classList.add('image-enhanced', 'cursor-zoom-in');

      const wrapper = document.createElement('div');
      wrapper.className = 'blog-image-wrapper-modern';

      imgElement.parentNode?.insertBefore(wrapper, imgElement);
      wrapper.appendChild(imgElement);

      imgElement.onclick = () => {
        setActiveImage({
          src: imgElement.src,
          alt: imgElement.alt || 'Blog Image Preview'
        });
      };
    });
  };

  useEffect(() => {
    // Reset scroll to top instantly
    window.scrollTo(0, 0);

    if (slug && blogPostsData[slug as keyof typeof blogPostsData]) {
      incrementBlogViews();
    }
  }, [slug]);

  // Enhance code blocks and images after content is rendered
  useEffect(() => {
    if (post) {
      enhanceCodeBlocks();
      enhanceImages();
    }
  }, [post]);

  const incrementBlogViews = async () => {
    if (!slug) return;
    try {
      await commentService.incrementBlogViews(slug);
    } catch { }
  };



  if (!post) {
    return (
      <div className="pt-28 md:pt-36 pb-16 min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-[#00DC82] hover:underline font-hanken">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <article className="pt-28 md:pt-36 pb-16 min-h-screen bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto w-full px-6">
          {/* Back */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white transition font-hanken group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Blog
            </Link>
          </div>

          {/* Header */}
          <header className="mb-12">
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
          <div className="mb-6">
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
          <div className="mb-6">
            <span className="bg-[#1e1e1e] text-neutral-300 px-3 py-1 font-outfit rounded-full text-sm">
              {post.category}
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl md:text-5xl font-normal text-[#F5F5F5] leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
              {post.title}
            </h1>
          </div>

          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-400">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>

            <BlogReactions
              blogLoves={blogLoves}
              blogLikes={blogLikes}
              userHasLoved={userHasLoved}
              userHasLiked={userHasLiked}
              lovingBlog={lovingBlog}
              likingBlog={likingBlog}
              onLove={handleBlogLove}
              onLike={handleBlogLike}
              onShare={() => setShowShareModal(true)}
            />
          </div>

          {/* Content */}
          <div
            className="prose prose-sm md:prose-base lg:prose-lg font-poppins prose-invert max-w-none text-[#A3A3A3]"
            style={{ fontSize: `${fontSize}%` }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t font-outfit border-gray-800">
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

          {/* Love Reaction Section */}
          <div className="mt-24 mb-20 flex flex-col items-center justify-center">
            {blogReactionsError && (
              <p className="text-red-400 text-sm mb-8">{blogReactionsError}</p>
            )}

            {/* Large Reaction Count - Atmospheric/Watermark Style */}
            <div className="-mb-8 z-0">
              <span className="text-8xl md:text-9xl font-bold text-neutral-700/30 font-outfit tracking-wider select-none relative z-0">
                {blogLoves}
              </span>
            </div>

            {/* New Reusable Love Button */}
            <div className="relative z-10">
              <LoveReactionButton
                initialCount={blogLoves}
                onLove={handleBlogLove}
                isLoved={userHasLoved}
                isLoading={lovingBlog}
              />
            </div>
          </div>

          {/* Subscribe Now Section */}
          <div className="mt-12 mb-6">
            <Subscribe postTitle={post.title} />
          </div>

          {/* Comments */}
          <div>
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

      {/* Zoom Controls (Desktop Side Panel & Mobile Sheet) */}
      <ZoomControls
        fontSize={fontSize}
        setFontSize={setFontSize}
        isMobileSheetOpen={isMobileSheetOpen}
        setIsMobileSheetOpen={setIsMobileSheetOpen}
      />


      {/* Floating Reading Progress Pill */}
      <ReadingProgressPill postTitle={post.title} isHidden={isMobileSheetOpen} />

      {/* Image Lightbox Overlay Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-12 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          {/* Close Button in Top Right */}
          <button
            className="absolute top-6 right-6 p-2.5 rounded-lg border border-white/15 bg-black/50 text-neutral-300 hover:text-white transition duration-200 shadow-lg hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(null);
            }}
            title="Close Preview"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Centered Image */}
          <div className="relative max-w-5xl max-h-[75vh] w-full flex justify-center items-center">
            <img
              src={activeImage.src}
              alt={activeImage.alt}
              className="max-w-full max-h-[75vh] object-contain rounded-xl border border-white/10 shadow-2xl animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Bottom Caption Pill */}
          <div className="absolute bottom-8 flex justify-center w-full px-4 animate-slide-up">
            <div className="bg-[#111] border border-white/10 rounded-full px-5 py-2 flex items-center gap-2.5 shadow-xl">
              <span className="h-2 w-2 rounded-full bg-[#00DC82] animate-pulse"></span>
              <span className="text-sm font-hanken text-neutral-300 font-medium">
                {activeImage.alt}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogContent;
