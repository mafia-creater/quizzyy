// src/app/auth/handle-hash-callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function HandleHashCallback() {
    const [message, setMessage] = useState("Processing authentication...");
    const router = useRouter();

    useEffect(() => {
        const handleHash = async () => {
            try {
                // The hash contains the access token and other auth data
                const hash = window.location.hash;
                
                console.log("Handling hash callback:", hash);
                
                if (!hash) {
                    console.log("No hash found in URL");
                    setMessage("No authentication data found.");
                    setTimeout(() => router.push("/auth"), 2000);
                    return;
                }
                
                // Check if we have session data already in the hash
                if (hash.includes("access_token")) {
                    console.log("Hash contains access token");
                    // We need to manually restore a session
                    setMessage("Setting up your session...");
                    
                    // Simulate a URL with hash params
                    const hashParams = new URLSearchParams(hash.substring(1));
                    
                    // Extract auth data
                    const accessToken = hashParams.get("access_token");
                    const refreshToken = hashParams.get("refresh_token");
                    const expiresIn = parseInt(hashParams.get("expires_in") || "0", 10);
                    const expiresAt = parseInt(hashParams.get("expires_at") || "0", 10);
                    const tokenType = hashParams.get("token_type");
                    const type = hashParams.get("type");  // signup or recovery or invite
                    
                    console.log("Extracted auth data:", {
                        accessToken,
                        refreshToken,
                        expiresIn,
                        expiresAt,
                        tokenType,
                        type,
                    });
                    
                    if (!accessToken || !refreshToken) {
                        console.log("Incomplete authentication data");
                        throw new Error("Incomplete authentication data");
                    }
                    
                    console.log("Setting session with tokens");
                    
                    // Set the session directly
                    const { data, error } = await supabase.auth.setSession({
                        access_token: accessToken,
                        refresh_token: refreshToken,
                    });
                    
                    if (error) {
                        console.log("Error setting session:", error);
                        throw error;
                    }
                    
                    if (data.session) {
                        console.log("Session set successfully");
                        setMessage("Authentication successful! Redirecting...");
                        setTimeout(() => router.push("/dashboard"), 1000);
                    } else {
                        console.log("Failed to establish session");
                        throw new Error("Failed to establish session");
                    }
                } else {
                    console.log("Invalid authentication data in hash");
                    setMessage("Invalid authentication data");
                    setTimeout(() => router.push("/auth"), 2000);
                }
            } catch (error) {
                console.error("Error handling hash callback:", error);
                setMessage(`Authentication error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                setTimeout(() => router.push("/auth"), 3000);
            }
        };

        handleHash();
    }, [router]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
            <div className="w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4">Authentication in progress</h1>
                <p className="text-slate-600">{message}</p>
            </div>
        </div>
    );
}