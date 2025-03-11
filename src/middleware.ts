// src/middleware.ts
import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    console.log('Middleware invoked for:', req.nextUrl.pathname);
    const res = NextResponse.next();
    
    try {
        const supabase = createMiddlewareClient({ req, res });
        
        const {
            data: { session },
            error,
        } = await supabase.auth.getSession();
        
        if (error) {
            console.error('Error getting session in middleware:', error);
        }
        console.log('Full Session:', session);

        console.log('Session:', session ? `User ID: ${session.user.id}` : 'No session');

        // Check auth status
        const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
        const isApiRoute = req.nextUrl.pathname.startsWith('/api');
        const isPublicRoute = req.nextUrl.pathname === '/';
        const isCallbackRoute = req.nextUrl.pathname === '/auth/callback' || 
                               req.nextUrl.pathname === '/auth/oauth-callback';

        console.log('Route checks:', { isAuthPage, isApiRoute, isPublicRoute, isCallbackRoute });

        // Always allow callback routes to proceed
        if (isCallbackRoute) {
            console.log('Allowing callback route');
            return res;
        }

        // Redirect unauthenticated users to auth page
        if (!session && !isAuthPage && !isPublicRoute && !isApiRoute) {
            console.log('Redirecting to /auth - No session');
            const redirectUrl = new URL('/auth', req.url);
            return NextResponse.redirect(redirectUrl);
        }

        // Redirect authenticated users away from auth page
        if (session && isAuthPage && !isCallbackRoute) {
            console.log('Redirecting to /dashboard - Has session');
            const redirectUrl = new URL('/dashboard', req.url);
            return NextResponse.redirect(redirectUrl);
        }

        return res;
    } catch (err) {
        console.error('Middleware exception:', err);
        // Return the normal response on error to avoid breaking the app
        return res;
    }
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};