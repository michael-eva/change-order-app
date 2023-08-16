import { NavLink, Outlet } from "react-router-dom"
export default function ClientPortalLayout() {
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
            <Outlet />
        </>
    )
}