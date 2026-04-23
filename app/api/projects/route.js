import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/auth';

// GET /api/projects — public, fetch all projects
export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/projects — admin only, create new project
export async function POST(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('projects')
    .insert({
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
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
