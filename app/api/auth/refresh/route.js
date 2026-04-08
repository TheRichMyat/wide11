import { NextResponse } from 'next/server';
import { createAnonServerClient } from '@/lib/supabase-server';

export async function POST(request) {
  try {
    const { refresh_token } = await request.json();

    if (!refresh_token) {
      return NextResponse.json({ error: 'Refresh token required' }, { status: 400 });
    }

    const supabase = createAnonServerClient();
    const { data, error } = await supabase.auth.refreshSession({ refresh_token });

    if (error || !data.session) {
      return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: data.user.id,
        email: data.user.email,
      },
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at,
    });
  } catch (err) {
    console.error('Refresh error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
