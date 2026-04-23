import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/auth';

// GET /api/projects/[id] — public
export async function GET(request, { params }) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/projects/[id] — admin only
export async function PUT(request, { params }) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('projects')
    .update({
      name: body.name,
      category: body.category,
      year: body.year,
      period: body.period || '',
      scope: body.scope,
      client: body.client,
      location: body.location,
      area: body.area || '',
      cost: body.cost,
      image: body.image,
      gallery: body.gallery || [],
      before_after: body.before_after || [],
      description: body.description,
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

// DELETE /api/projects/[id] — admin only
export async function DELETE(request, { params }) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
