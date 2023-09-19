
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
import HomePage from "./components/HomePage";
import AdminRequired from "./Admin/AdminRequired";

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
        const updateUserLoggedInStatus = (loggedIn) => {
            localStorage.setItem('userIsLoggedIn', JSON.stringify(loggedIn));
        };

        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                updateUserLoggedInStatus(true);
            } else {
                updateUserLoggedInStatus(false);
            }
        });

        // Listen for changes in authentication state
        const authListener = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                updateUserLoggedInStatus(true);
            } else {
                updateUserLoggedInStatus(false);
            }
        });
        return () => {
            authListener.unsubscribe();
        };
    }, [])

    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout session={session} handleLogout={handleLogout} />}>
                        <Route path="/" element={<HomePage session={session} />} />
                        <Route path="/signup" element={<Auth />} />
                        <Route path="/login" element={<Login session={session} />} />
                        <Route path="/signup-form" element={<SignUpForm session={session} />} />
                        <Route element={<AuthRequired session={session} />}>
                            <Route path="/client-portal" element={<ClientPortalLayout session={session} />} >
                                <Route index element={<ClientOrderHistory session={session} />} />
                                <Route path="client-details" element={<ClientDetails session={session} />} />
                                <Route path="update-client-details" element={<UpdateClientDetails session={session} />} />
                                <Route path="place-order" element={<ChangeOrderForm session={session} />} />
                                <Route path="settings" element={<ClientSettings session={session} />} />
                            </Route>
                        </Route>
                        <Route element={<AdminRequired session={session} />}>
                            <Route path="/west-sure" element={<HostLayout />}>
                                <Route index element={< PendingOrders session={session} />} />
                                <Route path="clients" element={< Clients />} />
                                <Route path="order-history" element={< OrderHistorySummary />} />
                                <Route path="float-order" element={< FloatOrder />} />
                                <Route path="settings" element={< Settings />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>


    )
}