# Formspree Setup Guide

This guide will help you set up Formspree for the contact form in your portfolio.

## Step 1: Create a Formspree Account

1. Go to [Formspree](https://formspree.io/) and sign up for a free account.
2. Verify your email address.

## Step 2: Create a New Form

1. In your Formspree dashboard, click "New Form".
2. Give your form a name (e.g., "Portfolio Contact Form").
3. Enter your email address where you want to receive messages.
4. Click "Create Form".

## Step 3: Get Your Form ID

1. After creating the form, you'll see your form endpoint.
2. It will look like: `https://formspree.io/f/YOUR_FORM_ID`
3. Copy the form ID (the part after `/f/`).

## Step 4: Update Your .env File

Replace the placeholder value in your `.env` file with your actual form ID:

```env
VITE_FORMSPREE_FORM_ID=your_actual_form_id
```

For example, if your endpoint is `https://formspree.io/f/xyzabc123`, then:
```env
VITE_FORMSPREE_FORM_ID=xyzabc123
```

## Step 5: Test Your Contact Form

1. Run your development server: `npm run dev`
2. Fill out the contact form and submit.
3. Check your email for the message.
4. The first submission will require email verification.

## Formspree Features

- **Free Plan**: 50 submissions per month
- **No backend required**: Works directly from your frontend
- **Spam protection**: Built-in reCAPTCHA and honeypot
- **File uploads**: Supported on paid plans
- **Custom redirects**: Configure thank you pages
- **Webhooks**: Integrate with other services

## Important Notes

- Never commit your `.env` file to version control.
- The form will work on localhost for testing.
- First submission requires email verification.
- You can customize email notifications in Formspree dashboard.

## Troubleshooting

If emails aren't being received:
1. Check the browser console for errors.
2. Verify the form ID is correct in your `.env` file.
3. Check your Formspree dashboard for submissions.
4. Make sure you've verified your email address.
5. Check your spam folder.
