import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/auth';

// GET /api/jobs — public, returns only active jobs
export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('job_vacancies')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/jobs — admin only, create new job
export async function POST(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('job_vacancies')
    .insert({
      title: body.title,
      department: body.department || '',
      location: body.location || '',
      description: body.description || '',
      requirements: body.requirements || '',
      apply_email: body.apply_email || '',
      is_active: body.is_active !== undefined ? body.is_active : true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
