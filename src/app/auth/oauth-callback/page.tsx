"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function OAuthCallback() {
  const [status, setStatus] = useState('Processing authentication...');
  const router = useRouter();
  
  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        setStatus('Checking session status...');
        
        // Get the current session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data.session) {
          // We have a valid session, redirect to dashboard
          setStatus('Authentication successful! Redirecting to dashboard...');
          setTimeout(() => router.push('/dashboard'), 1000);
        } else {
          // Process hash-based authentication if present
          if (window.location.hash) {
            setStatus('Processing authentication from URL...');
            
            // Let Supabase process the hash
            const { error } = await supabase.auth.getUser();
            
            if (error) {
              throw error;
            }
            
            // Check again for session after processing
            const { data: sessionData } = await supabase.auth.getSession();
            
            if (sessionData.session) {
              setStatus('Session established! Redirecting...');
              setTimeout(() => router.push('/dashboard'), 1000);
            } else {
              throw new Error('Failed to establish session');
            }
          } else {
            // No hash and no session
            throw new Error('No authentication data found');
          }
        }
      } catch (error: any) {
        console.error('Error in OAuth callback:', error);
        setStatus(`Authentication error: ${error.message || 'Unknown error'}`);
        
        // Redirect back to auth page after displaying error
        setTimeout(() => {
          router.push(`/auth?error=oauth_callback_failed&message=${encodeURIComponent(error.message)}`);
        }, 3000);
      }
    };
    
    handleOAuthCallback();
  }, [router]);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-slate-900 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold">Authentication in Progress</h1>
        <p className="text-slate-600">{status}</p>
      </div>
    </div>
  );
}