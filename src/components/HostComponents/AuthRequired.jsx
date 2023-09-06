import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired({ session }) {
    if (!session) {
        return <Navigate to={"/login"} />
    }
    return <Outlet />
}