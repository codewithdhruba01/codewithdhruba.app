import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Undo2,
  Heart,
  Loader2,
  ThumbsUp,
  Calendar,
  Share2,
  Plus,
  Minus,
  Settings,
  RotateCcw,
} from 'lucide-react';
import GiscusComments from './GiscusComments';
import ShareModal from './modals/ShareModal';
import ChatBotLauncher from './ChatBotLauncher';
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

  // Font size zoom functionality
  const [fontSize, setFontSize] = useState<number>(100); // percentage
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);

  // Gesture handling for bottom sheet
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartY, setDragStartY] = useState<number>(0);
  const [currentTranslateY, setCurrentTranslateY] = useState<number>(0);

  const zoomIn = () => {
    setFontSize(prev => Math.min(prev + 10, 150)); // max 150%
  };

  const zoomOut = () => {
    setFontSize(prev => Math.max(prev - 10, 80)); // min 80%
  };

  const resetZoom = () => {
    setFontSize(100);
  };

  // Convert percentage to pixel size for display
  const getFontSizeInPx = () => {
    // Base font size is typically 16px, so 100% = 16px
    return Math.round((fontSize / 100) * 16);
  };

  // Handle slider change for mobile
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value);
    // Convert px back to percentage (16px = 100%)
    const percentage = (newSize / 16) * 100;
    setFontSize(Math.max(80, Math.min(150, percentage)));
  };

  // Gesture handling functions
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    setDragStartY(clientY);
  };

  const handleDragMove = (clientY: number) => {
    if (!isDragging) return;

    const deltaY = clientY - dragStartY;
    // Only allow downward dragging
    if (deltaY > 0) {
      setCurrentTranslateY(deltaY);
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Close threshold: if dragged more than 100px down, close the sheet
    const CLOSE_THRESHOLD = 100;

    if (currentTranslateY > CLOSE_THRESHOLD) {
      setIsMobileSheetOpen(false);
      setCurrentTranslateY(0);
    } else {
      // Snap back to original position
      setCurrentTranslateY(0);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling
    handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Mouse event handlers (for desktop testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientY);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection
    } else {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none'; // Prevent text selection
    } else {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
    };
  }, [isDragging]);

  // Keyboard shortcuts for zoom
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + + for zoom in
      if ((event.ctrlKey || event.metaKey) && event.key === '=') {
        event.preventDefault();
        zoomIn();
      }
      // Ctrl/Cmd + - for zoom out
      if ((event.ctrlKey || event.metaKey) && event.key === '-') {
        event.preventDefault();
        zoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
            style={{ fontSize: `${fontSize}%` }}
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

      {/* Desktop Zoom Controls - Side Panel */}
      <div className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col items-center gap-3
                  rounded-2xl
                  bg-black/20
                  backdrop-blur-xl
                  border border-white/10
                  shadow-[0_0_40px_rgba(0,0,0,0.3)]
                  px-3 py-4
                  hover:bg-black/30
                  transition-all duration-300">

          {/* Zoom In */}
          <button
            onClick={zoomIn}
            disabled={fontSize >= 150}
            className="w-10 h-10 rounded-xl
                 bg-white/5
                 hover:bg-white/15
                 disabled:opacity-40
                 disabled:cursor-not-allowed
                 flex items-center justify-center
                 transition-all duration-200
                 hover:scale-105"
            title="Zoom In (Ctrl/Cmd + =)"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>

          {/* Font Size Indicator */}
          <div className="text-xs text-white/90 font-medium select-none px-2 py-1
                         bg-white/5 rounded-lg min-w-[44px] text-center">
            {getFontSizeInPx()}px
          </div>

          {/* Zoom Out */}
          <button
            onClick={zoomOut}
            disabled={fontSize <= 80}
            className="w-10 h-10 rounded-xl
                 bg-white/5
                 hover:bg-white/15
                 disabled:opacity-40
                 disabled:cursor-not-allowed
                 flex items-center justify-center
                 transition-all duration-200
                 hover:scale-105"
            title="Zoom Out (Ctrl/Cmd + -)"
          >
            <Minus className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Zoom Controls - Floating Settings Button */}
      <div className="md:hidden fixed right-4 top-20 z-40">
        <button
          onClick={() => setIsMobileSheetOpen(true)}
          className="w-14 h-14 rounded-full
                   bg-black/40 backdrop-blur-xl
                   border border-white/20
                   shadow-[0_0_30px_rgba(0,0,0,0.4)]
                   flex items-center justify-center
                   hover:bg-black/60
                   transition-all duration-300
                   hover:scale-105"
          title="Font Size Settings"
        >
          <Settings className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobileSheetOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setIsMobileSheetOpen(false)}
          />

          {/* Bottom Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden
                        bg-neutral-950/95 backdrop-blur-xl
                        border-t border-white/10
                        rounded-t-3xl
                        shadow-[0_0_60px_rgba(0,0,0,0.8)]
                        transform transition-all duration-300 ease-out"
            style={{
              transform: `translateY(${currentTranslateY}px)`
            }}
          >

            {/* Drag Handle */}
            <div
              className="flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
            >
              <div className={`w-12 h-1.5 bg-white/30 rounded-full transition-transform duration-200
                            ${isDragging ? 'scale-110' : 'scale-100'}`}></div>
            </div>

            {/* Header */}
            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold text-white text-center">Font Size</h3>
            </div>

            {/* Content */}
            <div className="px-6 pb-8 space-y-6">

              {/* Current Font Size Display */}
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">
                  {getFontSizeInPx()}px
                </div>
                <div className="text-sm text-white/60">
                  Current font size
                </div>
              </div>

              {/* Quick Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={zoomOut}
                  disabled={fontSize <= 80}
                  className="w-12 h-12 rounded-full bg-white/10
                           hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed
                           flex items-center justify-center transition-all duration-200"
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={resetZoom}
                  className="px-4 py-2 rounded-lg bg-[#00DC82]/20 hover:bg-[#00DC82]/30
                           border border-[#00DC82]/30 text-[#00DC82] text-sm font-medium
                           transition-all duration-200 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>

                <button
                  onClick={zoomIn}
                  disabled={fontSize >= 150}
                  className="w-12 h-12 rounded-full bg-white/10
                           hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed
                           flex items-center justify-center transition-all duration-200"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Slider */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Small</span>
                  <span>Large</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={getFontSizeInPx()}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer
                           slider-thumb accent-[#00DC82]"
                  style={{
                    background: `linear-gradient(to right,
                      #00DC82 0%,
                      #00DC82 ${(getFontSizeInPx() - 12) / (24 - 12) * 100}%,
                      rgba(255,255,255,0.2) ${(getFontSizeInPx() - 12) / (24 - 12) * 100}%,
                      rgba(255,255,255,0.2) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-white/40">
                  <span>12px</span>
                  <span>24px</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile ChatBot Launcher with dynamic positioning */}
      <div className="md:hidden">
        <ChatBotLauncher
          bottomOffset={isMobileSheetOpen ? 'bottom-4' : 'bottom-20'}
          zIndex="z-30"
        />
      </div>

    </>
  );
};
export default BlogPost;
