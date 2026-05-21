import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase-server';
import { verifyAdmin } from '@/lib/auth';

// GET /api/account — return the signed-in admin's current user record
export async function GET(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ id: user.id, email: user.email });
}

// PUT /api/account — update the signed-in admin's email or password
// Body: { email?: string, password?: string }
//
// Both updates use the admin API for an instant in-place change. No
// confirmation email is dispatched — the signed-in admin is trusted.
// (Supabase's confirmation-link flow requires a custom SMTP setup and
// only works reliably for production. For an admin self-service tool
// the instant change is simpler and matches what most CMS panels do.)
export async function PUT(request) {
  const user = await verifyAdmin(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const updates = {};
  if (typeof body.email === 'string' && body.email.trim()) {
    updates.email = body.email.trim();
    updates.email_confirm = true; // mark new email as already confirmed
  }
  if (typeof body.password === 'string' && body.password.length >= 6) {
    updates.password = body.password;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data, error } = await supabase.auth.admin.updateUserById(user.id, updates);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ id: data.user.id, email: data.user.email });
}
