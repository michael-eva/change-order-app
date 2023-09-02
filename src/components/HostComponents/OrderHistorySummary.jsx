import React, { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { formatDate } from "../../utils/dateUtils";
import { useSearchParams } from "react-router-dom";

const OrderHistorySummary = ({ session }) => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const pendingFilter = searchParams.get("status")

    const [companyName, setCompanyName] = useState()
    const filterOrders = pendingFilter
        ? data.filter(order => order.status === pendingFilter)
        : data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('change_order')
                    .select('*');

                if (error) {
                    setError("Error fetching data");
                    setData([]);
                    console.log(error);
                } else {
                    setData(data);
                    setError(null);
                    setIsLoading(false);
                }
            } catch (error) {
                setError("Error fetching data");
                setData([]);
                console.log(error);
            }
        };
        // console.log(error);
        fetchData();
    }, [error]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: companyName, cerror } = await supabase
                    .from('clients')
                    .select('*');

                if (cerror) {
                    setError("Error fetching data");
                    setCompanyName([]);
                    console.log(error);
                } else {
                    setCompanyName(companyName);
                    setError(null);
                    setIsLoading(false);
                }
            } catch (cerror) {
                setError("Error fetching data");
                setCompanyName([]);
                console.log(cerror);
            }
        };
        console.log(error);
        fetchData();
    }, [error]);

    console.log("company Name:", companyName);

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
                    ) : sortedOrders.length === 0 ? (
                        <h2>No orders to display yet</h2>
                    ) : (
                        sortedOrders.map((item, index) => (

                            <tr>
                                <td className={getCommonClassName(index)}>{session.user.user_metadata.companyName}</td>
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
                        )))}
                    <br />
                    <br />
                    <tr>
                        <td>Running Total</td>
                        <td></td>
                        <td>$50</td>
                        <td>$20</td>
                        <td>$10</td>
                        <td>$5</td>
                        <td>Note Total</td>
                        <td>$2</td>
                        <td>$1</td>
                        <td>50c</td>
                        <td>20c</td>
                        <td>10c</td>
                        <td>5c</td>
                        <td>Coin Total</td>
                        <td>Grand Total Total</td>
                        <td><button>Place Order</button></td>
                    </tr>

                </tbody>
            </table>

        </div >
    );

}


export default OrderHistorySummary;
