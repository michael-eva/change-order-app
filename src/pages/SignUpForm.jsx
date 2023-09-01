import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'

export default function SignUpForm({ session }) {
    const [contactName, setContactName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [abn, setAbn] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const navigate = useNavigate('')
    const { user } = session
    console.log(user.id);
    useEffect(() => {
        async function getProfile() {
            // setLoading(true)
            if (session) {
                let { data, error } = await supabase
                    .from('clients')
                    .select(`contactName, contactNumber, address, abn, paymentMethod`)
                    .eq('id', user.id)
                    .single()

                if (error) {
                    console.warn(error)
                } else if (data) {
                    setContactName(data.contactName)
                    setContactNumber(data.contactNumber)
                    setAddress(data.address)
                    setPaymentMethod(data.paymentMethod)
                    setAbn(data.abn)
                }
                // setLoading(false)
            }
        }
        getProfile()
    }, [session, user.id])


    async function handleSubmit(e) {
        e.preventDefault()
        const { data, error } = await supabase
            .from('clients')
            .insert({
                id: user.id,
                contactName,
                contactNumber,
                address,
                paymentMethod,
                abn
            })
            .eq('id', user.id)

        if (error) {
            // setError('Please fill in all the fields correctly.')
            alert(error)
            return
        }
        toast.success('Details updated, thank you.')
        setTimeout(() => {
            navigate('/client-portal');
        }, 1000)
    }
    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <h2>Please enter additional company details
                        for {session.user.user_metadata.companyName}
                    </h2>
                    <input
                        type="text"
                        name="contactName"
                        value={contactName}
                        placeholder="Contact Name"
                        onChange={(e) => setContactName(e.target.value)}
                        className="form--input"
                        required={true}
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        value={contactNumber}
                        placeholder="Contact Number"
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="form--input"
                        required={true}
                    />
                    <input
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Company Address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="form--input"
                        required={true}
                    />
                    <input
                        type="text"
                        name="abn"
                        value={abn}
                        placeholder="ABN "
                        onChange={(e) => setAbn(e.target.value)}
                        className="form--input"
                        required={true}
                    />
                    <fieldset>
                        <legend>Change Payment Method</legend>
                        <label htmlFor="EFT">EFT:</label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="EFT"
                            value={"EFT"}
                            checked={paymentMethod === "EFT"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="Cash">Cash:</label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="Cash"
                            value={"Cash"}
                            checked={paymentMethod === "Cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                    </fieldset>

                    <button className="form--submit">Submit</button>
                </form>
            </div>
        </div>
    )
}