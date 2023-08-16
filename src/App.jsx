
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import ChangeOrderForm from "./components/ChangeOrderForm";
import SignUp from "./pages/SignUp";
import OrderHistory from "./pages/ClientPortal/OrderHistory";
import Layout from "./components/Layout";
import ClientPortalLayout from "./components/CPLayout";
import ClientDetails from "./pages/ClientPortal/ClientDetails";
import Home from "./pages/Home";
import Invoices from "./pages/ClientPortal/Invoices";
import { useEffect, useState } from "react";
import supabase from "./config/supabaseClient";




export default function App() {
    const [companyName, setCompanyName] = useState("")

    useEffect(() => {
        const fetchCompanyName = async () => {
            const { data } = await supabase
                .from("clients")
                .select("*")
            setCompanyName(data[0].companyName)
        }
        fetchCompanyName()
    }, [])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout companyName={companyName} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/client-portal" element={<ClientPortalLayout />} >
                            <Route index element={<OrderHistory />} />
                            <Route path="client-details" element={<ClientDetails />} />
                            <Route path="place-order" element={<ChangeOrderForm />} />
                            <Route path="invoices" element={<Invoices />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>


    )
}

