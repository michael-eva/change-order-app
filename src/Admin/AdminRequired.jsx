import { getAdminUsers } from "../components/HostComponents/Admin"
import { Navigate, Outlet } from "react-router-dom"



export default function AdminRequired({ session }) {
    const isAdmin = getAdminUsers().includes(session?.user.id)
    console.log(isAdmin);
    if (!isAdmin) {
        return <Navigate
            to={"/login"}
            state={{ message: "Please log in to continue" }}
        />
    }
    return <Outlet />
}


