import React from 'react';
import { Heart } from 'lucide-react';
import { ClappingHandsIcon } from '../icons/SocialIcons';

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
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 group shadow-sm text-sm font-bold font-outfit cursor-pointer disabled:cursor-default ${userHasLoved
          ? 'bg-red-500/15 border-transparent text-red-500'
          : 'bg-card border-border text-foreground hover:bg-accent'
          }`}
        aria-label="Love this post"
      >
        <Heart
          className={`h-4 w-4 group-hover:scale-110 transition-transform duration-200 ${userHasLoved ? 'fill-red-600 text-red-500' : 'fill-none'
            }`}
        />
        <span>{blogLoves}</span>
      </button>
      <button
        onClick={onLike}
        disabled={userHasLiked || likingBlog}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 group shadow-sm text-sm font-bold font-outfit cursor-pointer disabled:cursor-default ${userHasLiked
          ? 'bg-blue-500/15 border-transparent text-blue-500'
          : 'bg-card border-border text-foreground hover:bg-accent'
          }`}
        aria-label="Clap for this post"
      >
        <ClappingHandsIcon
          size="16"
          className={`group-hover:scale-110 transition-transform duration-200 ${userHasLiked ? 'fill-blue-500' : 'fill-current text-foreground'}`}
        />
        <span>{blogLikes}</span>
      </button>
      <button
        onClick={onShare}
        className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-foreground hover:bg-accent transition-all duration-200 group shadow-sm text-sm font-bold font-outfit cursor-pointer"
        aria-label="Share this post"
      >
        <span>Share</span>
      </button>
    </div>
  );
};

export default BlogReactions;
