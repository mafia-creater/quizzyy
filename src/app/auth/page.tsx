// src/app/auth/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Handle error messages from redirects
  useEffect(() => {
    const error = searchParams?.get('error');
    const message = searchParams?.get('message');
    
    if (error) {
      console.error('Auth error:', error, message);
      toast.error(message || `Authentication error: ${error}`);
    }
  }, [searchParams]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        console.log("Attempting to sign in with email:", email);
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        console.log("Sign in response:", data);
        
        if (data.session) {
          toast.success("Welcome back! You've been successfully logged in.");
          router.push("/dashboard");
        } else {
          throw new Error("Failed to establish session");
        }
      } else {
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long.");
          return;
        }

        console.log("Attempting to sign up with email:", email);
        
        // For signup, use our client-side callback page
        const redirectTo = `${window.location.origin}/auth/oauth-callback`;
        console.log("Using redirect URL for signup:", redirectTo);
        
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo,
          },
        });

        if (error) throw error;
        
        console.log("Sign up response:", data);
        
        // Handle different sign-up scenarios
        if (data.user?.identities?.length === 0) {
          toast.error("This email is already registered. Please sign in instead.");
          setIsLogin(true);
        } else if (data.user && !data.session) {
          toast.success(
            "Check your email. We've sent you a confirmation link to complete your registration.",
            { duration: 6000 }
          );
        } else if (data.session) {
          // User was auto-confirmed
          router.push("/dashboard");
          toast.success("Account created successfully!");
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
      toast.error("Authentication error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      // Use the client-side callback for Google auth
      const redirectTo = `${window.location.origin}/auth/oauth-callback`;

      console.log("Using redirect URL for Google:", redirectTo);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo,
        },
      });

      if (error) throw error;
      
      console.log("Google auth initiated:", data);
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in error: " + error.message);
      setIsLoading(false);
    }
  };

  // Check if already authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        console.log("User already has a session, redirecting to dashboard");
        router.push("/dashboard");
      }
    };
    
    checkSession();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">QuizApp</h1>
          <p className="mt-2 text-sm text-slate-600">Create, share, and take quizzes with ease</p>
        </div>

        <Card className="border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle>{isLogin ? "Sign in to your account" : "Create a new account"}</CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your credentials to access your dashboard" 
                : "Fill in the details below to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
              </Button>
            </form>
            
            <div className="mt-4 flex items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="mx-2 text-xs text-slate-500">OR</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>
            
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={handleGoogleAuth}
              disabled={isLoading}
              aria-label="Continue with Google"
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </Button>
          </CardContent>
          <CardFooter>
            <Button
              variant="link"
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}