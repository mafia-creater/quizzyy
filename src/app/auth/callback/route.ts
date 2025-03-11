// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  console.log('Callback URL:', request.url);
  
  if (code) {
    try {
      // Create a cookie store properly
      const cookieStore = cookies();
      
      // This is crucial - we need to create the client correctly
      const supabase = createRouteHandlerClient({ 
        cookies: () => cookieStore 
      });
      
      console.log('Exchanging code for session:', code);
      
      // The key fix is here - using await properly
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      
      if (error) {
        console.error('Error exchanging code for session:', error);
        return NextResponse.redirect(new URL('/auth?error=exchange_error&message=' + encodeURIComponent(error.message), request.url));
      }
      
      console.log('Session established successfully');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (err: any) {
      console.error('Exception in callback handler:', err);
      return NextResponse.redirect(new URL('/auth?error=callback_exception&message=' + encodeURIComponent(err.message || 'Unknown error'), request.url));
    }
  }
  
  console.error('No code found in callback URL');
  return NextResponse.redirect(new URL('/auth?error=no_code', request.url));
}