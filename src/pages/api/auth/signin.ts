import type { APIRoute } from 'astro';
import supabase from '../../../utils/supabase';

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get('email')?.toString();

  if (!email) {
    return new Response('Email are required', { status: 400 });
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect(`/auth/verify-otp?email=${email}`);
};
