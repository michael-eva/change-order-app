import { useState } from "react"
import supabase from "../config/supabaseClient"
import { Link, useNavigate, useLocation } from "react-router-dom"

export default function Login() {
    let navigate = useNavigate()
    const location = useLocation('')
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

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
        event.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: loginData.email,
                password: loginData.password
            })
            if (error) throw error
            console.log(data)
            navigate('/client-portal')

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={submitHandler}>
                    {location.state?.message &&
                        <h3 className="login-first">Please log in first</h3>}
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