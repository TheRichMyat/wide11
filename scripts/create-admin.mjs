// Run: node scripts/create-admin.mjs
// Creates the admin user in Supabase Auth

import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

// Read .env.local manually
function loadEnv() {
  try {
    const content = readFileSync('.env.local', 'utf8');
    const vars = {};
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.substring(0, eqIdx).trim();
      const val = trimmed.substring(eqIdx + 1).trim();
      vars[key] = val;
    }
    return vars;
  } catch {
    console.error('Could not read .env.local — make sure it exists in this folder.');
    process.exit(1);
  }
}

const env = loadEnv();

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function createAdmin() {
  const email = env.ADMIN_BOOTSTRAP_EMAIL;
  const password = env.ADMIN_BOOTSTRAP_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD in .env.local');
    process.exit(1);
  }

  console.log('Creating admin user:', email);

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'admin' }
  });

  if (error) {
    if (error.message.includes('already been registered')) {
      console.log('Admin user already exists. You can login with your credentials.');
    } else {
      console.error('Error:', error.message);
    }
    return;
  }

  console.log('');
  console.log('Admin user created successfully!');
  console.log('User ID:', data.user.id);
  console.log('');
  console.log('You can now login at your website with:');
  console.log('  Email:', email);
  console.log('  Password:', password);
  console.log('');
  console.log('Next step: npm run dev');
}

createAdmin().catch(console.error);
