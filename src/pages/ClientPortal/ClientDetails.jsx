// import { useState } from "react"
// import { useOutletContext } from "react-router-dom"
import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { BiMessageSquareEdit } from 'react-icons/bi';



export default function ClientDetails({ session }) {
    const [clientData, setClientData] = useState('')
    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const { data: userData } = await supabase.auth.getUser()
                if (userData) {
                    const { data: clientData } = await supabase
                        .from("clients")
                        .select("*")
                        .eq('id', userData.user.id)
                    if (clientData && clientData.length > 0) {
                        setClientData(clientData)
                    }
                }
            } catch (error) {
                alert(error.message)
            }
        }
        fetchClientData()
    }, [])

    console.log(clientData);
    return (
        <div className="client-details">
            {clientData[0] ?
                <div className="client-details-container">
                    <div className="client-details-info">
                        <h3 >Company Name: </h3>
                        <p>{session.user.user_metadata.companyName}</p>
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
                        <Link to='../update-client-details'>
                            <i className="material-icons">Edit details <BiMessageSquareEdit /></i>
                        </Link>
                    </div>
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    )
}