import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { tableFormat } from "../../utils/hostUtils";
import { closestIndexTo } from "date-fns/fp";



export default function OrderHistory({ pendingOrders, selectedDay, handleOrderStatusChange }) {
    const [statuses, setStatuses] = useState({});
    const [userData, setUserData] = useState(null)
    console.log(userData);
    const filteredOrders = pendingOrders.filter(order => (
        order.date === selectedDay
    ));

    useEffect(() => {
        handleOrderStatusChange(statuses)
    }, [statuses])


    function handleChange(event) {
        const { value, dataset } = event.target;
        const orderId = dataset.orderId;
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value,
        }));
    }
    useEffect(() => {
        fetchClients();
    }, []);
    const fetchClients = async () => {
        try {

            const { data, error } = await supabase
                .from('clients')
                .select('*')
            // .eq('id', filteredOrders.map((order) => (order.uuid)));

            if (error) {
                console.error('Error fetching client data:', error);
            } else {
            }

            setUserData(data);
            // setLoading(false);
        } catch (error) {
            console.error('Error fetching client data:', error);
            // setLoading(false);
        }
    };

    return (
        <>
            {filteredOrders.map((order, index) => (
                <tr key={index}>
                    <td className={tableFormat(index)}>
                        {userData?.map(user => {
                            return user.id === order.uuid ? user.companyName : ""
                        })}
                    </td>
                    <td className={tableFormat(index)}>{order.date}</td>
                    <td className={tableFormat(index)}>{order.fifty}</td>
                    <td className={tableFormat(index)}>{order.twenty}</td>
                    <td className={tableFormat(index)}>{order.ten}</td>
                    <td className={tableFormat(index)}>{order.five}</td>
                    <td className={tableFormat(index)}>{order.noteTotal}</td>
                    <td className={tableFormat(index)}>{order.two}</td>
                    <td className={tableFormat(index)}>{order.one}</td>
                    <td className={tableFormat(index)}>{order.fiftyCents}</td>
                    <td className={tableFormat(index)}>{order.twentyCents}</td>
                    <td className={tableFormat(index)}>{order.tenCents}</td>
                    <td className={tableFormat(index)}>{order.fiveCents}</td>
                    <td className={tableFormat(index)}>{order.coinTotal}</td>
                    <td className={tableFormat(index)}>{order.grandTotal}</td>
                    <td className={tableFormat(index)}>
                        <select
                            name="status"
                            id="status"
                            className="order-status"
                            data-order-id={order.id}
                            onChange={handleChange}
                        >
                            <option className="pending" value="pending">Pending</option>
                            <option className="packed" value="packed">Packed</option>
                        </select>
                    </td>
                </tr>
            ))}
        </>
    )
} 