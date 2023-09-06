import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateUtils";
import { useSearchParams } from "react-router-dom";
import RunningTotal from "./RunningTotal";
import { tableFormat, changeStatus } from "../../utils/hostUtils";
import { fetchChangeOrderData, fetchClientData, fetchFloatOrderData } from "../../pages/FetchData";

const OrderHistorySummary = () => {
    const [order, setOrder] = useState([])
    const [orderError, setOrderError] = useState('')
    const [floatOrder, setFloatOrder] = useState([])
    const [floatError, setFloatError] = useState('')
    const [clientData, setClientData] = useState([])
    const [clientError, setClientError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingFloat, setIsLoadingFloat] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const pendingFilter = searchParams.get("status")


    useEffect(() => {
        async function loadFloatOrders() {
            try {
                const data = await fetchFloatOrderData()
                setFloatOrder(data)
                setIsLoadingFloat(false)
            } catch (error) {
                setFloatError(error)
            }
        }

        async function loadClientData() {
            try {
                const data = await fetchClientData()
                setClientData(data)
            } catch (error) {
                setClientError(error)
            }
        }

        async function loadOrders() {
            try {
                const data = await fetchChangeOrderData()
                setOrder(data)
                setIsLoading(false)

            } catch (error) {
                setOrderError(error)
            }
        }
        loadOrders()
        loadClientData()
        loadFloatOrders()
    }, []);

    const customDateSort = (dateA, dateB) => {
        const [dayA, monthA, yearA] = dateA.split("-").map(Number);
        const [dayB, monthB, yearB] = dateB.split("-").map(Number);

        if (yearA !== yearB) {
            return yearA - yearB;
        }
        if (monthA !== monthB) {
            return monthA - monthB;
        }
        return dayB - dayA;
    };

    const sortedOrders = [...order].sort((a, b) =>
        customDateSort(a.date, b.date)
    );

    const filterOrders = pendingFilter
        ? sortedOrders.filter(order => order.status === pendingFilter)
        : sortedOrders


    const sortedFloatOrders = [...floatOrder].sort((a, b) =>
        customDateSort(a.date, b.date)
    )

    return (
        <div className="order-history-summary">
            <div className="filter-orders">
                <h4>Filter by:</h4>
                <button onClick={() => setSearchParams({})}>
                    All
                </button>
                <button onClick={() => setSearchParams("?status=packed")}>Packed</button>
                <button onClick={() => setSearchParams({ status: 'pending' })}>Pending</button>
            </div>
            {orderError && <p>Error fetching orders: {orderError.message}</p>}
            {floatError && <p>Error fetching float orders: {floatError.message}</p>}
            {clientError && <p>Error fetching client data: {clientError.message}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Date</th>
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
                <tbody>
                    {isLoading ? (
                        <h2>Loading...</h2>
                    ) : filterOrders.length === 0 ? (
                        <h2>No orders to display yet</h2>
                    ) : (
                        filterOrders.map((item, index) => (

                            <tr>
                                <td className={tableFormat(index)}>
                                    {clientData?.map(user => {
                                        return user.id === item.uuid ? user.companyName : ""
                                    })}
                                </td>
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
                        )))}
                    <br />
                    {/* <RunningTotal /> */}
                    <br />
                    {isLoadingFloat ? (
                        <tr>
                            <td colSpan='15'>Loading...</td>
                        </tr>
                    ) : sortedFloatOrders.length === 0 ? (
                        <tr>
                            <td colSpan='15'>No orders to display yet</td>
                        </tr>
                    ) : (
                        sortedFloatOrders.map((item, index) => (
                            <tr key={index}>
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
                                    {item.status === "received" ? "Received" : "Pending"}
                                </td>
                            </tr>
                        )))}
                </tbody>
            </table>
        </div >
    );

}


export default OrderHistorySummary;
