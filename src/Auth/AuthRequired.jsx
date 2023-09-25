import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired({ session }) {
    if (session === null) {
        return
    }
    if (session?.user.role !== "authenticated") {
        return <Navigate
            to={"/login"}
            state={{ message: "Please log in to continue" }}
        />
    }
    return <Outlet />
}