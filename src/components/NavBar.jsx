import { NavLink } from "react-router-dom"
import Toggle from "../Toggle/index"
import logo from "../images/west-sure-logo.png"


export default function NavBar({ handleLogout, navigate }) {
    const userIsLoggedIn = JSON.parse(localStorage.getItem('userIsLoggedIn'))
    return (
        <div className="nav">
            <NavLink to={'west-sure'}> <img src={logo} alt="Logo" /></NavLink>
            <Toggle>
                <ul className="nav-items">
                    {/* <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/">
                        <li>Home</li>
                    </NavLink> */}
                    {userIsLoggedIn ?
                        <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/client-portal">
                            <li>Client Portal</li>
                        </NavLink>

                        : <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/login">
                            <li>Login</li>
                        </NavLink>
                    }
                    {userIsLoggedIn ?
                        <>
                            <li onClick={() => { handleLogout(); navigate('/login') }}>Logout</li>
                        </> : ""}
                </ul>
            </Toggle>
        </div >
    )
}
