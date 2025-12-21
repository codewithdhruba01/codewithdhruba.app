import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Send, AlertCircle, Loader2 } from 'lucide-react';
import { supabase, commentService } from '../lib/supabase';

// Unified comment interface for both Supabase and localStorage
interface UnifiedComment {
  id: string;
  author: string;
  content: string;
  likes: number;
  liked_by: string[]; // Use consistent naming
  replies?: UnifiedComment[];
  // Supabase-specific fields
  blog_slug?: string;
  created_at?: string;
  updated_at?: string;
  parent_id?: string;
  // localStorage-specific fields
  timestamp?: string;
  parentId?: string;
}

interface CommentsSectionProps {
  blogSlug: string;
}

const CommentsSection = ({ blogSlug }: CommentsSectionProps) => {
  const [comments, setComments] = useState<UnifiedComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Generate a simple user ID (in a real app, this would be from authentication)
  const userId = 'anonymous-user-' + Math.random().toString(36).substr(2, 9);

  // Check if Supabase is configured
  const supabaseConfigured = import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Load comments
  useEffect(() => {
    console.log('📝 CommentsSection Debug:');
    console.log('Blog slug:', blogSlug);
    console.log('Supabase configured:', supabaseConfigured);
    console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('VITE_SUPABASE_ANON_KEY exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

    if (supabaseConfigured) {
      console.log('🔄 Loading from Supabase');
      setUseLocalStorage(false);
      loadCommentsFromSupabase();
    } else {
      console.log('💾 Loading from localStorage');
      setUseLocalStorage(true);
      loadCommentsFromLocalStorage();
    }
  }, [blogSlug, supabaseConfigured]);

  // Set up real-time subscription for live updates (only if Supabase is configured)
  useEffect(() => {
    if (!supabaseConfigured) return;

    const channel = supabase
      .channel('comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `blog_slug=eq.${blogSlug}`
        },
        (payload: any) => {
          console.log('Change received!', payload);
          loadCommentsFromSupabase(); // Reload comments on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [blogSlug, supabaseConfigured]);

  const loadCommentsFromSupabase = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔄 Fetching comments for blog:', blogSlug);

      const data = await commentService.getComments(blogSlug);
      console.log('📦 Comments received:', data);

      // Organize comments into parent-child structure
      const parentComments = data.filter(comment => !comment.parent_id);
      const replyComments = data.filter(comment => comment.parent_id);

      const commentsWithReplies = parentComments.map(parent => ({
        ...parent,
        replies: replyComments.filter(reply => reply.parent_id === parent.id)
      }));

      console.log('✅ Processed comments:', commentsWithReplies);
      setComments(commentsWithReplies);
    } catch (err) {
      console.error('❌ Error loading comments from Supabase:', err);
      setError('Failed to load comments from database. Please check your Supabase setup.');
      // Fallback to localStorage on error
      console.log('🔄 Falling back to localStorage due to error');
      setUseLocalStorage(true);
      loadCommentsFromLocalStorage();
    } finally {
      setLoading(false);
    }
  };

  const loadCommentsFromLocalStorage = () => {
    try {
      setLoading(true);
      setError(null);
      const storedComments = localStorage.getItem(`comments-${blogSlug}`);
      if (storedComments) {
        const parsedComments = JSON.parse(storedComments);
        setComments(parsedComments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error('Error loading comments from localStorage:', err);
      setError('Failed to load comments. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveCommentsToLocalStorage = (comments: UnifiedComment[]) => {
    try {
      localStorage.setItem(`comments-${blogSlug}`, JSON.stringify(comments));
    } catch (err) {
      console.error('Error saving comments to localStorage:', err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !authorName.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      if (useLocalStorage) {
        // Local storage mode
        const comment: UnifiedComment = {
          id: Date.now().toString(),
          author: authorName.trim(),
          content: newComment.trim(),
          timestamp: new Date().toLocaleString(),
          likes: 0,
          liked_by: [],
          replies: []
        };

        setComments(prev => {
          const newComments = [...prev, comment];
          saveCommentsToLocalStorage(newComments);
          return newComments;
        });

        setNewComment('');
        setAuthorName('');
      } else {
        // Supabase mode
        await commentService.addComment({
          blog_slug: blogSlug,
          author: authorName.trim(),
          content: newComment.trim()
        });

        setNewComment('');
        setAuthorName('');
        // Comments will be reloaded via real-time subscription
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      setError('Failed to add comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const addReply = async (parentId: string) => {
    if (!replyContent.trim() || !replyAuthor.trim()) return;

    try {
      setSubmitting(true);
      setError(null);

      if (useLocalStorage) {
        // Local storage mode
        const reply: UnifiedComment = {
          id: Date.now().toString(),
          author: replyAuthor.trim(),
          content: replyContent.trim(),
          timestamp: new Date().toLocaleString(),
          likes: 0,
          liked_by: [],
          replies: [],
          parentId
        };

        setComments(prev => {
          const newComments = prev.map(comment => {
            if (comment.id === parentId) {
              return { ...comment, replies: [...(comment.replies || []), reply] };
            }
            return comment;
          });
          saveCommentsToLocalStorage(newComments);
          return newComments;
        });

        setReplyingTo(null);
        setReplyContent('');
        setReplyAuthor('');
      } else {
        // Supabase mode
        await commentService.addComment({
          blog_slug: blogSlug,
          author: replyAuthor.trim(),
          content: replyContent.trim(),
          parent_id: parentId
        });

        setReplyingTo(null);
        setReplyContent('');
        setReplyAuthor('');
        // Comments will be reloaded via real-time subscription
      }
    } catch (err) {
      console.error('Error adding reply:', err);
      setError('Failed to add reply. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleLike = async (commentId: string, isReply: boolean = false, parentId?: string) => {
    try {
      if (useLocalStorage) {
        // Local storage mode
        setComments(prev => {
          const newComments = prev.map(comment => {
            if (isReply && parentId === comment.id) {
              return {
                ...comment,
                replies: (comment.replies || []).map(reply => {
                  if (reply.id === commentId) {
                    const isLiked = reply.liked_by.includes(userId);
                    return {
                      ...reply,
                      likes: isLiked ? reply.likes - 1 : reply.likes + 1,
                      liked_by: isLiked
                        ? reply.liked_by.filter((id: string) => id !== userId)
                        : [...reply.liked_by, userId]
                    };
                  }
                  return reply;
                })
              };
            } else if (!isReply && comment.id === commentId) {
              const isLiked = comment.liked_by.includes(userId);
              return {
                ...comment,
                likes: isLiked ? comment.likes - 1 : comment.likes + 1,
                liked_by: isLiked
                  ? comment.liked_by.filter((id: string) => id !== userId)
                  : [...comment.liked_by, userId]
              };
            }
            return comment;
          });
          saveCommentsToLocalStorage(newComments);
          return newComments;
        });
      } else {
        // Supabase mode
        await commentService.toggleLike(commentId, userId);
        // Comments will be reloaded via real-time subscription
      }
    } catch (err) {
      console.error('Error toggling like:', err);
      setError('Failed to update like. Please try again.');
    }
  };

  const CommentComponent = ({ comment, isReply = false, parentId }: { comment: UnifiedComment; isReply?: boolean; parentId?: string }) => (
    <div className={`${isReply ? 'ml-8 mt-4' : 'mb-6'} p-4 bg-[#1a1a1a] rounded-lg border border-gray-800`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{comment.author}</div>
            <div className="text-gray-400 text-xs">
              {useLocalStorage
                ? (comment as any).timestamp
                : comment.created_at ? new Date(comment.created_at).toLocaleString() : new Date().toLocaleString()
              }
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-300 mb-3 text-sm leading-relaxed">{comment.content}</p>

      <div className="flex items-center space-x-4">
        <button
          onClick={() => toggleLike(comment.id, isReply, parentId)}
          className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors text-sm"
        >
          <Heart className={`h-4 w-4 ${comment.liked_by.includes(userId) ? 'fill-red-400 text-red-400' : ''}`} />
          <span>{comment.likes}</span>
        </button>

        {!isReply && (
          <button
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Reply</span>
          </button>
        )}
      </div>

      {/* Reply Form */}
      {replyingTo === comment.id && (
        <div className="mt-4 p-3 bg-[#141414] rounded-lg border border-gray-700">
          <input
            type="text"
            placeholder="Your name"
            value={replyAuthor}
            onChange={(e) => setReplyAuthor(e.target.value)}
            className="w-full p-2 mb-2 bg-[#0a0a0a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="w-full p-2 mb-2 bg-[#0a0a0a] border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
            rows={3}
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setReplyingTo(null)}
              className="px-3 py-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => addReply(comment.id)}
              disabled={submitting}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded text-sm flex items-center space-x-1 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Send className="h-3 w-3" />
              )}
              <span>{submitting ? 'Posting...' : 'Reply'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Render Replies */}
      {comment.replies && comment.replies.map(reply => (
        <CommentComponent
          key={reply.id}
          comment={reply}
          isReply={true}
          parentId={comment.id}
        />
      ))}
    </div>
  );

  return (
    <div className="mt-16 pt-8 border-t border-gray-800">
      <h3 className="text-2xl font-bold text-white mb-6 font-outfit">Comments</h3>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-red-400" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Local Storage Warning */}
      {useLocalStorage && (
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-500/50 rounded-lg flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-yellow-400" />
          <div className="text-yellow-400 text-sm">
            <p className="font-semibold">Local Storage Mode</p>
            <p>Comments are stored locally and will be lost when you clear browser data. Set up Supabase for persistent comments.</p>
          </div>
        </div>
      )}

      {/* Add Comment Form */}
      <div className="mb-8 p-6 bg-[#1a1a1a] rounded-lg border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-4 font-outfit">Leave a Comment</h4>
        <input
          type="text"
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          disabled={submitting}
          className="w-full p-3 mb-3 bg-[#0a0a0a] border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
        <textarea
          placeholder="Share your thoughts..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={submitting}
          className="w-full p-3 mb-3 bg-[#0a0a0a] border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 resize-none disabled:opacity-50"
          rows={4}
        />
        <div className="flex justify-end">
          <button
            onClick={addComment}
            disabled={submitting || !newComment.trim() || !authorName.trim()}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span>{submitting ? 'Posting...' : 'Post Comment'}</span>
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
            <p className="text-gray-400">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg">No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map(comment => (
            <CommentComponent key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
