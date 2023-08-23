import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import ClientDetails from "../pages/ClientPortal/ClientDetails"

export default function Clients() {
    const [clients, setClients] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from("clients")
                .select("*")
            setClients(data)
        }
        fetchData()
    }, [])

    return (
        <div className="clients-list">
            <ClientDetails />
            {clients && clients.map(client => (
                <header key={client.id}>
                    <div className="company-title">{client.companyName}</div>
                    <div className="company-info">
                        <div className="client-address">{client.address}</div>
                        <div>{client.contactName}:</div>
                        <div>{client.emailAddress}</div>
                        <div>{client.contactNumber}</div>
                        <div>ABN: {client.abn}</div>
                    </div>
                </header>
            ))}

        </div>
    )
}