import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import Toggle from "../Toggle"
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function Clients() {
    const [clients, setClients] = useState()
    // const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data } = await supabase
            .from("clients")
            .select("*")
        setClients(data)
    }

    return (
        <div className="clients-container">
            <div className="client-search-bar-nav">
                <h2>Clients</h2>
                <div className="search-bar-container">
                    {/* <div>Search Bar</div> */}
                    <button><AiOutlinePlusCircle size="20px" />Add Client</button>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Address</th>
                        <th>Contact Name</th>
                        <th>Contact Phone</th>
                        <th>Contact Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clients && clients.map((client, index) => (
                        <tr key={index}>
                            <td>{client.companyName}</td>
                            <td>{client.address}</td>
                            <td>{client.contactName}</td>
                            <td>{client.contactNumber}</td>
                            <td>{client.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            <Toggle>

                <Toggle.Button>
                    <Toggle.On>

                    </Toggle.On>

                </Toggle.Button>
            </Toggle>


        </div >
    )
}