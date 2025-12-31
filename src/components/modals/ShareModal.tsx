import { useState, useEffect } from 'react';
import { X, Copy, Linkedin } from 'lucide-react';
import { XIcon } from '../icons/SocialIcons';

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
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setTimeout(() => setShouldRender(false), 300);
    }
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isAnimating
        ? 'bg-black/60 backdrop-blur-sm opacity-100'
        : 'bg-black/0 backdrop-blur-none opacity-0'
        }`}
    >
      <div
        className={`relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0A0A0A]/95 p-5 shadow-2xl transition-all duration-300 ${isAnimating
          ? 'scale-100 opacity-100 translate-y-0'
          : 'scale-95 opacity-0 translate-y-4'
          }`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-white">
              Share this blog
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Share "{title}"
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-neutral-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Copy link */}
        <div className="mb-5">
          <label className="block text-sm text-neutral-400 mb-2">
            Copy Link
          </label>
          <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2">
            <input
              type="text"
              value={getShareUrl()}
              readOnly
              className="flex-1 bg-transparent text-sm text-white outline-none"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition text-white"
              title="Copy link"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-400 mt-2">
              copied!
            </p>
          )}
        </div>

        {/* Social buttons */}
        <div>
          <p className="text-sm text-neutral-400 mb-3">
            Share on Social Media
          </p>
          <div className="flex gap-3">
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg
              bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
            >
              <XIcon size="16" />
              Twitter
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg
              bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
