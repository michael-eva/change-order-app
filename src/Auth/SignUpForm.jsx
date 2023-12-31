import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function SignUpForm({ session }) {
    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [abn, setAbn] = useState('')
    const [email, setEmail] = useState("")
    const [paymentMethod, setPaymentMethod] = useState('')
    const [required, setRequired] = useState('')
    const navigate = useNavigate('')

    useEffect(() => {
        setEmail(session?.user.email)
        async function getProfile() {
            // setLoading(true)
            if (session) {
                let { data, error } = await supabase
                    .from('clients')
                    .select(`contactName, contactNumber, address, abn, paymentMethod, companyName`)
                    .eq('id', session.user.id)
                    .single()

                if (error) {
                    console.warn(error)
                } else if (data) {
                    setContactName(data.contactName)
                    setContactNumber(data.contactNumber)
                    setAddress(data.address)
                    setPaymentMethod(data.paymentMethod)
                    setAbn(data.abn)
                    setCompanyName(data.companyName)
                }
                // setLoading(false)
            } else (<Navigate to={'/'} />)
        }
        getProfile()
    }, [session])


    async function handleSubmit(e) {
        e.preventDefault()
        if (!companyName || !contactName || !contactNumber || !address || !paymentMethod) {
            setRequired('Please complete all fields')
        }
        const { error } = await supabase
            .from('clients')
            .insert({
                id: session.user.id,
                contactName,
                contactNumber,
                address,
                companyName,
                email,
                paymentMethod,
                abn
            })
            .eq('id', session.user.id)


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
                    {required ?
                        <h3>Please complete all fields</h3>
                        : ""}
                    <h2>
                        Please enter additional company details before we can proceed
                    </h2>
                    <input
                        type="text"
                        name="companyName"
                        value={companyName}
                        placeholder="Company Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="form--input"
                        required={true}
                    />
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
                    <fieldset className="form--input">
                        <legend>How are you paying for your order?</legend>
                        <label htmlFor="EFT">EFT:</label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="EFT"
                            value={"EFT"}
                            checked={paymentMethod === "EFT"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required={true}
                        />
                        <label htmlFor="Cash">Cash:</label>
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="Cash"
                            value={"Cash"}
                            checked={paymentMethod === "Cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required={true}
                        />
                    </fieldset>

                    <button className="form--submit">Submit</button>
                </form>
            </div>
        </div>
    )
}