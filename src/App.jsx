
import { BrowserRouter, Routes, Route } from "react-router-dom"
import supabase from "./config/supabaseClient";
import './index.css';
import ChangeOrderForm from "./pages/ClientPortal/ChangeOrderForm";
import Signup from "./Auth/Signup";
import Login from "./Auth/Login";
import Clients from "./pages/Host/Clients";
import Settings from "./pages/Host/Settings";
import PendingOrders from "./pages/Host/PendingOrders";
import OrderHistorySummary from "./pages/Host/OrderHistorySummary";
import Layout from "./components/Layout";
import ClientPortalLayout from "./components/CPLayout";
import ClientDetails from "./pages/ClientPortal/ClientDetails";
import ClientSettings from "./pages/ClientPortal/ClientSettings";
import HostLayout from "./components/HostLayout";
import { useEffect, useState } from "react";
import SignUpForm from "./Auth/SignUpForm";
import ClientOrderHistory from "./pages/ClientPortal/ClientOrderHistory";
import UpdateClientDetails from "./pages/ClientPortal/UpdateClientDetails";
import toast, { Toaster } from 'react-hot-toast'
import FloatOrder from "./components/HostComponents/FloatOrderInput";
import NotFound from "./pages/NotFound";
import AuthRequired from "./Auth/AuthRequired";
import HomePage from "./components/HomePage";
import AdminRequired from "./Admin/AdminRequired";
import AddClient from "./pages/Host/AddClient";
// import Auth from "./Auth/Auth";

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
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // // Listen for changes in authentication state
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });


    }, [])

    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout handleLogout={handleLogout} session={session} />}>
                        <Route path="/" element={<HomePage session={session} />} />
                        <Route path="/signup" element={<Signup />} />
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
                                <Route path="add-client" element={< AddClient />} />
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