import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({ handleLogout, session = { session } }) {
    const navigate = useNavigate()
    return (
        <>
            <NavBar handleLogout={handleLogout} session={session} navigate={navigate} />
            <Outlet />
        </>
    )
}