// middleware.ts
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Create a new supabase client for each request
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name, options) {
          res.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          });
        },
      },
    }
  );

  // Check auth status
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Middleware auth error:', error);
  }

  // Define route types
  const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  const isPublicPage = ['/', '/about', '/contact'].includes(req.nextUrl.pathname);
  const isApiRoute = req.nextUrl.pathname.startsWith('/api');
  const isCallbackRoute = req.nextUrl.pathname.includes('/auth/callback');

  // Handle authenticated routes
  if (!session && !isAuthPage && !isPublicPage && !isApiRoute && !isCallbackRoute) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Prevent authenticated users from accessing auth pages
  if (session && isAuthPage && !isCallbackRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

// Specify which routes middleware applies to
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.svg).*)'],
};