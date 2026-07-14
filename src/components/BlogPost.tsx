import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Undo2,
  Heart,
  Calendar,
  Plus,
  Minus,
  Settings,
  RotateCcw,
  X,
} from 'lucide-react';
import GiscusComments from './GiscusComments';
import ShareModal from './modals/ShareModal';
import { ShareIcon, ClappingHandsIcon } from './icons/SocialIcons';
import { useBlogReactions } from '../hooks/useBlogReactions';
import { commentService } from '../lib/supabase';
import LoveReactionButton from './ui/LoveReactionButton';
import ReadingProgressPill from './ui/ReadingProgressPill';

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
  const post = slug ? blogPostsData[slug as keyof typeof blogPostsData] : null;

  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  // Font size zoom functionality
  const [fontSize, setFontSize] = useState<number>(100); // percentage
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

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

  // Bottom sheet animation controls
  const handleOpenSheet = () => {
    setIsMobileSheetOpen(true);
    setCurrentTranslateY(0);
    // Small delay to ensure DOM is ready before animation
    setTimeout(() => setIsAnimating(true), 10);
  };

  const handleCloseSheet = () => {
    setIsAnimating(false);
    // Delay closing to allow exit animation to complete
    setTimeout(() => {
      setIsMobileSheetOpen(false);
      setCurrentTranslateY(0);
    }, 300);
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
      handleCloseSheet();
    } else {
      // Snap back to original position with animation
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
        <Link to="/all-posts" className="text-[#00DC82] hover:underline font-hanken">
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
              to="/all-posts"
              className="inline-flex items-center text-gray-400 hover:text-white transition font-hanken"
            >
              <Undo2 className="h-4 w-4 mr-2" />
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
                <ClappingHandsIcon
                  size="18"
                  className={userHasLiked ? 'fill-blue-400' : ''}
                />
                <span>{blogLikes}</span>
              </button>
              <button
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
              >
                <ShareIcon size="18" />
                <span>Share</span>
              </button>
            </div>
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
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize >= 150
              ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
              : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
              }`}
            title="Zoom In (Ctrl/Cmd + =)"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Font Size Indicator */}
          <div className="text-xs font-bold select-none px-2.5 py-1.5 border border-neutral-950 bg-gradient-to-b from-[#0d0d0e] to-[#161617] text-white rounded-xl min-w-[44px] text-center shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
            {getFontSizeInPx()}px
          </div>

          {/* Zoom Out */}
          <button
            onClick={zoomOut}
            disabled={fontSize <= 80}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize <= 80
              ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
              : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
              }`}
            title="Zoom Out (Ctrl/Cmd + -)"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Zoom Controls - Floating Settings Button */}
      <div className="md:hidden fixed right-4 top-20 z-40">
        <button
          onClick={handleOpenSheet}
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
            className={`fixed inset-0 z-50 md:hidden transition-all duration-300
                        ${isAnimating
                ? 'bg-black/50 backdrop-blur-sm opacity-100'
                : 'bg-black/0 backdrop-blur-none opacity-0'
              }`}
            onClick={handleCloseSheet}
          />

          {/* Bottom Sheet */}
          <div
            className={`fixed bottom-0 left-0 right-0 z-50 md:hidden
                        bg-neutral-950/95 backdrop-blur-xl
                        border-t border-white/10
                        rounded-t-3xl
                        shadow-[0_0_60px_rgba(0,0,0,0.8)]
                        transform transition-all duration-300 ease-out
                        ${isAnimating
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
              }`}
            style={{
              transform: isAnimating
                ? `translateY(${currentTranslateY}px)`
                : 'translateY(100%)'
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
              <div className={`w-16 h-1.5 bg-white/20 rounded-full transition-transform duration-200
                            ${isDragging ? 'scale-110' : 'scale-100'}`}></div>
            </div>



            {/* Content */}
            <div className="px-6 pb-8 space-y-6">

              {/* Current Font Size Display */}
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {getFontSizeInPx()}px
                </div>
                <div className="text-sm text-white/60 font-satoshi">
                  Current font size
                </div>
              </div>

              {/* Quick Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={zoomOut}
                  disabled={fontSize <= 80}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize <= 80
                    ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
                    : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
                    }`}
                >
                  <Minus className="w-5 h-5" />
                </button>

                <button
                  onClick={resetZoom}
                  className="px-6 py-2.5 border border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000] rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-150 group"
                >
                  <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform duration-300" />
                  Reset
                </button>

                <button
                  onClick={zoomIn}
                  disabled={fontSize >= 150}
                  className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-150 cursor-pointer ${fontSize >= 150
                    ? 'border-[#2d2e2d] bg-[#161617] text-[#a0a0a5]/40 opacity-40 cursor-not-allowed'
                    : 'border-[#2d2e2d] bg-gradient-to-b from-[#252526] to-[#161617] text-[#a0a0a5] hover:text-white shadow-[0_3px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:shadow-[0_4px_0_#000000,_inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px] active:shadow-[0_1px_0_#000000]'
                    }`}
                >
                  <Plus className="w-5 h-5" />
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
                           slider-thumb accent-white"
                  style={{
                    background: `linear-gradient(to right,
                      #ffffff 0%,
                      #ffffff ${(getFontSizeInPx() - 12) / (24 - 12) * 100}%,
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
export default BlogPost;
