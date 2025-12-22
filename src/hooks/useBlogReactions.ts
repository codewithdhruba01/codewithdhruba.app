import { useState, useEffect } from 'react';
import { commentService, supabase } from '../lib/supabase';

interface UseBlogReactionsReturn {
  // State
  blogLoves: number;
  userHasLoved: boolean;
  lovingBlog: boolean;
  blogLikes: number;
  userHasLiked: boolean;
  likingBlog: boolean;
  blogReactionsError: string | null;

  // Functions
  handleBlogLove: () => Promise<void>;
  handleBlogLike: () => Promise<void>;
}

export const useBlogReactions = (slug: string | undefined): UseBlogReactionsReturn => {
  const [blogLoves, setBlogLoves] = useState(0);
  const [userHasLoved, setUserHasLoved] = useState(false);
  const [lovingBlog, setLovingBlog] = useState(false);

  const [blogLikes, setBlogLikes] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likingBlog, setLikingBlog] = useState(false);

  const [blogReactionsError, setBlogReactionsError] = useState<string | null>(null);

  const userId = 'blog-user-' + Math.random().toString(36).substr(2, 9);

  const loadUserReactionHistory = () => {
    if (!slug) return;
    const loved = JSON.parse(localStorage.getItem('lovedBlogs') || '[]');
    const liked = JSON.parse(localStorage.getItem('likedBlogs') || '[]');
    setUserHasLoved(loved.includes(slug));
    setUserHasLiked(liked.includes(slug));
  };

  const saveUserReaction = (type: 'love' | 'like') => {
    if (!slug) return;
    const key = type === 'love' ? 'lovedBlogs' : 'likedBlogs';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    if (!existing.includes(slug)) {
      existing.push(slug);
      localStorage.setItem(key, JSON.stringify(existing));
    }
  };

  const loadBlogReactions = async () => {
    if (!slug) return;
    try {
      const [loves, likes] = await Promise.all([
        commentService.getBlogLovesCount(slug),
        commentService.getBlogLikesCount(slug),
      ]);
      setBlogLoves(loves);
      setBlogLikes(likes);
      loadUserReactionHistory();
    } catch (e) {
      console.error(e);
    }
  };

  const handleBlogLove = async () => {
    if (!slug || userHasLoved || lovingBlog) return;
    try {
      setLovingBlog(true);
      await commentService.loveBlogPost(slug, userId);
      saveUserReaction('love');
      setBlogLoves((p) => p + 1);
      setUserHasLoved(true);
    } catch {
      setBlogReactionsError('Failed to love the post.');
    } finally {
      setLovingBlog(false);
    }
  };

  const handleBlogLike = async () => {
    if (!slug || userHasLiked || likingBlog) return;
    try {
      setLikingBlog(true);
      await commentService.likeBlogPost(slug, userId);
      saveUserReaction('like');
      setBlogLikes((p) => p + 1);
      setUserHasLiked(true);
    } catch {
      setBlogReactionsError('Failed to like the post.');
    } finally {
      setLikingBlog(false);
    }
  };

  // Real-time updates effect
  useEffect(() => {
    if (!slug) return;

    const channel = supabase
      .channel(`blog-reactions-${slug}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_loves',
          filter: `blog_slug=eq.${slug}`,
        },
        () => loadBlogReactions()
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'blog_likes',
          filter: `blog_slug=eq.${slug}`,
        },
        () => loadBlogReactions()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  // Load reactions on mount
  useEffect(() => {
    if (slug) {
      loadBlogReactions();
    }
  }, [slug]);

  return {
    blogLoves,
    userHasLoved,
    lovingBlog,
    blogLikes,
    userHasLiked,
    likingBlog,
    blogReactionsError,
    handleBlogLove,
    handleBlogLike,
  };
};
