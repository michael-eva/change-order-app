import { useState } from "react"
import supabase from "../config/supabaseClient"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

export default function Auth() {
    const [passwordsMatch, setPasswordsMatch] = useState(true)
    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        confirmPassword: "",


    })
    const navigate = useNavigate('')

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

    const handleLogin = async (event) => {
        event.preventDefault()


        const { error } = await supabase.auth.signUp(
            {
                email: signUpData.email,
                password: signUpData.password,

            }
        )

        if (error) {
            console.log(error);
            alert(error.error_description || error.message)
        } else {
            toast.success('Please check your email')
            setSignUpData({
                email: "",
                password: "",
                confirmPassword: "",
            })
        }
    }
    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={handleLogin}>
                    <h2>Sign Up</h2>
                    {/* <input
                        type="text"
                        name="companyName"
                        value={signUpData.companyName}
                        placeholder="Company Name"
                        onChange={handleChange}
                        className="form--input"
                        required={true}
                    /> */}
                    <input
                        type="text"
                        name="email"
                        value={signUpData.email}
                        placeholder="Email"
                        onChange={handleChange}
                        className="form--input"
                        required={true}
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
                    <Link to='/login'>Sign In</Link>
                </form>
            </div>
        </div>
    )
}