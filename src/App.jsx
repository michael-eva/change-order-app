
import { BrowserRouter, Routes, Route } from "react-router-dom"
import supabase from "./config/supabaseClient";
import './index.css';
import ChangeOrderForm from "./pages/ChangeOrderForm";
import Auth from "./Auth";
import Login from "./pages/Login";
import OrderHistorySummary from "./components/HostComponents/OrderHistorySummary";
import Layout from "./components/Layout";
import ClientPortalLayout from "./components/CPLayout";
import ClientDetails from "./pages/ClientPortal/ClientDetails";
import Home from "./pages/Home";
import Invoices from "./pages/ClientPortal/Invoices";
import HostLayout from "./host/HostLayout";
import Clients from "./host/Clients";
import Settings from "./host/Settings";
import PendingOrders from "./host/PendingOrders";
import { useEffect, useState } from "react";
import SignUpForm from "./pages/SignUpForm";
import ClientOrderHistory from "./pages/ClientPortal/ClientOrderHistory";
import UpdateClientDetails from "./pages/ClientPortal/UpdateClientDetails";
import toast, { Toaster } from 'react-hot-toast'

export default function App() {
    const [session, setSession] = useState(null)
    if (session) {

        // console.log("session user ID:", session.user.id);
    }

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
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])


    // const getUser = async () => {
    //     try {
    //         const { data: { user } } = await supabase.auth.getUser()

    //         if (user) {
    //             console.log(user.id);
    //         }

    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }
    // getUser()

    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout session={session} handleLogout={handleLogout} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Auth />} />
                        {session && <Route path="/signup-form" element={<SignUpForm session={session} />} />}
                        <Route path="/login" element={<Login setSession={setSession} />} />
                        {session ? <Route path="/client-portal" element={<ClientPortalLayout />} >
                            <Route index element={<ClientOrderHistory session={session} />} />
                            <Route path="client-details" element={<ClientDetails session={session} />} />
                            {session && <Route path="update-client-details" element={<UpdateClientDetails session={session} />} />}
                            <Route path="place-order" element={<ChangeOrderForm session={session} />} />
                            <Route path="invoices" element={<Invoices />} />
                        </Route> : ""}
                        <Route path="/west-sure" element={<HostLayout />}>
                            <Route index element={< PendingOrders />} />
                            <Route path="clients" element={< Clients />} />
                            <Route path="order-history" element={< OrderHistorySummary session={session} />} />
                            <Route path="settings" element={< Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>


    )
}