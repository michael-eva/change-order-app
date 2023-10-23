import supabase from "../../config/supabaseClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlinePlusCircle } from 'react-icons/ai';

export default function AddClient() {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState('')
    const [email, setEmail] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        const { data, error } = await supabase
            .from('clients')
            .insert({
                companyName,
                email
            })

        if (error) {
            // setError('Please fill in all the fields correctly.')
            return
        }
        if (data) {
            // setError(null)
        }
        toast.success('Client details updated')
        setTimeout(() => {
            navigate('/west-sure/clients');
        }, 1000)

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="invite-client">
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button>
                    <AiOutlinePlusCircle size="20px" />
                    Invite Client
                </button>
            </div>
            <Toaster />
        </form>
    )
}
