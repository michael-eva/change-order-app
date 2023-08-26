import { useState } from "react"
import supabase from "../config/supabaseClient"
import { Link, useNavigate } from "react-router-dom"

export default function Login({ setSession }) {
    let navigate = useNavigate()
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
            // setSession(data)
            navigate('/client-portal')

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={submitHandler}>
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
                    {/* <input
                        type="password"
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="form--input"
                    /> */}
                    {/* <div className="form--marketing">
                        <input
                            type="checkbox"
                            defaultChecked={signUpData.saveSignIn}
                            name="saveSignIn"
                            id="saveSignIn"
                        />
                        <label htmlFor="saveSignIn">Remember me?</label>
                    </div> */}
                    <button className="form--submit">Log In</button>
                    <div>Need an account?</div>
                    <Link to={"/signup"}>Sign Up</Link>
                </form>
            </div>
        </div>
    )
}