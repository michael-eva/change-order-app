import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/dateUtils";
import { useSearchParams } from "react-router-dom";
import { tableFormat, changeStatus, numberToDollar } from "../../utils/hostUtils";
import { fetchChangeOrderData, fetchClientData, fetchFloatOrderData } from "../../utils/FetchData";


const OrderHistorySummary = () => {
    const [order, setOrder] = useState([])
    const [orderError, setOrderError] = useState('')
    const [floatOrder, setFloatOrder] = useState([])
    const [floatError, setFloatError] = useState('')
    const [clientData, setClientData] = useState([])
    const [clientError, setClientError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingFloat, setIsLoadingFloat] = useState(true)
    const [orderType, setOrderType] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedClient, setSelectedClient] = useState("")

    const pendingFilter = searchParams.get("status")
    const clientFilter = searchParams.get('company-name')

    const getClientId = () => {
        const clientDetails = clientData.filter(client => client.companyName === selectedClient)
        return clientDetails[0]?.id
    }

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

    const sortedFloatOrders = [...floatOrder].sort((a, b) =>
        customDateSort(a.date, b.date)
    )

    const filterOrders = () => {
        let filteredOrders = [...sortedOrders];
        if (clientFilter) {
            filteredOrders = filteredOrders.filter(order => order.uuid === getClientId());
        }
        if (pendingFilter) {
            filteredOrders = filteredOrders.filter(order => order.status === pendingFilter);
        }
        return filteredOrders;
    };

    const filterFloatOrders = pendingFilter
        ? sortedFloatOrders.filter(order => order.status === pendingFilter)
        : sortedFloatOrders


    const genNewSearchParams = (key, value) => {
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
            sp.delete(key)
        } else {
            sp.set(key, value)
        }
        setSearchParams(`?${sp.toString()}`)
    }

    console.log("selected client:", selectedClient);

    return (
        <div className="order-history-summary">
            <div className="filter-container">
                <div className="filter-by-customer">
                    <select
                        onChange={(e) => {
                            genNewSearchParams('company-name', e.target.value)
                            setSelectedClient(e.target.value)
                        }}
                        value={clientFilter}
                    >
                        {clientData.map((client, index) => (
                            <option
                                key={index}
                                value={client.companyName}
                            >
                                {client.companyName}
                            </option>)
                        )}
                    </select>
                    <button onClick={() => {
                        genNewSearchParams('company-name', null)
                        setSelectedClient(null)
                    }}>Clear</button>

                </div>
                <div className="filter-by-type">
                    <h4>Type:</h4>
                    <button
                        className={orderType === null ? "filter-btn-focus" : "filter-btn"}
                        onClick={() => setOrderType(null)}>
                        All
                    </button>
                    <button
                        className={orderType === 'floatOrder' ? "filter-btn-focus" : "filter-btn"}
                        onClick={() => setOrderType('floatOrder')}>Float Order</button>
                    <button
                        className={orderType === 'changeOrder' ? "filter-btn-focus" : "filter-btn"}
                        onClick={() => setOrderType('changeOrder')}>Change Order</button>

                </div>
                <div className="filter-by-status">
                    <h4>Filter by:</h4>
                    <button
                        className={pendingFilter === null ? "filter-btn-focus" : "filter-btn"}
                        onClick={() => genNewSearchParams('status', null)}>
                        All
                    </button>
                    <button
                        className={pendingFilter === 'completed' ? "filter-btn-focus" : "filter-btn"}
                        onClick={() => genNewSearchParams('status', 'completed')}>Packed / Received</button>
                    <button
                        className={pendingFilter === 'pending' ? "filter-btn-focus" : "filter-btn"}
                        onClick={() => genNewSearchParams('status', 'pending')}>Pending</button>
                </div>
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
                        <tr>
                            <td>...Loading</td>
                        </tr>
                    ) : filterOrders().length === 0 ? (
                        <tr>
                            <td>No orders to display yet</td>
                        </tr>
                    ) : orderType === 'changeOrder' || orderType === null ? (
                        filterOrders().map((item, index) => (

                            <tr key={index}>
                                <td className={tableFormat(index)}>
                                    {clientData?.map(user => {
                                        return user.id === item.uuid ? user.companyName : ""
                                    })}
                                </td>
                                <td className={tableFormat(index)}>{formatDate(item.date)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.fifty)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.twenty)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.ten)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.five)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.noteTotal)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.two)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.one)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.fiftyCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.twentyCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.tenCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.fiveCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.coinTotal)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.grandTotal)}</td>
                                <td className={`${tableFormat(index)} ${changeStatus(item)}`}>
                                    {item.status === "completed" ? "Packed" : "Pending"}
                                </td>
                            </tr>
                        ))
                    ) : ""
                    }
                    {(orderType === null) ?
                        <tr>
                            <td style={{ paddingBottom: '30px' }}></td>
                        </tr>
                        : ""
                    }
                    {isLoadingFloat ? (
                        <tr>
                            <td colSpan='15'>Loading...</td>
                        </tr>
                    ) : filterFloatOrders.length === 0 ? (
                        <tr>
                            <td colSpan='15'>No orders to display yet</td>
                        </tr>
                    ) : (orderType === 'floatOrder' || orderType === null) ? (
                        filterFloatOrders.map((item, index) => (
                            <tr key={index}>
                                <td className={tableFormat(index)}>Float Order</td>
                                <td className={tableFormat(index)}>{formatDate(item.date)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.fifty)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.twenty)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.ten)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.five)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.noteTotal)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.two)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.one)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.fiftyCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.twentyCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.tenCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.fiveCents)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.coinTotal)}</td>
                                <td className={tableFormat(index)}>{numberToDollar(item.grandTotal)}</td>
                                <td className={`${tableFormat(index)} ${changeStatus(item)}`}>
                                    {item.status === "completed" ? "Received" : "Pending"}
                                </td>
                            </tr>
                        ))) : ""
                    }
                </tbody>
            </table>

        </div >
    )
}
export default OrderHistorySummary;
