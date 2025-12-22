import { useState } from 'react';
import { X, Copy, Linkedin, Twitter } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  slug: string;
}

const ShareModal = ({ isOpen, onClose, title, slug }: ShareModalProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const getShareUrl = () => {
    return `${window.location.origin}/blog/${slug}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareOnTwitter = () => {
    const url = getShareUrl();
    const text = `Check out this amazing blog post: "${title}" by @codewithdhruba`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = getShareUrl();
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Share this post</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Share Link</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={getShareUrl()}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={copyToClipboard}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {copied ? 'Copied!' : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md transition"
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
