import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';


const hasValidCredentials = supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your_supabase') &&
  !supabaseAnonKey.includes('your_supabase') &&
  supabaseUrl.startsWith('https://') &&
  supabaseUrl.includes('.supabase.co');

console.log('Supabase Debug Info:');
console.log('URL:', supabaseUrl);
console.log('Key exists:', !!supabaseAnonKey);
console.log('URL valid:', supabaseUrl?.startsWith('https://') && supabaseUrl?.includes('.supabase.co'));
console.log('Has valid credentials:', hasValidCredentials);

let supabase: any = null;

if (hasValidCredentials) {
  console.log('Using Supabase database mode');
  supabase = createClient(supabaseUrl, supabaseAnonKey);


  supabase.from('comments').select('count').limit(1).then(({ error }: { error: any }) => {
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful');
    }
  });
} else {
  console.warn('Supabase not properly configured. Using localStorage mode. Please set valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');

  supabase = {
    from: () => ({
      select: () => ({ eq: () => ({ order: () => ({ ascending: () => Promise.resolve({ data: [], error: null }) }) }) }),
      insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      update: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
      delete: () => ({ eq: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) })
    }),
    channel: () => ({
      on: () => ({
        subscribe: () => { }
      })
    }),
    removeChannel: () => { }
  };
}

export { supabase };


export interface Comment {
  id: string;
  blog_slug: string;
  author: string;
  content: string;
  created_at: string;
  updated_at: string;
  likes: number;
  liked_by: string[];
  parent_id?: string;
  replies?: Comment[];
}


export const commentService = {

  async getComments(blogSlug: string): Promise<Comment[]> {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('blog_slug', blogSlug)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },


  async addComment(comment: Omit<Comment, 'id' | 'created_at' | 'updated_at' | 'likes' | 'liked_by'>): Promise<Comment> {
    const { data, error } = await supabase
      .from('comments')
      .insert({
        ...comment,
        likes: 0,
        liked_by: []
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },


  async toggleLike(commentId: string, userId: string): Promise<Comment> {

    const { data: currentComment, error: fetchError } = await supabase
      .from('comments')
      .select('liked_by, likes')
      .eq('id', commentId)
      .single();

    if (fetchError) throw fetchError;

    const isLiked = currentComment.liked_by.includes(userId);
    const newLikedBy = isLiked
      ? currentComment.liked_by.filter((id: string) => id !== userId)
      : [...currentComment.liked_by, userId];

    const newLikes = isLiked ? currentComment.likes - 1 : currentComment.likes + 1;

    const { data, error } = await supabase
      .from('comments')
      .update({
        liked_by: newLikedBy,
        likes: newLikes
      })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },


  async deleteComment(commentId: string): Promise<void> {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId);

    if (error) throw error;
  },


  async getBlogLovesCount(blogSlug: string): Promise<number> {
    const { count, error } = await supabase
      .from('blog_loves')
      .select('*', { count: 'exact', head: true })
      .eq('blog_slug', blogSlug);

    if (error) throw error;
    return count || 0;
  },


  async hasUserLovedBlog(blogSlug: string, userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('blog_loves')
      .select('id')
      .eq('blog_slug', blogSlug)
      .eq('user_id', userId)
      .limit(1);

    if (error) throw error;
    return data && data.length > 0;
  },


  async loveBlogPost(blogSlug: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('blog_loves')
      .insert({
        blog_slug: blogSlug,
        user_id: userId
      })
      .select();

    if (error) {

      if (error.code !== '23505') {
        throw error;
      }
    }
  },


  async getBlogLikesCount(blogSlug: string): Promise<number> {
    const { count, error } = await supabase
      .from('blog_likes')
      .select('*', { count: 'exact', head: true })
      .eq('blog_slug', blogSlug);

    if (error) throw error;
    return count || 0;
  },


  async hasUserLikedBlog(blogSlug: string, userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('blog_likes')
      .select('id')
      .eq('blog_slug', blogSlug)
      .eq('user_id', userId)
      .limit(1);

    if (error) throw error;
    return data && data.length > 0;
  },


  async likeBlogPost(blogSlug: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('blog_likes')
      .insert({
        blog_slug: blogSlug,
        user_id: userId
      })
      .select();

    if (error) {

      if (error.code !== '23505') {
        throw error;
      }
    }
  },

  // Photo loves functions
  async getPhotoLovesCount(photoId: number): Promise<number> {
    const { count, error } = await supabase
      .from('photo_loves')
      .select('*', { count: 'exact', head: true })
      .eq('photo_id', photoId);

    if (error) throw error;
    return count || 0;
  },

  async getAllPhotoLovesCounts(): Promise<Record<number, number>> {
    const { data, error } = await supabase
      .from('photo_loves')
      .select('photo_id');

    if (error) throw error;

    // Count occurrences of each photo_id
    const counts: Record<number, number> = {};
    data?.forEach((item: { photo_id: number }) => {
      counts[item.photo_id] = (counts[item.photo_id] || 0) + 1;
    });

    return counts;
  },

  async hasUserLovedPhoto(photoId: number, userId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('photo_loves')
      .select('id')
      .eq('photo_id', photoId)
      .eq('user_id', userId)
      .limit(1);

    if (error) throw error;
    return data && data.length > 0;
  },

  async lovePhoto(photoId: number, userId: string): Promise<void> {
    const { error } = await supabase
      .from('photo_loves')
      .insert({
        photo_id: photoId,
        user_id: userId
      })
      .select();

    if (error) {
      if (error.code !== '23505') { // 23505 is unique constraint violation
        throw error;
      }
    }
  },

  async unlikePhoto(photoId: number, userId: string): Promise<void> {
    const { error } = await supabase
      .from('photo_loves')
      .delete()
      .eq('photo_id', photoId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  // Get blog post view count
  async getBlogViews(blogSlug: string): Promise<number> {
    try {
      const { data, error } = await supabase
        .from('blog_views')
        .select('view_count')
        .eq('blog_slug', blogSlug)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      return data?.view_count || 0;
    } catch (error) {
      console.warn('Error fetching blog views:', error);
      return 0;
    }
  },

  // Increment blog post view count
  async incrementBlogViews(blogSlug: string): Promise<void> {
    try {
      // First, try to get existing view count
      const { data: existingData, error: fetchError } = await supabase
        .from('blog_views')
        .select('view_count')
        .eq('blog_slug', blogSlug)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('blog_views')
          .update({
            view_count: existingData.view_count + 1,
            updated_at: new Date().toISOString()
          })
          .eq('blog_slug', blogSlug);

        if (error) throw error;
      } else {
        // Create new record
        const { error } = await supabase
          .from('blog_views')
          .insert({
            blog_slug: blogSlug,
            view_count: 1
          });

        if (error) throw error;
      }
    } catch (error) {
      console.warn('Error incrementing blog views:', error);
      // Don't throw error to avoid breaking the page load
    }
  }
};
