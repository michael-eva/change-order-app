import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout({ companyName, handleLogout, session = { session } }) {
    const navigate = useNavigate()
    return (
        <>
            <NavBar companyName={companyName} handleLogout={handleLogout} session={session} navigate={navigate} />
            <Outlet />
        </>
    )
}