import { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateUtils";
import { numberToDollar, tableFormat } from "../../utils/hostUtils";

export default function FloatOrderHistory({ dateFilter, selectedDay, pendingFloatOrder, handleFloatStatusChange }) {
    const [selectedStatus, setSelectedStatus] = useState('')


    useEffect(() => {
        handleFloatStatusChange(selectedStatus);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStatus]);

    function handleStatusChange(event) {
        const { value, dataset } = event.target;
        const orderId = dataset.orderId;
        setSelectedStatus(prevStatuses => ({
            ...prevStatuses,
            [orderId]: value,
        }))
    }




    const filteredData = dateFilter ? pendingFloatOrder?.filter(order => {
        return order.date === dateFilter
    }) : pendingFloatOrder;

    const filteredOrders = filteredData ? filteredData.filter(order => {
        return order.date === selectedDay
    }) : pendingFloatOrder;

    return (
        <>
            {filteredOrders?.map((item, index) => (
                <tr key={index}>
                    <td className={tableFormat(index + 1)}>Float Order</td>
                    <td className={tableFormat(index + 1)}>{formatDate(item.date)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.fifty)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.twenty)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.ten)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.five)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.noteTotal)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.two)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.one)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.fiftyCents)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.twentyCents)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.tenCents)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.fiveCents)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.coinTotal)}</td>
                    <td className={tableFormat(index + 1)}>{numberToDollar(item.grandTotal)}</td>
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