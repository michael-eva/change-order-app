import React, { useEffect, useState } from "react"
import supabase from "../../config/supabaseClient";

const OrderHistory = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('change_order')
                .select('*')

            if (error) {
                setError("Error fetching data")
                setData(null)
                console.log(error);
            }
            if (data) {
                setData(data)
                setError(null)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="order-history">
            <div className="order-history-headings">
                <h4>Date</h4>
                <h4>Note Total</h4>
                <h4>Coin Total</h4>
                <h4>Amount ordered</h4>
            </div>
            {data.map((item, index) => (
                <div className="order-history-values" key={index}>
                    <p>{item.date}</p>
                    <p>${item.noteTotal}</p>
                    <p>${item.coinTotal}</p>
                    <p>${item.grandTotal}</p>
                </div>
            ))}
            <div >
            </div>
        </div>
    );
}

export default OrderHistory