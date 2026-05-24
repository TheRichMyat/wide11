import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/auth';

// GET /api/news
//   default: returns only published items (public)
//   ?all=true: returns all items including drafts (admin only)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const wantAll = searchParams.get('all') === 'true';

  if (wantAll) {
    const user = await verifyAdmin(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const supabase = createServerClient();
  let query = supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });

  if (!wantAll) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/news — admin only, create new news article
export async function POST(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('news')
    .insert({
      title: body.title,
      excerpt: body.excerpt,
      body: body.body,
      category: body.category,
      date: body.date,
      image: body.image,
      is_published: body.is_published !== undefined ? body.is_published : true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
