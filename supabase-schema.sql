CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_slug TEXT NOT NULL,
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  likes INTEGER DEFAULT 0 NOT NULL,
  liked_by TEXT[] DEFAULT '{}' NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_blog_slug ON comments(blog_slug);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Anyone can read comments" ON comments
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert comments" ON comments
  FOR INSERT WITH CHECK (true);


CREATE POLICY "Anyone can update likes" ON comments
  FOR UPDATE USING (true)
  WITH CHECK (true);


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS blog_loves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(blog_slug, user_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_loves_blog_slug ON blog_loves(blog_slug);
CREATE INDEX IF NOT EXISTS idx_blog_loves_user_id ON blog_loves(user_id);

ALTER TABLE blog_loves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog loves" ON blog_loves
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert blog loves" ON blog_loves
  FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS blog_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_slug TEXT NOT NULL UNIQUE,
  view_count INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE blog_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog views" ON blog_views
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert blog views" ON blog_views
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update blog views" ON blog_views
  FOR UPDATE USING (true)
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS blog_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_slug TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(blog_slug, user_id)
);

CREATE INDEX IF NOT EXISTS idx_blog_likes_blog_slug ON blog_likes(blog_slug);
CREATE INDEX IF NOT EXISTS idx_blog_likes_user_id ON blog_likes(user_id);

ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blog likes" ON blog_likes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert blog likes" ON blog_likes
  FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS photo_loves (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_id INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(photo_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_photo_loves_photo_id ON photo_loves(photo_id);
CREATE INDEX IF NOT EXISTS idx_photo_loves_user_id ON photo_loves(user_id);

ALTER TABLE photo_loves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read photo loves" ON photo_loves
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert photo loves" ON photo_loves
  FOR INSERT WITH CHECK (true);
