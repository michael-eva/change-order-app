import React, { useState } from "react";



export default function OrderHistory({ filteredData, updateOrderStatus, selectedDay, clientData }) {
    const [statuses, setStatuses] = useState({});
    const filteredOrders = filteredData.filter(order => (
        order.date === selectedDay && order.status === "pending"
    ));
    const handleSubmit = async () => {
        try {
            for (const orderId in statuses) {
                const newStatus = statuses[orderId];
                await updateOrderStatus(orderId, newStatus);
            }
            console.log('Order statuses updated in the database.');
        } catch (error) {
            console.error('Error updating order statuses:', error);
        }
    };
    function handleChange(event) {
        const { value, dataset } = event.target;
        const orderId = dataset.orderId;
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value,
        }));
    }
    return (
        <div className="order-history">
            {filteredOrders ? (
                <>
                    {filteredOrders.length > 0 ? (

                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>$50</th>
                                        <th>$20</th>
                                        <th>$10</th>
                                        <th>$5</th>
                                        <th>Note Total</th>
                                        <th>$2</th>
                                        <th>$1</th>
                                        <th>50c</th>
                                        <th>20c</th>
                                        <th>10c</th>
                                        <th>5c</th>
                                        <th>Coin Total</th>
                                        <th>Grand Total</th>
                                        <th>Status </th>
                                    </tr>
                                </thead>
                                {filteredOrders.map((order, index) => (
                                    <tbody key={order.id}>
                                        <tr>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{clientData.map(client => {
                                                return client.id === order.uuid && <p key={order.id}>{client.companyName}</p>
                                            })}</td>
                                            <td className={`client-name ${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.fifty}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.twenty}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.ten}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.five}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.noteTotal}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.two}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.one}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.fiftyCents}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.twentyCents}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.tenCents}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.fiveCents}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.coinTotal}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>{order.grandTotal}</td>
                                            <td className={`${index % 2 ? "table-striped" : "table-striped-grey"}`}>
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
                                    </tbody>
                                ))
                                }
                            </table >
                            <button onClick={handleSubmit} className="submit-btn">Submit</button>
                        </>
                    ) : <h2>No orders to display</h2>}

                </>
            ) : <h2>Loading...</h2>}
        </div>
    )
}




