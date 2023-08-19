import { NavLink } from "react-router-dom"
import Toggle from "../Toggle/index"
import logo from "../images/west-sure-logo.png"



export default function NavBar({ companyName }) {
    return (
        <div className="nav">
            <NavLink to={'west-sure'}> <img src={logo} alt="Logo" /></NavLink>
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
