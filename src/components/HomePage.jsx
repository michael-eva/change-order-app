import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function HomePage({ session }) {

    const [isClient, setIsClients] = useState([])

    useEffect(() => {
        if (session) {
            const loadClients = async () => {
                const { data } = await supabase
                    .from('clients')
                    .select('id')
                    .eq('id', session?.user.id)
                if (data) {

                    setIsClients(data)
                }
            }
            loadClients()
        }
    }, [session])

    if (session?.user.role === "authenticated") {
        if (isClient) {
            return <Navigate to={'/client-portal'} />;
        } else {
            return <Navigate to={'/signup-form'} />;
        }
    } else {
        return <Navigate to={'/login'} />;
    }
}


