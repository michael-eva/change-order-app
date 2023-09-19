import { NavLink } from "react-router-dom"
import Toggle from "../Toggle/index"
import logo from "../images/west-sure-logo.png"
import { getAdminUsers } from './HostComponents/Admin'


export default function NavBar({ handleLogout, navigate, session }) {
    const userIsLoggedIn = JSON.parse(localStorage.getItem('userIsLoggedIn'))
    const isAdmin = getAdminUsers().includes(session?.user.id)



    return (
        <div className="nav">
            <NavLink to={isAdmin ? 'west-sure' : '#'}> <img src={logo} alt="Logo" /></NavLink>
            <Toggle>
                <ul className="nav-items">
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
