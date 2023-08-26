
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import supabase from "./config/supabaseClient";
import './index.css';
import ChangeOrderForm from "./components/ChangeOrderForm";
import Auth from "./Auth";
import Login from "./pages/Login";
import OrderHistorySummary from "./components/OrderHistorySummary";
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

export default function App() {
    // const navigate = useNavigate();
    const [session, setSession] = useState(null)

    // useEffect(() => {
    //     const storedToken = sessionStorage.getItem('token');
    //     if (storedToken) {
    //         setToken(JSON.parse(storedToken));
    //     }
    // }, []);
    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setSession(null);

    };

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout session={session} handleLogout={handleLogout} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<Auth />} />
                        <Route path="/login" element={<Login setSession={setSession} />} />
                        <Route path="/signup-form" element={<SignUpForm session={session} />} />
                        {session ? <Route path="/client-portal" element={<ClientPortalLayout />} >
                            <Route index element={<OrderHistorySummary />} />
                            <Route path="client-details" element={<ClientDetails />} />
                            <Route path="place-order" element={<ChangeOrderForm />} />
                            <Route path="invoices" element={<Invoices />} />
                        </Route> : ""}
                        <Route path="/west-sure" element={<HostLayout />}>
                            <Route index element={< PendingOrders />} />
                            <Route path="clients" element={< Clients />} />
                            <Route path="order-history" element={< OrderHistorySummary />} />
                            <Route path="settings" element={< Settings />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>


    )
}