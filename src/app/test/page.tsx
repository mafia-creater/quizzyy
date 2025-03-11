'use client'
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestSession() {
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            console.log("🔹 Session:", data.session);
            console.log("🔹 Error:", error);
            setSession(data.session);
            setError(error);
        };

        getSession();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>🔍 Supabase Session Debug</h1>
            <h3>Session Data:</h3>
            <pre>{JSON.stringify(session, null, 2)}</pre>

            <h3>Error (if any):</h3>
            <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
    );
}
