import { useState } from "react"
import supabase from "./config/supabaseClient"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function Auth() {
    // const navigate = useNavigate('')
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        confirmPassword: ""

    })

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "password" || name === "confirmPassword") {
            if (name === "confirmPassword" && value !== signUpData.password) {
                setPasswordsMatch(false)
            } else {
                setPasswordsMatch(true)
            }
        }
        setSignUpData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

    }

    async function submitHandler(event) {
        event.preventDefault()
        try {
            const { data, error } = await supabase.auth.signUp({
                email: signUpData.email,
                password: signUpData.password,
            })
            console.log(data);
            console.log(error);
        } catch (error) {
            console.log(error);
            alert(error)
        }
        // navigate('/signup-form')
    }
    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={submitHandler}>
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        name="email"
                        value={signUpData.email}
                        placeholder="Email Address"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <input
                        type="password"
                        name="password"
                        value={signUpData.password}
                        placeholder="Password"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={signUpData.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        className="form--input"
                    />
                    {!passwordsMatch && <div className="password-mismatch">Passwords do not match</div>}
                    <button className="form--submit">Sign Up</button>
                    <div>Already have an account?</div>
                    {!passwordsMatch ? <Link>Sign In</Link> : <Link to={"/signup-form"}>Sign In</Link>}
                </form>
            </div>
        </div>
    )
}