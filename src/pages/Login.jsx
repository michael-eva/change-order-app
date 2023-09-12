import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { fetchClientData } from "./FetchData"

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
                // setClientError(error)
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
    // console.log(clientData[0].id);
    async function submitHandler(event) {
        event.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password
            })
            if (error) throw error
            console.log(error)
            clientData?.map((client) => (
                client.email === loginData.email ?
                    navigate('/client-portal')
                    : navigate('/signup-form')
            ))



        } catch (error) {
            alert(error)
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