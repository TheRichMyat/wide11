-- Wide-Eleven — News table
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Creates the news table, RLS policies, and seeds 4 starting articles.

create table if not exists public.news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text not null,
  body text not null,
  category text not null,
  date text not null,
  image text not null,
  is_published boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Row Level Security
alter table public.news enable row level security;

-- Public can read everything; the API filters to is_published for the website,
-- and the admin panel needs to see drafts too.
create policy "Public read news"
  on public.news for select
  using (true);

create policy "Admin insert news"
  on public.news for insert
  with check (auth.role() = 'authenticated');

create policy "Admin update news"
  on public.news for update
  using (auth.role() = 'authenticated');

create policy "Admin delete news"
  on public.news for delete
  using (auth.role() = 'authenticated');

-- Explicit Data API grants (required for tables created on or after
-- October 30, 2026 — harmless on older projects where it's already default).
grant select on public.news to anon, authenticated;
grant insert, update, delete on public.news to authenticated;

-- Seed: the 4 demo articles currently hardcoded on the site.
-- Inserted with staggered created_at so they sort newest-first in display order.
insert into public.news (title, excerpt, body, category, date, image, is_published, created_at)
values
  (
    'Wide-Eleven Completes Premium Suite Renovation at Park Hyatt Bangkok',
    'Our team has successfully delivered a full interior fit-out for the Presidential Suite, combining contemporary luxury with timeless craftsmanship across 380 square meters of refined living space.',
    E'After eight months of meticulous craftsmanship, Wide-Eleven has completed the comprehensive renovation of the Presidential Suite at Park Hyatt Bangkok, a landmark project that reaffirms our commitment to luxury hospitality interiors.\n\nThe 380-square-meter suite features bespoke joinery in walnut and brass, custom-designed lighting that adapts to time of day, and floor-to-ceiling glazing that frames panoramic city views. Every surface, from the imported Italian marble bathroom to the hand-stitched leather headboards, was selected to embody Park Hyatt''s standard of understated elegance.\n\nOur team coordinated closely with the hotel''s design consultants and operations team to ensure zero disruption to neighboring guest experiences during the renovation. The result is a suite that quietly raises the standard for luxury accommodation in Bangkok.\n\nWe extend our gratitude to the Park Hyatt Bangkok team for their continued trust, and to our craftspeople whose patience and precision made this project possible.',
    'PROJECT COMPLETED',
    'March 15, 2026',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
    true,
    now()
  ),
  (
    'Wide-Eleven Featured in Thailand Tatler Homes 2026 Annual Edition',
    'Our residential project in Sukhumvit has been selected as a featured case study in this year''s Thailand Tatler Homes magazine, recognized for outstanding craftsmanship and design integration.',
    E'We are honored to share that one of our recently completed residential projects has been featured in the 2026 annual edition of Thailand Tatler Homes magazine, alongside the country''s most distinguished interior design work.\n\nThe featured project — a private residence on Sukhumvit Soi 39 — was selected for its careful balance of modern Thai design sensibilities with international luxury standards. The eight-page editorial spread highlights our team''s work on custom millwork, the integration of locally sourced materials, and a lighting design that the editors described as "quietly sculptural."\n\nBeing recognized by Thailand Tatler is a meaningful milestone for our team. Over the past twelve years, Wide-Eleven has focused on delivering work that speaks for itself rather than chasing recognition, which makes moments like these all the more rewarding.\n\nWe thank the homeowner for their trust throughout the project, and the Tatler editorial team for their thoughtful coverage of our work.',
    'AWARDS & RECOGNITION',
    'February 28, 2026',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    true,
    now() - interval '1 minute'
  ),
  (
    'Celebrating 12 Years of Wide-Eleven — Reflecting on Our Journey',
    'From a small team of three in 2014 to over 80 specialists today, we look back at the projects, partnerships, and people who have shaped Wide-Eleven into the firm we are today.',
    E'Twelve years ago, Wide-Eleven was founded with a simple belief: that great interior design should transform not just spaces, but the way people experience them. Today, as we mark our twelfth anniversary, we reflect on a journey that has taken us from a small workshop in Bang Khun Thian to over 400 completed projects across Thailand and Southeast Asia.\n\nWhat started as a team of three has grown into a firm of more than eighty specialists — designers, project managers, craftsmen, MEP engineers, and support staff — all united by a commitment to quality and craft. Our portfolio spans hotels, residences, offices, and commercial spaces, but the through-line has always been the same: bespoke solutions, executed with care.\n\nWe owe this longevity to the clients who placed their trust in us, the partners who collaborated with us, and the team members who have given their best work to every project. Some of our earliest clients are still with us today, which we consider the truest measure of success.\n\nAs we look ahead, we are committed to building on this foundation — investing in our people, refining our craft, and continuing to deliver work that we are genuinely proud of. Thank you to everyone who has been part of this journey.',
    'COMPANY MILESTONE',
    'February 10, 2026',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80',
    true,
    now() - interval '2 minutes'
  ),
  (
    'The Quiet Return of Craft: Why Hospitality Design is Slowing Down',
    'A reflection on a shift we''ve observed across our hotel and resort projects — clients increasingly value handcrafted detail over trend-driven aesthetics, and what this means for the industry.',
    E'Over the past two years, we have noticed a meaningful shift in how our hospitality clients are approaching interior design. Where once the brief might have called for the latest trend — bold geometric patterns, oversized statement lighting, Instagram-ready moments — the conversation has quietly changed.\n\nToday, the most thoughtful clients are asking for something different: spaces that age gracefully, materials that improve with use, and details that reveal themselves slowly. Handcrafted joinery, natural fibers, locally fired ceramics, and patinated metals are appearing in briefs that, five years ago, would have specified high-gloss finishes and synthetic alternatives.\n\nWe believe this shift reflects a broader recalibration in the luxury hospitality industry. Guests are no longer impressed by spectacle alone; they want spaces that feel grounded, considered, and authentic to their location. The most successful hotels and resorts we have worked with recently are those that have leaned into this trend — embracing imperfection, celebrating local craft, and resisting the temptation to chase what is currently fashionable.\n\nFor our team, this is welcome news. We have always believed that craft is at the heart of meaningful design. It is encouraging to see the industry rediscover what we never stopped valuing.',
    'INDUSTRY INSIGHTS',
    'January 22, 2026',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
    true,
    now() - interval '3 minutes'
  );
