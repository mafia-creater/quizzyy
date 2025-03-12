"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase-browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [sessionChecked, setSessionChecked] = useState(false);
  const router = useRouter();
  
  // Check if already authenticated
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          return;
        }
        
        if (data.session) {
          console.log("User already has a session, redirecting to dashboard");
          router.push("/dashboard");
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setSessionChecked(true);
      }
    };
    
    checkSession();
  }, [router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Sign in with email/password
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast.success("Successfully signed in!");
        router.push("/dashboard");
        router.refresh(); // Force a refresh to update server components
      } else {
        // Validate password
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long.");
          setIsLoading(false);
          return;
        }

        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (error) throw error;
        
        // Check if email confirmation is needed
        if (data.user && !data.session) {
          toast.success(
            "Check your email for a confirmation link to complete your registration.",
            { duration: 6000 }
          );
        } else if (data.session) {
          // Auto-confirmed (development or email confirmation disabled)
          toast.success("Account created successfully!");
          router.push("/dashboard");
          router.refresh();
        }
      }
    } catch (error: any) {
      console.error("Authentication error:", error);
  const errorMsg = error.message.toLowerCase();

  if (errorMsg.includes("invalid login credentials")) {
    toast.error("Invalid email or password. Please try again.");
  } else if (errorMsg.includes("email not confirmed")) {
    toast.error("Please check your email to confirm your account before signing in.");
  } else if (errorMsg.includes("already registered")) {
    toast.error("This email is already registered. Please sign in instead.");
    setIsLogin(true);
  } else {
    toast.error(error.message);
  }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      // Redirect handled by Supabase OAuth
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  // Don't render until we've checked for an existing session
  if (!sessionChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-600" />
      </div>
    );
  }

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
                  disabled={isLoading}
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
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? "Signing in..." : "Signing up..."}
                  </>
                ) : (
                  isLogin ? "Sign in" : "Sign up"
                )}
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
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
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
              )}
              Continue with Google
            </Button>
          </CardContent>
          <CardFooter>
            <Button
              variant="link"
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
              disabled={isLoading}
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}