import { NavLink, useNavigate } from "react-router-dom"
import Toggle from "../Toggle/index"
import logo from "../images/west-sure-logo.png"



export default function NavBar({ companyName, session, handleLogout, navigate }) {
    // const navigate = useNavigate()
    // function handleLogout() {
    //     sessionStorage.removeItem('token')
    //     navigate('/login')
    // }
    return (
        <div className="nav">
            <NavLink to={'west-sure'}> <img src={logo} alt="Logo" /></NavLink>
            <Toggle>
                <ul className="nav-items">
                    <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/">
                        <li>Home</li>
                    </NavLink>
                    {session ?
                        <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/client-portal">
                            <li>Client Portal</li>
                        </NavLink>
                        : <NavLink className={({ isActive }) => isActive ? "nav-link-focus" : "nav-link"} to="/login">
                            <li>Login</li>
                        </NavLink>
                    }
                    {session ? <li onClick={() => { handleLogout(); navigate('/login') }}>Logout</li> : ""}
                </ul>
            </Toggle>
        </div >
    )
}
