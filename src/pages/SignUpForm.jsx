import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient";

export default function SignUpForm({ session }) {
    const [loading, setLoading] = useState(true)
    const [companyName, setCompanyName] = useState(null)
    const [contactName, setContactName] = useState(null)
    const [contactNumber, setContactNumber] = useState(null)
    const [address, setAddress] = useState(null)
    const [abn, setAbn] = useState(null)

    useEffect(() => { }, [session])

    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={submitHandler}>
                    <h2>Sign Up</h2>
                    <input
                        type="text"
                        name="companyName"
                        value={signUpForm.companyName}
                        placeholder="Company Name"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <input
                        type="text"
                        name="contactName"
                        value={signUpForm.contactName}
                        placeholder="Contact Name"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        value={signUpForm.contactNumber}
                        placeholder="Contact Number"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <input
                        type="text"
                        name="address"
                        value={signUpForm.address}
                        placeholder="Company Address"
                        onChange={handleChange}
                        className="form--input"
                    />
                    <input
                        type="text"
                        name="abn"
                        value={signUpForm.abn}
                        placeholder="ABN "
                        onChange={handleChange}
                        className="form--input"
                    />

                    <button className="form--submit">Submit</button>
                </form>
            </div>
        </div>
    )
}