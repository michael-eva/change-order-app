import { NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

export default function ClientPortalLayout() {
    const [clientData, setClientData] = useState({})

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const { data: userData } = await supabase.auth.getUser()
                if (userData) {
                    const { data: clientData } = await supabase
                        .from("clients")
                        .select("*")
                        .eq('id', userData.user.id)
                    if (clientData && clientData.length > 0) {
                        setClientData(clientData)
                    }
                }
            } catch (error) {
                alert(error.message)
            }
        }
        fetchClientData()
    }, [clientData])
    // console.log(clientData);
    return (
        <>
            <nav className="portal-nav">
                <NavLink className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav"} to="client-details">
                    Client Details
                </NavLink>
                <NavLink end className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav"} to="/client-portal">
                    Order History
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav"} to="place-order">
                    Place Order
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav"} to="invoices">
                    Invoices
                </NavLink>

            </nav>
            <Outlet context={{ clientData }} />
        </>
    )
}