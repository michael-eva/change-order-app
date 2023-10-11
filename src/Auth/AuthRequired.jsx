import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired() {
    const token = localStorage.getItem("sb-wsolkhiobftucjmfkwkk-auth-token");
    if (!token) {
        return (
            <Navigate
                to={"/login"}
                state={{ message: "Please log in to continue" }}
            />
        )
    }
    return <Outlet />;
}
