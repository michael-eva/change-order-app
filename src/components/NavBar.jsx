import { NavLink } from "react-router-dom"
import Toggle from "../Toggle/index"



export default function NavBar({ companyName }) {
    return (
        <div className="nav">
            <img src="#" alt="Logo" />
            <Toggle>
                <ul className="nav-items">
                    <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/">
                        <li>Home</li>
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/client-portal">
                        <li>Client Portal</li>
                    </NavLink>
                    {/* PASS FUNCTION FROM CHILD TO THIS PARENT TO GET
                            CUSTOMER NAME FROM CLIENTDETAILS PAGE */}

                    {/* OR SEND FETCH REQUEST FROM NAVBAR --- PROBABLY EASIER */}


                    <li className="nav-company-name">{companyName}</li>
                </ul>
            </Toggle>
        </div >
    )
}
