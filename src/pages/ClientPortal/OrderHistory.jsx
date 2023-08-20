import React, { useEffect, useState } from "react"
import supabase from "../../config/supabaseClient";


const OrderHistory = ({ filter, formattedDate }) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            if (filter) {
                setData(filter);
                return;
            }

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
                console.log(error);
            }
        }
        fetchData()
    }, [filter])

    function formattedDate(date) {
        const year = date.split("-")[2].slice(-2)
        const month = parseInt(date.split("-")[1], 10);
        const day = parseInt(date.split("-")[0], 10);
        const formattedDate = `${day}-${month}-${year}`

        return formattedDate
    }

    console.log(error);
    return (
        <div className="order-history">
            <div className="order-history-headings">
                <h4>Date</h4>
                <h4>Note Total</h4>
                <h4>Coin Total</h4>
                <h4>Amount ordered</h4>
            </div>
            {/* if filter exists, use filter.map instead of data.map */}
            {data.map((item, index) => (
                <div className="order-history-values" key={index}>
                    <p>{formattedDate(item.date)}</p>
                    <p>${item.noteTotal}</p>
                    <p>${item.coinTotal}</p>
                    <p>${item.grandTotal}</p>
                </div>
            ))}
        </div>
    );
}

export default OrderHistory