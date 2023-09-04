import { formatDate } from "../utils/dateUtils";
import { tableFormat } from "../utils/hostUtils";
import { changeStatus } from "../utils/hostUtils";

export default function FloatOrderHistory({ dateFilter, selectedDay, floatOrder }) {

    const filteredData = dateFilter ? floatOrder?.filter(order => {
        return order.date === dateFilter
    }) : floatOrder;

    const filteredOrders = filteredData ? filteredData.filter(order => {
        return order.date === selectedDay
    }) : floatOrder;

    return (
        <table>
            {filteredOrders?.map((item, index) => (
                <tr>
                    <td className={tableFormat(index)}>Float Order</td>
                    <td className={tableFormat(index)}>{formatDate(item.date)}</td>
                    <td className={tableFormat(index)}>${item.fifty}</td>
                    <td className={tableFormat(index)}>${item.twenty}</td>
                    <td className={tableFormat(index)}>${item.ten}</td>
                    <td className={tableFormat(index)}>${item.five}</td>
                    <td className={tableFormat(index)}>${item.noteTotal}</td>
                    <td className={tableFormat(index)}>${item.two}</td>
                    <td className={tableFormat(index)}>${item.one}</td>
                    <td className={tableFormat(index)}>${item.fiftyCents}</td>
                    <td className={tableFormat(index)}>${item.twentyCents}</td>
                    <td className={tableFormat(index)}>${item.tenCents}</td>
                    <td className={tableFormat(index)}>${item.fiveCents}</td>
                    <td className={tableFormat(index)}>${item.coinTotal}</td>
                    <td className={tableFormat(index)}>${item.grandTotal}</td>
                    <td className={`${tableFormat(index)} ${changeStatus(item)}`}>
                        {item.status === "packed" ? "Packed" : "Pending"}
                    </td>
                </tr>
            ))}
        </table>
    )
}