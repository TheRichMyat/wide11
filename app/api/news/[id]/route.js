import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/auth';

// GET /api/news/[id] — public
export async function GET(request, { params }) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/news/[id] — admin only
export async function PUT(request, { params }) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('news')
    .update({
      title: body.title,
      excerpt: body.excerpt,
      body: body.body,
      category: body.category,
      date: body.date,
      image: body.image,
      is_published: body.is_published !== undefined ? body.is_published : true,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/news/[id] — admin only
export async function DELETE(request, { params }) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
