import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import Toggle from "../Toggle"
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function Clients() {
    const [clients, setClients] = useState()
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from("clients")
                .select("*")
            setClients(data)
        }
        fetchData()
    }, [])
    useEffect(() => {


        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (user) {
                    setCurrentUser(user)
                }

            } catch (error) {
                alert(error.message)
            }
        }
        getUser()
    }, [])

    console.log(currentUser);
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
                {clients && clients.map(client => (
                    <tbody>
                        <tr>
                            <td>{currentUser.user_metadata.companyName}</td>
                            <td>{client.address}</td>
                            <td>{client.contactName}</td>
                            <td>{client.contactNumber}</td>
                            <td>{currentUser.email}</td>
                        </tr>
                    </tbody>
                ))}
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