import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function HomePage({ session }) {
    const token = localStorage.getItem("sb-wsolkhiobftucjmfkwkk-auth-token");
    const [isClient, setIsClients] = useState([])

    useEffect(() => {
        if (session) {
            const loadClients = async () => {
                const { data } = await supabase
                    .from('clients')
                    .select('id')
                    .eq('id', session?.user.id)
                if (data) {
                    setIsClients(true)
                }
            }
            loadClients()
        }
    }, [session])

    if (!token) {
        if (isClient) {
            return <Navigate to={'/client-portal'} />;
        } else {
            return <Navigate to={'/signup-form'} />;
        }
    } else {
        return <Navigate to={'/login'} />;
    }
}


