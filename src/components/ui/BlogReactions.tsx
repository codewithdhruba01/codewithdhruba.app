import React from 'react';
import { Heart } from 'lucide-react';
import { ShareIcon, ClappingHandsIcon } from '../icons/SocialIcons';

interface BlogReactionsProps {
  blogLoves: number;
  blogLikes: number;
  userHasLoved: boolean;
  userHasLiked: boolean;
  lovingBlog: boolean;
  likingBlog: boolean;
  onLove: () => void;
  onLike: () => void;
  onShare: () => void;
}

export const BlogReactions: React.FC<BlogReactionsProps> = ({
  blogLoves,
  blogLikes,
  userHasLoved,
  userHasLiked,
  lovingBlog,
  likingBlog,
  onLove,
  onLike,
  onShare,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onLove}
        disabled={userHasLoved || lovingBlog}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition cursor-pointer disabled:cursor-default ${userHasLoved
          ? 'bg-red-500/15 border-red-500/30 text-red-500 font-medium'
          : 'bg-card border-border text-foreground hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-500 shadow-sm'
          }`}
        aria-label="Love this post"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${userHasLoved ? 'fill-red-500 text-red-500' : 'fill-none'
            }`}
        />
        <span className="text-xs font-semibold">{blogLoves}</span>
      </button>
      <button
        onClick={onLike}
        disabled={userHasLiked || likingBlog}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition cursor-pointer disabled:cursor-default ${userHasLiked
          ? 'bg-blue-500/15 border-blue-500/30 text-blue-500 font-medium'
          : 'bg-card border-border text-foreground hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-500 shadow-sm'
          }`}
        aria-label="Clap for this post"
      >
        <ClappingHandsIcon
          size="18"
          className={userHasLiked ? 'fill-blue-500' : 'fill-current text-foreground'}
        />
        <span className="text-xs font-semibold">{blogLikes}</span>
      </button>
      <button
        onClick={onShare}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-foreground hover:bg-accent hover:border-neutral-500/40 transition shadow-sm cursor-pointer"
        aria-label="Share this post"
      >
        <ShareIcon size="18" className="fill-current text-foreground" />
        <span className="text-xs font-semibold">Share</span>
      </button>
    </div>
  );
};

export default BlogReactions;
