
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './index.css';
import ChangeOrderForm from "./components/ChangeOrderForm";
import SignUp from "./pages/SignUp";
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

export default function App() {

    // useEffect(() => {
    //     const fetchCompanyName = async () => {
    //         const { data } = await supabase
    //             .from("clients")
    //             .select("*")
    //         setCompanyName(data[0].companyName)
    //         setClients(data)
    //     }
    //     fetchCompanyName()
    // }, [])


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/client-portal" element={<ClientPortalLayout />} >
                            <Route index element={<OrderHistorySummary />} />
                            <Route path="client-details" element={<ClientDetails />} />
                            <Route path="place-order" element={<ChangeOrderForm />} />
                            <Route path="invoices" element={<Invoices />} />
                        </Route>
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