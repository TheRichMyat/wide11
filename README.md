# Wide-Eleven Co., Ltd. — Website

Premium interior design & construction company website built with Next.js, Supabase, and Resend.

## Features
- Portfolio with multi-image gallery (up to 15 images per project)
- Admin panel with Supabase Auth (email/password)
- Image uploads to Supabase Storage
- Contact form sends email via Resend API
- English / Thai translation
- Light / Dark mode
- Fully responsive

## Tech Stack
- **Frontend:** Next.js 14 (App Router), React 18
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage
- **Email:** Resend API
- **Deployment:** Netlify

---

## Setup Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env.local`
Copy `.env.example` to `.env.local` and fill in your keys:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXTAUTH_SECRET=generate-a-random-secret
RESEND_API_KEY=re_your-key
RESEND_FROM_EMAIL=onboarding@resend.dev
CONTACT_TO_EMAIL=wide11bangkok@gmail.com
ADMIN_BOOTSTRAP_EMAIL=your-admin@email.com
ADMIN_BOOTSTRAP_PASSWORD=YourSecurePassword!
```

### 3. Set Up Database
Run the setup script to get the SQL:
```bash
npm run setup-db
```

Copy the SQL output and paste it into **Supabase Dashboard > SQL Editor > New Query**, then click **Run**.

### 4. Create Admin User
```bash
npm run create-admin
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

Admin panel: click "Admin" in the footer, login with your email/password.

---

## Deployment to Netlify

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/wide-eleven.git
git push -u origin main
```

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com) > Add new site > Import from Git
2. Select your GitHub repo
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables (same as .env.local) in Netlify dashboard > Site settings > Environment variables

### 3. Install Netlify Next.js Plugin
Add to `netlify.toml` (included in this project):
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Security Notes
- **Never commit `.env.local`** — it contains secret keys
- The `SUPABASE_SERVICE_ROLE_KEY` has full database access — keep it server-side only
- All admin API routes verify the JWT token before processing
- Row Level Security (RLS) is enabled on all tables
- Security headers are added via middleware
- After initial setup, **rotate all keys** that were ever shared in plain text
- Change the admin password after first login

---

## Project Structure
```
wide-eleven/
├── app/
│   ├── api/
│   │   ├── auth/callback/route.js  — Login endpoint
│   │   ├── contact/route.js        — Email via Resend
│   │   ├── projects/route.js       — CRUD projects
│   │   ├── clients/route.js        — CRUD clients
│   │   ├── categories/route.js     — CRUD categories
│   │   └── upload/route.js         — Image upload
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   └── Website.js                  — Full frontend
├── lib/
│   ├── api-client.js               — Frontend API helper
│   ├── auth.js                     — Token verification
│   ├── supabase-browser.js         — Browser client
│   └── supabase-server.js          — Server client
├── scripts/
│   ├── setup-db.mjs                — DB schema generator
│   └── create-admin.mjs            — Admin user creator
├── middleware.js                    — Security headers
├── .env.example
├── .gitignore
├── next.config.js
├── netlify.toml
└── package.json
```
