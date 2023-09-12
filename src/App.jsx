
import { BrowserRouter, Routes, Route } from "react-router-dom"
import supabase from "./config/supabaseClient";
import './index.css';
import ChangeOrderForm from "./pages/ChangeOrderForm";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import OrderHistorySummary from "./components/HostComponents/OrderHistorySummary";
import Layout from "./components/Layout";
import ClientPortalLayout from "./components/CPLayout";
import ClientDetails from "./pages/ClientPortal/ClientDetails";
// import Home from "./pages/Home"; 
import ClientSettings from "./pages/ClientPortal/ClientSettings";
import HostLayout from "./host/HostLayout";
import Clients from "./host/Clients";
import Settings from "./host/Settings";
import PendingOrders from "./host/PendingOrders";
import { useEffect, useState } from "react";
import SignUpForm from "./pages/SignUpForm";
import ClientOrderHistory from "./pages/ClientPortal/ClientOrderHistory";
import UpdateClientDetails from "./pages/ClientPortal/UpdateClientDetails";
import toast, { Toaster } from 'react-hot-toast'
import FloatOrder from "./components/HostComponents/FloatOrderInput";
import NotFound from "./pages/NotFound";
import AuthRequired from "./components/HostComponents/AuthRequired";

export default function App() {
    const [session, setSession] = useState(null)

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            setSession(null);
            sessionStorage.removeItem('session');
            toast.success('Logged out successfully')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    useEffect(() => {
        // Function to update localStorage with the user's login status
        const updateUserLoggedInStatus = (loggedIn) => {
            localStorage.setItem('userIsLoggedIn', JSON.stringify(loggedIn));
        };

        // Fetch the initial session and update the state
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);

            // Set the userIsLoggedIn status in localStorage to true when a session is present
            if (session) {
                updateUserLoggedInStatus(true);
            } else {
                updateUserLoggedInStatus(false);
            }
        });

        // Listen for changes in authentication state
        const authListener = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);

            // Update the userIsLoggedIn status in localStorage when the authentication state changes
            if (session) {
                updateUserLoggedInStatus(true);
            } else {
                updateUserLoggedInStatus(false);
            }
        });

        // Clean up the listener when the component unmounts
        return () => {
            authListener?.unsubscribe();
        };
    }, []);

    console.log(session);
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout session={session} handleLogout={handleLogout} />}>
                        <Route path="/" element={<Login session={session} />} />
                        <Route path="/signup" element={<Auth />} />
                        <Route path="/login" element={<Login />} />
                        <Route element={<AuthRequired session={session} />}>
                            <Route path="/signup-form" element={<SignUpForm session={session} />} />
                            <Route path="/client-portal" element={<ClientPortalLayout session={session} />} >
                                <Route index element={<ClientOrderHistory session={session} />} />
                                <Route path="client-details" element={<ClientDetails session={session} />} />
                                {session && <Route path="update-client-details" element={<UpdateClientDetails session={session} />} />}
                                <Route path="place-order" element={<ChangeOrderForm session={session} />} />
                                <Route path="settings" element={<ClientSettings session={session} />} />
                            </Route>
                        </Route>
                        <Route path="/west-sure" element={<HostLayout />}>
                            <Route index element={< PendingOrders session={session} />} />
                            <Route path="clients" element={< Clients />} />
                            <Route path="order-history" element={< OrderHistorySummary />} />
                            <Route path="settings" element={< Settings />} />
                            <Route path="float-order" element={< FloatOrder />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>


    )
}