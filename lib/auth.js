import { createClient } from '@supabase/supabase-js';

export async function verifyAdmin(request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('Auth: Missing or invalid Authorization header');
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  // Use service role key (server-side only) for reliable token verification
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    console.error('Auth: getUser failed —', error?.message || 'no user returned');
    return null;
  }

  return user;
}
