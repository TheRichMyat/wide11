-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query)

create table if not exists public.job_vacancies (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  department text,
  location text,
  description text,
  requirements text,
  apply_email text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.job_vacancies enable row level security;

-- Anyone can read all job vacancies (API will filter active-only for public)
create policy "Public read job vacancies"
  on public.job_vacancies for select
  using (true);

-- Only authenticated admins can insert / update / delete
create policy "Admin insert job vacancies"
  on public.job_vacancies for insert
  with check (auth.role() = 'authenticated');

create policy "Admin update job vacancies"
  on public.job_vacancies for update
  using (auth.role() = 'authenticated');

create policy "Admin delete job vacancies"
  on public.job_vacancies for delete
  using (auth.role() = 'authenticated');
