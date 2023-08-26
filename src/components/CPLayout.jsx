import { NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

export default function ClientPortalLayout() {
    const [fetchClientData, setClientData] = useState("")
    // const [fetchOrderData, setFetchOrderData] = useState('')
    useEffect(() => {
        const fetchClientData = async () => {
            const { data } = await supabase
                .from("clients")
                .select("*")
            setClientData(data[0])
        }
        fetchClientData()
    }, [])

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
            <Outlet context={{ fetchClientData }} />
        </>
    )
}