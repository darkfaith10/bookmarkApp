Bookmark App (Next.js + Supabase)

A simple bookmark manager where users can sign in with Google, add private bookmarks, and see updates in real time across tabs.

This project was built using Next.js App Router, Supabase (Auth, Database, Realtime), and Tailwind CSS, and deployed on Vercel.

🚀 Features

- Google OAuth login (no email/password)
- Private bookmarks per user (Row Level Security)
- Add & delete bookmarks
- Realtime updates across multiple tabs
- Optimistic UI for instant feedback
- Deployed on Vercel

Problems Faced & How I Solved Them
1️⃣ Module Not Found Errors (Supabase Client)

Problem:
Next.js kept throwing Module not found errors even though the file existed.
Cause:
Hidden spaces in the filename on macOS (supabaseClient.js )
Incorrect relative import paths
App Router being strict about filesystem structure
Solution:
Renamed files to remove hidden characters
Ensured consistent imports from lib/supabaseClient.js
Cleared .next cache and restarted the dev server


2️⃣ Google OAuth 400 Errors

Problem:
Google login failed with 400 Bad Request or Unsupported provider.
Cause:
Google provider was not enabled in Supabase
Redirect URL was pointing directly to /dashboard
Callback URL was not whitelisted
Solution:
Enabled Google provider in Supabase Auth
Added correct redirect URLs
Introduced /auth/callback route to exchange auth code


3️⃣ 404 After Successful Login

Problem:
Login succeeded, but /dashboard returned 404.
Cause:
File was named pages.js instead of page.js
App Router only recognizes page.js
Solution:
Renamed file to page.js
Restarted the dev server.




This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
