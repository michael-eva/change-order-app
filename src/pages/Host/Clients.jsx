import { useState, useEffect } from "react"
import supabase from "../../config/supabaseClient"
import Toggle from "../../Toggle"
import { AiOutlinePlusCircle } from 'react-icons/ai';
import AddClient from "../../components/HostComponents/AddClient";

export default function Clients() {
    const [clients, setClients] = useState()
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data } = await supabase
            .from("clients")
            .select("*")
        setClients(data)
    }
    const filteredClients = clients?.filter((client) =>
        client.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }
    return (
        <div className="clients-container">
            <div className="client-search-bar-nav">
                <div className="client-search-bar">
                    <h2>Clients</h2>
                    <input
                        type="text"
                        placeholder="Search Clients"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <Toggle>
                    <Toggle.Button>
                        <AiOutlinePlusCircle size="20px" />Add Client
                    </Toggle.Button>
                    <Toggle.On>
                        <AddClient />
                    </Toggle.On>
                </Toggle>
            </div>
            <table className="clients-list-table">
                <thead>
                    <tr>
                        <th >Company Name</th>
                        <th>Address</th>
                        <th>Contact Name</th>
                        <th>Contact Phone</th>
                        <th>Contact Email</th>
                    </tr>
                </thead>
                <tbody>
                    {clients && filteredClients.map((client, index) => (
                        <tr key={index} className="clients-list">
                            <td>{client.companyName}</td>
                            <td>{client.address}</td>
                            <td>{client.contactName}</td>
                            <td>{client.contactNumber}</td>
                            <td>{client.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>





        </div >
    )
}