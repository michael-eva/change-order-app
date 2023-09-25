import { Navigate, Outlet } from "react-router-dom";

export default function AuthRequired() {
    const userIsLoggedIn = JSON.parse(localStorage.getItem('userIsLoggedIn'))
    if (userIsLoggedIn === false) {
        return <Navigate
            to={"/login"}
            state={{ message: "Please log in to continue" }}
        />
    }
    return <Outlet />
}