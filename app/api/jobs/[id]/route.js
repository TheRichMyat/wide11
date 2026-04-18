import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/auth';

// GET /api/jobs/[id] — public, single job (any active status)
export async function GET(request, { params }) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('job_vacancies')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/jobs/[id] — admin only, update job
export async function PUT(request, { params }) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from('job_vacancies')
    .update({
      title: body.title,
      department: body.department || '',
      location: body.location || '',
      description: body.description || '',
      requirements: body.requirements || '',
      apply_email: body.apply_email || '',
      is_active: body.is_active !== undefined ? body.is_active : true,
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/jobs/[id] — admin only
export async function DELETE(request, { params }) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServerClient();
  const { error } = await supabase
    .from('job_vacancies')
    .delete()
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
