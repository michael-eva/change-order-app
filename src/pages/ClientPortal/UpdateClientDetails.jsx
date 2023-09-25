import supabase from "../../config/supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'

export default function UpdateClientDetails({ session }) {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [abn, setAbn] = useState('')
    const [email, setEmail] = useState('')

    const { user } = session

    useEffect(() => {
        async function getProfile() {
            setLoading(true)
            if (session) {
                let { data, error } = await supabase
                    .from('clients')
                    .select(`companyName, contactName, contactNumber, address, abn, email`)
                    .eq('id', user.id)
                    .single()

                if (error) {
                    console.warn(error)
                } else if (data) {
                    setCompanyName(data.companyName)
                    setContactName(data.contactName)
                    setContactNumber(data.contactNumber)
                    setAddress(data.address)
                    setAbn(data.abn)
                    setEmail(data.email)

                }
                setLoading(false)
            }
        }
        getProfile()
    }, [session, user.id])

    async function handleSubmit(e) {
        e.preventDefault()
        const { data, error } = await supabase
            .from('clients')
            .update({
                companyName,
                contactName,
                contactNumber,
                address,
                email,
                abn
            })
            .eq('id', user.id)

        if (error) {
            // setError('Please fill in all the fields correctly.')
            return
        }
        if (data) {
            // setError(null)
        }
        toast.success('Client details updated')
        setTimeout(() => {
            navigate('../client-details');
        }, 1000)
    }


    return (
        <>

            {loading ? <h3>Loading...</h3> : <div className="update-client-container">
                <form onSubmit={handleSubmit}>
                    <div className="container-item">
                        <label htmlFor="companyName">Company Name:</label>
                        <input
                            type="text"
                            name="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="container-item">
                        <label htmlFor="contactName">Contact Name:</label>
                        <input
                            type="text"
                            name="contactName"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                        />
                    </div>
                    <div className="container-item">
                        <label htmlFor="contactNumber">Contact Number:</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                        />
                    </div>
                    <div className="container-item">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="container-item">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="container-item">
                        <label htmlFor="abn">ABN:</label>
                        <input
                            type="text"
                            name="abn"
                            value={abn}
                            onChange={(e) => setAbn(e.target.value)}
                        />
                    </div>
                    <div className="update-client-container-btn">
                        <button className="submit-btn">Submit</button>
                    </div>
                </form >
                <Toaster />
            </div >}
        </>
    )
}