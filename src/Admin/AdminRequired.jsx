import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function AdminRequired({ session }) {
    const [isAdmin, setIsAdmin] = useState(null);
    const [isAdminDelayed, setIsAdminDelayed] = useState(false);

    useEffect(() => {
        let delayTimer;

        const checkAdminStatus = async () => {
            try {
                if (session) {
                    const { data, error } = await supabase
                        .from('clients')
                        .select('isAdmin')
                        .eq('id', session.user.id)
                        .single();

                    if (error) {
                        console.error("Error checking admin status:", error);
                        setIsAdmin(false); // Set isAdmin to false in case of an error
                    } else {
                        setIsAdmin(data?.isAdmin === true);
                    }
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
                setIsAdmin(false); // Set isAdmin to false in case of an error
            }
        };

        // Delay setting isAdminDelayed to true for 1 second
        delayTimer = setTimeout(() => {
            setIsAdminDelayed(true);
        }, 2000);

        checkAdminStatus();

        return () => {
            clearTimeout(delayTimer); // Clear the timer when the component unmounts
        };
    }, [session]);


    if (isAdminDelayed && isAdmin === null) {
        // Set isAdmin to false after the delay
        setIsAdmin(false);
        return <p>Loading data...</p>;
    }

    if (isAdmin === null) {
        // wait for useEffect to populate isAdmin
        return
    }

    if (!isAdmin) {
        return (
            <Navigate
                to="/login"
                state={{ message: "Please log in as an admin to continue" }}
            />
        );
    }

    return <Outlet />;
}
