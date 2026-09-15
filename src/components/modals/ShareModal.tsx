import { useState, useEffect } from 'react';
import { X, Copy } from 'lucide-react';
import { XIcon, LinkedinIcon } from '../icons/SocialIcons';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slug: string;
}

const ShareModal = ({ isOpen, onClose, title, slug }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
        const navbar = document.querySelector('nav');
        if (navbar) {
          navbar.style.paddingRight = `${scrollbarWidth}px`;
        }
      }
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.paddingRight = '';
      }
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      const navbar = document.querySelector('nav');
      if (navbar) {
        navbar.style.paddingRight = '';
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300);
  };

  const getShareUrl = () => {
    return `${window.location.origin}/blog/${slug}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const shareOnTwitter = () => {
    const url = getShareUrl();
    const text = `Check out this blog: "${title}"`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = getShareUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, '_blank');
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isAnimating
        ? 'bg-black/60 backdrop-blur-sm opacity-100'
        : 'bg-black/0 backdrop-blur-none opacity-0'
        }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl border border-border bg-popover/95 text-popover-foreground p-5 shadow-2xl transition-all duration-300 ${isAnimating
          ? 'scale-100 opacity-100 translate-y-0'
          : 'scale-95 opacity-0 translate-y-4'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-hanken text-foreground font-semibold">
              Share this blog
            </h3>
            <p className="text-sm font-hanken text-muted-foreground mt-1">
              Share "{title}"
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground font-hanken transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Copy link */}
        <div className="mb-5">
          <label className="block text-sm text-muted-foreground mb-2">
            Copy Link
          </label>
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 border border-border px-3 py-2">
            <input
              type="text"
              value={getShareUrl()}
              readOnly
              className="flex-1 bg-transparent text-sm text-foreground outline-none font-hanken"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md bg-accent hover:bg-muted transition text-foreground"
              title="Copy link"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {copied && (
            <p className="text-xs font-hanken text-green-500 mt-2">
              copied!
            </p>
          )}
        </div>

        {/* Social buttons */}
        <div>
          <p className="text-sm font-hanken text-muted-foreground mb-3">
            Share on Social Media
          </p>
          <div className="flex gap-3">
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center font-hanken justify-center gap-2 px-4 py-2 rounded-lg
              bg-card border border-border text-foreground hover:bg-accent transition"
            >
              <XIcon size="16" />
              Twitter
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex-1 flex items-center font-hanken justify-center gap-2 px-4 py-2 rounded-lg
              bg-card border border-border text-foreground hover:bg-accent transition"
            >
              <LinkedinIcon size="20" />
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
