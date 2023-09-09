import { Outlet } from "react-router-dom";
import HostNav from "./HostNav";

export default function HostLayout() {
    return (
        <>
            <div className="host-layout-page">
                <div className="host-nav">
                    <HostNav />
                </div>
                <div className="host-content">
                    <Outlet />
                </div>
            </div>
        </>
    )
}