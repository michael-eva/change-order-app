import { getAdminUsers } from "../components/HostComponents/Admin"
import { Navigate, Outlet } from "react-router-dom"



export default function AdminRequired({ session }) {
    const isAdmin = JSON.parse(localStorage.getItem('adminIsLoggedIn'))
    console.log(isAdmin);
    if (!isAdmin) {
        return <Navigate
            to={"/login"}
            state={{ message: "Please log in to continue" }}
        />
    }
    return <Outlet />
}


