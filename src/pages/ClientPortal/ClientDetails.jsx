// import { useState } from "react"
import { useOutletContext } from "react-router-dom"



export default function ClientDetails({ session }) {
    const { clientData } = useOutletContext()

    // const [error, setError] = useState('')
    // const [success, setSuccess] = useState('')
    return (
        <div>
            {clientData[0] ?
                <>
                    <p>{session.user.email}</p>
                    <p>{clientData[0].companyName}</p>
                    <p>{clientData[0].contactName}</p>
                    <p>{clientData[0].contactNumber}</p>
                    <p>{clientData[0].address}</p>
                    <p>{clientData[0].abn}</p>
                </>
                :
                <p>Loading...</p>
            }
        </div>
    )






























    // const [clientData, setClientData] = useState({
    //     companyName: "",
    //     contactName: "",
    //     contactNumber: "",
    //     emailAddress: "",
    //     abn: "",
    //     address: ""
    // })

    // function handleChange(e) {
    //     const { name, value } = e.target
    //     setClientData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }))
    // }
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     if (!clientData.companyName || !clientData.contactName || !clientData.contactNumber || !clientData.emailAddress || !clientData.abn || !clientData.address) {
    //         setError("Please fill in all fields")
    //     } else {
    //         const { data, error } = await supabase
    //             .from('clients')
    //             .insert([clientData])

    //         if (data) {

    //             setSuccess("Information submitted successfully")
    //             setClientData({
    //                 companyName: "",
    //                 contactName: "",
    //                 contactNumber: "",
    //                 emailAddress: "",
    //                 abn: "",
    //                 address: ""
    //             }
    //             )
    //         }
    //         if (error) {
    //         }
    //     }
    // }

    // return (
    //     <>
    //         <h3>Client details page</h3>
    //         <Toggle>
    //             <Toggle.Button className="secondary-button">Add Client</Toggle.Button>
    //             {error && <p className="error-message">{error}</p>}
    //             <Toggle.On>
    //                 <form className="enter-client-details" onSubmit={handleSubmit}>
    //                     <label htmlFor="companyName">Company name:</label>
    //                     <input
    //                         type="text"
    //                         name="companyName"
    //                         value={clientData.companyName}
    //                         onChange={handleChange}
    //                     />
    //                     <label htmlFor="contactName">Contact name</label>
    //                     <input
    //                         type="text"
    //                         name="contactName"
    //                         value={clientData.contactName}
    //                         onChange={handleChange}
    //                     />
    //                     <label htmlFor="contactNumber">Contact number</label>
    //                     <input
    //                         type="text"
    //                         name="contactNumber"
    //                         value={clientData.contactNumber}
    //                         onChange={handleChange}
    //                     />
    //                     <label htmlFor="emailAddress">Email Address</label>
    //                     <input
    //                         type="text"
    //                         name="emailAddress"
    //                         value={clientData.emailAddress}
    //                         onChange={handleChange}
    //                     />
    //                     <label htmlFor="abn">ABN</label>
    //                     <input
    //                         type="text"
    //                         name="abn"
    //                         value={clientData.abn}
    //                         onChange={handleChange}
    //                     />
    //                     <label htmlFor="address">Address</label>
    //                     <input
    //                         type="text"
    //                         name="address"
    //                         value={clientData.address}
    //                         onChange={handleChange}
    //                     />
    //                     <button>Submit</button>
    //                     {success && <p className="success-message">{success}</p>}
    //                 </form>
    //             </Toggle.On>
    //         </Toggle>
    //         <br />


    //     </>

    // )
}