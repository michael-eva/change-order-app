import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { formatDate } from "../../utils/dateUtils";
import { useSearchParams } from "react-router-dom";
import RunningTotal from "./RunningTotal";
import { tableFormat, changeStatus } from "../../utils/hostUtils";

const OrderHistorySummary = ({ session }) => {
    const [order, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const pendingFilter = searchParams.get("status")
    const [floatOrder, setFloatOrder] = useState([])
    const [clientData, setClientData] = useState('')


    useEffect(() => {
        fetchFloatOrderData()
        fetchChangeOrderData()
        fetchClientData()
    }, []);

    const fetchChangeOrderData = async () => {
        try {
            const { data: order, error } = await supabase
                .from('change_order')
                .select('*')

            if (error) {
                setError("Error fetching data");
                setData([]);
                console.log(error);
            } else {
                setData(order);
                setError(null);
                setIsLoading(false);
            }
        } catch (error) {
            setError("Error fetching data");
            setData([]);
            console.log(error);
        }
    };
    console.log(error);

    const fetchClientData = async () => {
        try {
            const { data, error } = await supabase
                .from('clients')
                .select('*')
            console.log(error);

            setClientData(data)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchFloatOrderData = async () => {
        try {
            const { data, error } = await supabase
                .from('float_order')
                .select('*')
            console.log(error);

            setFloatOrder(data)
        } catch (error) {
            console.log(error);
        }
    }

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
    // Sort the orders by date using the customDateSort function
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
                        filterOrders?.map((item, index) => (

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
                </tbody>
            </table>
            <br />
            <RunningTotal />
            <br />
            <table>
                {sortedFloatOrders.map((item, index) => (
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

        </div >
    );

}


export default OrderHistorySummary;
