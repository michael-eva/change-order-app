import { useState, useEffect } from "react"
import Toggle from "../../Toggle/index"
import supabase from "../../config/supabaseClient"
import NavBar from "../../components/NavBar"

export default function ClientDetails() {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [clientData, setClientData] = useState({
        companyName: "",
        contactName: "",
        contactNumber: "",
        emailAddress: "",
        abn: "",
        address: ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setClientData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!clientData.companyName || !clientData.contactName || !clientData.contactNumber || !clientData.emailAddress || !clientData.abn || !clientData.address) {
            setError("Please fill in all fields")
        } else {
            const { data, error } = await supabase
                .from('clients')
                .insert([clientData])

            if (data) {

                setSuccess("Information submitted successfully")
                setClientData({
                    companyName: "",
                    contactName: "",
                    contactNumber: "",
                    emailAddress: "",
                    abn: "",
                    address: ""
                }
                )
            }
            if (error) {
            }
        }
    }
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [companyName, setCompanyName] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            const { data, fetchError } = await supabase
                .from('clients')
                .select('*')

            if (error) {
                setFetchError("Error fetching data")
                setData(null)
            }
            if (data) {
                setData(data[0])
                setFetchError(null)
                setCompanyName(data[0].companyName)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <h3>Client details page</h3>
            <Toggle>
                <Toggle.Button>Add Client Details</Toggle.Button>
                {error && <p className="error-message">{error}</p>}
                <Toggle.On>
                    <form className="enter-client-details" onSubmit={handleSubmit}>
                        <label htmlFor="companyName">Company name:</label>
                        <input
                            type="text"
                            name="companyName"
                            value={clientData.companyName}
                            onChange={handleChange}
                        />
                        <label htmlFor="contactName">Contact name</label>
                        <input
                            type="text"
                            name="contactName"
                            value={clientData.contactName}
                            onChange={handleChange}
                        />
                        <label htmlFor="contactNumber">Contact number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={clientData.contactNumber}
                            onChange={handleChange}
                        />
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                            type="text"
                            name="emailAddress"
                            value={clientData.emailAddress}
                            onChange={handleChange}
                        />
                        <label htmlFor="abn">ABN</label>
                        <input
                            type="text"
                            name="abn"
                            value={clientData.abn}
                            onChange={handleChange}
                        />
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={clientData.address}
                            onChange={handleChange}
                        />
                        <button>Submit</button>
                        {success && <p className="success-message">{success}</p>}
                    </form>
                </Toggle.On>
            </Toggle>
            <br />
            <div>{companyName}</div>
            <div>{data.abn}</div>
            <div>{data.contactName}</div>
            <div>{data.address}</div>


        </>

    )
}