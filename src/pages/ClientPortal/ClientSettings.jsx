import { useEffect, useState } from "react"
import supabase from "../../config/supabaseClient"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function ClientSettings({ session }) {
    const [paymentMethod, setPaymentMethod] = useState('')
    const [initialPaymentMethod, setInitialPaymentMethod] = useState('')
    const { user } = session
    useEffect(() => {
        async function getProfile() {
            // setLoading(true)
            if (session) {
                let { data, error } = await supabase
                    .from('clients')
                    .select(`paymentMethod`)
                    .eq('id', user.id)
                    .single()

                if (error) {
                    console.warn(error)
                } else if (data) {
                    setPaymentMethod(data.paymentMethod)
                    setInitialPaymentMethod(data.paymentMethod)
                }
                // setLoading(false)
            }
        }
        getProfile()
    }, [session, user.id])

    async function handleSubmit(e) {
        e.preventDefault()
        const { data, error } = await supabase
            .from('clients')
            .update({
                paymentMethod
            })
            .eq('id', user.id)
        if (error) {
            alert(error)
        }
        toast.success("Settings updated")
        // navigate()
    }

    const buttonClassName =
        paymentMethod !== initialPaymentMethod ? "submit-btn" : "disabled-btn";

    return (
        <>
            <h3>Settings page</h3>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Change Payment Method</legend>
                    <label htmlFor="EFT">EFT:</label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        id="EFT"
                        value={"EFT"}
                        checked={paymentMethod === "EFT"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="Cash">Cash:</label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        id="Cash"
                        value={"Cash"}
                        checked={paymentMethod === "Cash"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                </fieldset>
                <button className={buttonClassName} disabled={buttonClassName === "disabled-btn"}>Submit</button>
            </form>
        </>
    )
}