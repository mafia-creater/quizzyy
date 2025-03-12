// app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    
    if (!code) {
      console.error('Auth callback triggered but no code found.');
      return NextResponse.redirect(new URL('/auth?error=no_code', requestUrl.origin));
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name, options) {
            cookieStore.set({ name, value: '', ...options, maxAge: 0 });
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      return NextResponse.redirect(
        new URL(`/auth?error=exchange_error&message=${encodeURIComponent(error.message)}`, requestUrl.origin)
      );
    }

    console.log('Session established successfully');
    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin));
  } catch (err) {
    console.error('Exception in callback handler:', err);
    return NextResponse.redirect(
      new URL(`/auth?error=callback_exception&message=${encodeURIComponent(err.message || 'Unknown error')}`, request.url)
    );
  }
}