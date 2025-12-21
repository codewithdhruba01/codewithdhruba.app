# Supabase Setup Guide for Blog Comments

This guide will help you set up Supabase for the blog comment system with real-time likes and replies.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - **Name**: `blog-comments` (or any name you prefer)
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Wait for the project to be created (usually takes 2-3 minutes)

## Step 2: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the entire content from `supabase-schema.sql` file
3. Click **Run** to execute the SQL

This will create:
- `comments` table with all necessary columns
- Indexes for performance
- Row Level Security (RLS) policies for public access
- Triggers for automatic timestamp updates

## Step 3: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public** key: `your-anon-key`

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in your project root (next to `package.json`)
2. Copy the content from `env-template.txt` and fill in your values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 5: Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Visit any blog post on your site
3. Try adding a comment - it should save to Supabase
4. Try liking comments - likes should update in real-time
5. Open the same blog post in another browser tab and verify real-time updates work

## Database Structure

### Comments Table Schema:
- `id`: UUID (Primary Key)
- `blog_slug`: TEXT (Which blog post the comment belongs to)
- `author`: TEXT (Commenter's name)
- `content`: TEXT (Comment text)
- `created_at`: TIMESTAMP (Auto-generated)
- `updated_at`: TIMESTAMP (Auto-updated)
- `likes`: INTEGER (Like count)
- `liked_by`: TEXT[] (Array of user IDs who liked)
- `parent_id`: UUID (For replies, references parent comment)

## Security Features

- **Row Level Security (RLS)**: Enabled for public read/write access
- **No Authentication Required**: Comments are anonymous (you can add auth later)
- **Input Validation**: Frontend validates required fields

## Real-time Features

- **Live Comment Updates**: New comments appear instantly across all browsers
- **Real-time Likes**: Like counts update immediately
- **Automatic UI Updates**: No page refresh needed

## Customization Options

### Add User Authentication (Optional)
If you want to add user accounts later, you can:

1. Install Supabase Auth: `npm install @supabase/auth-ui-react`
2. Modify the `userId` generation in `CommentsSection.tsx`
3. Update RLS policies to restrict anonymous posting

### Moderate Comments (Optional)
To add comment moderation:

1. Add an `approved` boolean column to the comments table
2. Update RLS policies to only show approved comments
3. Create an admin panel to approve/reject comments

## Troubleshooting

### Comments not saving:
- Check your `.env.local` file has correct Supabase credentials
- Verify the database table was created correctly
- Check browser console for error messages

### Real-time not working:
- Ensure your Supabase project allows real-time connections
- Check that the table has RLS enabled
- Verify the channel subscription is working (check browser network tab)

### Environment variables not loading:
- Make sure the file is named `.env.local` (not `.env`)
- Restart your development server after adding environment variables
- Check that variable names match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

## Production Deployment

When deploying to production:

1. Update your Supabase project URL and keys for production
2. Consider adding rate limiting for comment posting
3. Set up monitoring for your Supabase usage
4. Consider upgrading your Supabase plan based on usage
