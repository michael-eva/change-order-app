import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { fetchClientData } from "../utils/FetchData"

export default function Login({ session }) {
    let navigate = useNavigate()
    const location = useLocation('')
    const [clientData, setClientData] = useState([])
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    useEffect(() => {
        async function loadClientData() {
            try {
                const data = await fetchClientData()
                setClientData(data)
            } catch (error) {
                console.log(error);
            }
        }
        loadClientData()
    }, [])

    function handleChange(event) {
        const { type, name, value, checked } = event.target
        setLoginData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    async function submitHandler(event) {
        event.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password,
            });

            if (error) throw error;

            if (data && data.user) {
                const loggedInUser = data.user;

                // Check if the ID of the logged-in user matches any ID in clientData
                const userMatchesClient = clientData.some(
                    (client) => client.id === loggedInUser.id
                );

                if (userMatchesClient) {
                    // Navigate to a specific page for clients
                    navigate('/client-portal');
                } else {
                    // Navigate to the signup-form for users who are not in clientData
                    navigate('/signup-form');
                }
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={submitHandler}>
                    {location.state?.message &&
                        <h3 className="login-first">{location.state.message}</h3>}
                    <h2>Login</h2>
                    <input
                        type="text"
                        name="email"
                        value={loginData.email}
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <button className="form--submit">Log In</button>
                    <div>Need an account?</div>
                    <Link to={"/signup"}>Sign Up</Link>
                </form>
            </div>
        </div>
    )
}