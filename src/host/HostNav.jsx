import { NavLink } from "react-router-dom"
import { AiOutlineSetting } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { GoHistory } from 'react-icons/go';
import { MdOutlinePending } from 'react-icons/md';

export default function HostNav() {
    return (
        <>
            <div className="host-sidebar">
                <NavLink end className={({ isActive }) => isActive ? "sidebar-link-focus" : "sidebar-link"} to={"/west-sure"}>
                    <MdOutlinePending />
                    <p>Pending Orders</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "sidebar-link-focus" : "sidebar-link"} to={"order-history"}>
                    <GoHistory />
                    <p>Order history</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "sidebar-link-focus" : "sidebar-link"} to={"clients"}>
                    <CgProfile />
                    <p>Clients</p>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "sidebar-link-focus" : "sidebar-link"} to={"settings"}>
                    <AiOutlineSetting />
                    <p>Settings</p>
                </NavLink>
            </div>
        </>
    )
}