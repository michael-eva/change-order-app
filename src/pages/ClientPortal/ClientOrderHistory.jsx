
import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { formatDate } from "../../utils/dateUtils";
import { useSearchParams } from "react-router-dom";

const ClientOrderHistory = ({ session }) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const pendingFilter = searchParams.get("status")
    const filterOrders = pendingFilter
        ? data.filter(order => order.status === pendingFilter)
        : data


    console.log("session:", session);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: changeOrderData, error: changeOrderError } = await supabase
                    .from('change_order')
                    .select('*')
                    .eq('uuid', session.user.id)

                let clientsError = null;

                if (!changeOrderError) {
                    const userProfile = await supabase
                        .from('clients')
                        .select('*')
                        .eq('id', session.user.id)
                        .single()
                }

                setData(changeOrderData);
                setError(changeOrderError || clientsError);
                setIsLoading(false);
            } catch (error) {
                setError("Error fetching data");
                setData([]);
                console.log(error);
            }
        };

        fetchData();
    }, [session]);
    console.log(error);
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

    // Sort the orders by date using the customDateSort function
    const sortedOrders = [...filterOrders].sort((a, b) =>
        customDateSort(a.date, b.date)
    );
    const getCommonClassName = (index) => {
        return index % 2 === 0 ? "table-striped" : "table-striped-grey";
    };
    const getStatusClassName = (item) => {
        return item.status === "pending" ? "pending" : "packed"
    }

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
            {/* <div className="order-history-summary-headings">
                <h4>Date</h4>
                <h4>$50</h4>
                <h4>$20</h4>
                <h4>$10</h4>
                <h4>$5</h4>
                <h4>Note Total</h4>
                <h4>$2</h4>
                <h4>$1</h4>
                <h4>50c</h4>
                <h4>20c</h4>
                <h4>10c</h4>
                <h4>5c</h4>
                <h4>Coin Total</h4>
                <h4>Total</h4>
                <h4>Status</h4>
            </div> */}
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

                {isLoading ? (
                    <h2>Loading...</h2>
                ) : sortedOrders.length === 0 ? (
                    <h2>No orders to display yet</h2>
                ) : (
                    sortedOrders.map((item, index) => (
                        <tbody key={item.id}>
                            <tr>
                                <td className={getCommonClassName(index)}>{formatDate(item.date)}</td>
                                <td className={getCommonClassName(index)}>${item.fifty}</td>
                                <td className={getCommonClassName(index)}>${item.twenty}</td>
                                <td className={getCommonClassName(index)}>${item.ten}</td>
                                <td className={getCommonClassName(index)}>${item.five}</td>
                                <td className={getCommonClassName(index)}>${item.noteTotal}</td>
                                <td className={getCommonClassName(index)}>${item.two}</td>
                                <td className={getCommonClassName(index)}>${item.one}</td>
                                <td className={getCommonClassName(index)}>${item.fiftyCents}</td>
                                <td className={getCommonClassName(index)}>${item.twentyCents}</td>
                                <td className={getCommonClassName(index)}>${item.tenCents}</td>
                                <td className={getCommonClassName(index)}>${item.fiveCents}</td>
                                <td className={getCommonClassName(index)}>${item.coinTotal}</td>
                                <td className={getCommonClassName(index)}>${item.grandTotal}</td>
                                <td className={`${getCommonClassName(index)} ${getStatusClassName(item)}`}>
                                    {item.status === "packed" ? "Packed" : "Pending"}
                                </td>
                            </tr>
                        </tbody>
                    ))
                )}
            </table>
        </div>

    );
};

export default ClientOrderHistory;

