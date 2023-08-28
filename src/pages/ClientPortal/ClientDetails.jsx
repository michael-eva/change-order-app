// import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Link } from "react-router-dom"
import { BiMessageSquareEdit } from 'react-icons/bi';



export default function ClientDetails({ session }) {
    const { clientData } = useOutletContext()

    // const [error, setError] = useState('')
    // const [success, setSuccess] = useState('')
    return (
        <div className="client-details">
            {clientData[0] ?
                <div className="client-details-container">
                    <div className="client-details-info">
                        <h3 >Company Name: </h3>
                        <p>{clientData[0].companyName}</p>
                    </div>
                    <div className="client-details-info">
                        <h3 >Contact Name: </h3>
                        <p>{clientData[0].contactName}</p>
                    </div>
                    <div className="client-details-info">
                        <h3 >Contact Number: </h3>
                        <p>{clientData[0].contactNumber}</p>
                    </div>
                    <div className="client-details-info">
                        <h3 >Email: </h3>
                        <p>{session.user.email}</p>
                    </div>
                    <div className="client-details-info">
                        <h3 >Address: </h3>
                        <p>{clientData[0].address}</p>
                    </div>
                    <div className="client-details-info">
                        <h3 >ABN: </h3>
                        <p>{clientData[0].abn}</p>
                    </div>
                    <div className="client-details-edit">
                        <Link to=''>
                            <i className="material-icons">Edit details <BiMessageSquareEdit /></i>
                        </Link>
                    </div>
                </div>
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