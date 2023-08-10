import { useState } from "react"

export default function SignUp() {

    const [signUpData, setSignUpData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        saveSignIn: false
    })

    function handleChange(event) {
        const { type, name, value, checked } = event.target
        setSignUpData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function submitHandler(event) {
        event.preventDefault()
        console.log(signUpData)
    }
    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={submitHandler}>
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
                    <div className="form--marketing">
                        <input
                            type="checkbox"
                            defaultChecked={signUpData.saveSignIn}
                            name="saveSignIn"
                            id="saveSignIn"
                        />
                        <label htmlFor="saveSignIn">Remember me?</label>
                    </div>
                    <button className="form--submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}