import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function SignUpForm({ session }) {
    const [loading, setLoading] = useState(true)
    const [companyName, setCompanyName] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [address, setAddress] = useState('')
    const [abn, setAbn] = useState('')
    const navigate = useNavigate('')

    useEffect(() => {
        async function getProfile() {
            setLoading(true)
            const { user } = session

            let { data, error } = await supabase
                .from('clients')
                .select(`companyName, contactName, contactNumber, address, abn`)
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

            }

            setLoading(false)
        }
        getProfile()
    }, [session])


    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)

            const { user } = session

            const updates = {
                id: user.id,
                companyName,
                contactName,
                contactNumber,
                address,
                abn
            }

            let { error } = await supabase.from("clients")

                .upsert(updates, { returning: 'minimal' })
            navigate('/client-portal')
            if (error) {
                throw error;
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }

    }
    console.log(loading);
    return (
        <div className="signup-body">
            <div className="form-container">
                <form className="form" onSubmit={updateProfile}>
                    <h2>Enter Company Details</h2>
                    <input
                        type="text"
                        name="companyName"
                        value={companyName}
                        placeholder="Company Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="form--input"
                        required='true'
                    />
                    <input
                        type="text"
                        name="contactName"
                        value={contactName}
                        placeholder="Contact Name"
                        onChange={(e) => setContactName(e.target.value)}
                        className="form--input"
                        required='true'
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        value={contactNumber}
                        placeholder="Contact Number"
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="form--input"
                        required='true'
                    />
                    <input
                        type="text"
                        name="address"
                        value={address}
                        placeholder="Company Address"
                        onChange={(e) => setAddress(e.target.value)}
                        className="form--input"
                        required='true'
                    />
                    <input
                        type="text"
                        name="abn"
                        value={abn}
                        placeholder="ABN "
                        onChange={(e) => setAbn(e.target.value)}
                        className="form--input"
                        required='true'
                    />

                    <button className="form--submit">Submit</button>
                </form>
            </div>
        </div>
    )
}