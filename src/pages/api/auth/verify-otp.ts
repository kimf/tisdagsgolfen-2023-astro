import type { APIRoute } from 'astro';
import supabase from '../../../utils/supabase';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();
  const token = formData.get('token')?.toString();

  if (!email || !token) {
    return new Response('Email and token are required', { status: 400 });
  }

  const { data, error } = await supabase.auth.verifyOtp({
    type: 'email',
    email,
    token,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const { access_token, refresh_token } = data.session;
  cookies.set('sb-access-token', access_token, {
    path: '/',
  });
  cookies.set('sb-refresh-token', refresh_token, {
    path: '/',
  });
  return redirect('/sessions/new');
};
