import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout({ companyName }) {
    return (
        <>
            <NavBar companyName={companyName} />
            <Outlet />
        </>
    )
}