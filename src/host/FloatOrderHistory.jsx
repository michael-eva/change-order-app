import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateUtils";
import { tableFormat } from "../utils/hostUtils";

export default function FloatOrderHistory({ dateFilter, selectedDay, floatOrder, handleFloatStatusChange }) {
    const [selectedStatus, setSelectedStatus] = useState('')


    useEffect(() => {
        handleFloatStatusChange(selectedStatus)
    }, [selectedStatus])

    function handleStatusChange(event) {
        const { value, dataset } = event.target;
        const orderId = dataset.orderId;
        setSelectedStatus(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value,
        }))
    }




    const filteredData = dateFilter ? floatOrder?.filter(order => {
        return order.date === dateFilter
    }) : floatOrder;

    const filteredOrders = filteredData ? filteredData.filter(order => {
        return order.date === selectedDay
    }) : floatOrder;

    return (
        <>
            {filteredOrders?.map((item, index) => (
                <tr key={index}>
                    <td className={tableFormat(index + 1)}>Float Order</td>
                    <td className={tableFormat(index + 1)}>{formatDate(item.date)}</td>
                    <td className={tableFormat(index + 1)}>${item.fifty}</td>
                    <td className={tableFormat(index + 1)}>${item.twenty}</td>
                    <td className={tableFormat(index + 1)}>${item.ten}</td>
                    <td className={tableFormat(index + 1)}>${item.five}</td>
                    <td className={tableFormat(index + 1)}>${item.noteTotal}</td>
                    <td className={tableFormat(index + 1)}>${item.two}</td>
                    <td className={tableFormat(index + 1)}>${item.one}</td>
                    <td className={tableFormat(index + 1)}>${item.fiftyCents}</td>
                    <td className={tableFormat(index + 1)}>${item.twentyCents}</td>
                    <td className={tableFormat(index + 1)}>${item.tenCents}</td>
                    <td className={tableFormat(index + 1)}>${item.fiveCents}</td>
                    <td className={tableFormat(index + 1)}>${item.coinTotal}</td>
                    <td className={tableFormat(index + 1)}>${item.grandTotal}</td>
                    <td className={tableFormat(index + 1)}>
                        <select
                            name="status"
                            id="status"
                            className="order-status"
                            data-order-id={item.id}
                            onChange={handleStatusChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="received">Received</option>
                        </select>
                    </td>
                </tr>
            ))}
        </>
    )
}