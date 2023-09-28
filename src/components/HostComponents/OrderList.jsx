import React, { useEffect, useState } from "react";
import { numberToDollar, tableFormat } from "../../utils/hostUtils";



export default function OrderHistory({ pendingOrders, selectedDay, handleOrderStatusChange, clientData }) {
    const [statuses, setStatuses] = useState({});

    const filteredOrders = pendingOrders.filter(order => (
        order.date === selectedDay
    ));

    useEffect(() => {
        handleOrderStatusChange(statuses);
    }, [handleOrderStatusChange, statuses]);


    function handleChange(event) {
        const { value, dataset } = event.target;
        const orderId = dataset.orderId;
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value,
        }));
    }

    return (
        <>
            {filteredOrders.map((order, index) => (
                <tr key={index}>
                    <td className={tableFormat(index)}>
                        {clientData?.map(user => {
                            return user.id === order.uuid ? user.companyName : ""
                        })}
                    </td>
                    <td className={tableFormat(index)}>{order.date}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.fifty)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.twenty)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.ten)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.five)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.noteTotal)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.two)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.one)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.fiftyCents)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.twentyCents)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.tenCents)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.fiveCents)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.coinTotal)}</td>
                    <td className={tableFormat(index)}>{numberToDollar(order.grandTotal)}</td>
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