import { NavLink } from "react-router-dom"
import Toggle from "../Toggle/index"
import logo from "../images/logo512.png"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"


export default function NavBar({ handleLogout, navigate, session }) {
    const userIsLoggedIn = JSON.parse(localStorage.getItem('userIsLoggedIn'))

    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {

                const { data, error } = await supabase
                    .from('clients')
                    .select('isAdmin')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error("Error checking admin status:", error);
                } else {
                    setIsAdmin(data?.isAdmin === true);
                }
            } catch (error) {
                console.error("Error checking admin status:", error);
            }
        };

        checkAdminStatus();
    }, [session]);
    console.log(isAdmin);
    return (
        <div className="nav">
            <NavLink to={session && isAdmin === true ? 'west-sure' : '#'}> <img src={logo} alt="" /></NavLink>
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
