# Supabase Setup (Shared Backend)

The website now saves questionnaire and proposal answers to Supabase so you can view her responses from any device.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project
3. Wait for the project to finish provisioning

## 2. Create the Database Table

1. In the Supabase dashboard, go to **SQL Editor**
2. Click **New query** and paste this SQL:

```sql
-- Create the table for valentine submissions
create table valentine_submissions (
  id text primary key default 'main',
  answers jsonb,
  valentine_answer text,
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table valentine_submissions enable row level security;

-- Allow form submissions (insert/update from anyone visiting the site)
create policy "Allow anonymous insert" on valentine_submissions
  for insert to anon with check (true);

create policy "Allow anonymous update" on valentine_submissions
  for update to anon using (true) with check (true);

-- Allow reading (for admin dashboard - protected by password on your end)
create policy "Allow anonymous read" on valentine_submissions
  for select to anon using (true);
```

3. Click **Run** to execute

## 3. Get Your API Keys

1. Go to **Project Settings** (gear icon) → **API**
2. Copy:
   - **Project URL** → use as `VITE_SUPABASE_URL`
   - **anon public** key → use as `VITE_SUPABASE_ANON_KEY`

## 4. Add Environment Variables

1. Create a file named `.env` in the project root (copy from `.env.example`)
2. Add your values:

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Important**: Add `.env` to your `.gitignore` if it isn't already (to keep your keys private)

## 5. For Production Deployment (Netlify, Vercel, etc.)

Add the same environment variables in your hosting platform's settings:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Then redeploy. Vite will bake these into the build at build time.

## Fallback Behavior

If Supabase is not configured (no `.env` or env vars), the site falls back to **localStorage only** and works as before—but answers will only be visible on the device that submitted them.
