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
        onClick={onLike}
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
        onClick={onShare}
        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
      >
        <ShareIcon size="18" />
        <span>Share</span>
      </button>
    </div>
  );
};

export default BlogReactions;
