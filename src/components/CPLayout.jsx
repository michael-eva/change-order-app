import { NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"

export default function ClientPortalLayout() {
    const [clientData, setClientData] = useState()

    useEffect(() => {
        fetchClientData()
    }, [])
    const fetchClientData = async () => {
        try {
            const { data: userData } = await supabase.auth.getUser()
            if (userData) {
                const { data: clientData } = await supabase
                    .from("clients")
                    .select("*")
                    .eq('id', userData?.user.id)
                if (clientData && clientData.length > 0) {
                    setClientData(clientData)
                }
            }
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="portal-layout-page">
            <nav className="portal-nav">
                <h4>{clientData && clientData[0].companyName}</h4>
                <NavLink className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav-item"} to="client-details">
                    <p>Client Details</p>
                </NavLink>
                <NavLink end className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav-item"} to="/client-portal">
                    <p>Order History</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav-item"} to="place-order">
                    <p>Place Order</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "portal-link-focus" : "portal-nav-item"} to="settings">
                    <p>Settings</p>
                </NavLink>
            </nav>
            <div className="portal-content">
                <Outlet />
            </div>
        </div>
    )
}