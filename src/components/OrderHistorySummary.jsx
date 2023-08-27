import React, { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import { formatDate } from "../utils/dateUtils";
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


    console.log("session:", session);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data: changeOrderData, error: changeOrderError } = await supabase
    //                 .from('change_order')
    //                 .select('*')
    //                 // change order uuid === session.user.id
    //                 .eq('uuid', session.user.id)

    //             let clientData = null;
    //             let clientsError = null;

    //             if (!changeOrderError) {
    //                 const userProfile = await supabase
    //                     .from('clients')
    //                     .select('*')
    //                     // change order uuid === session.user.id
    //                     .eq('id', session.user.id)
    //                     .single();

    //                 if (!userProfile.error) {
    //                     setCompanyName(userProfile.data?.companyName || '');
    //                     clientData = userProfile.data;
    //                 } else {
    //                     clientsError = "Error fetching user profile";
    //                 }
    //             }

    //             setData(changeOrderData);
    //             setError(changeOrderError || clientsError);
    //             setIsLoading(false);
    //         } catch (error) {
    //             setError("Error fetching data");
    //             setData([]);
    //             console.log(error);
    //         }
    //     };

    //     fetchData();
    // }, [session]);



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
            <div className="order-history-summary-headings">
                <h4>Customer</h4>
                <h4>Date</h4>
                <h4>Note Total</h4>
                <h4>Coin Total</h4>
                <h4>Amount ordered</h4>
                <h4>Status</h4>
            </div>
            {isLoading ? (
                <h2>Loading...</h2>
            ) : sortedOrders.length === 0 ? (
                <h2>No orders to display yet</h2>
            ) : (
                sortedOrders.map(item => (
                    <div className="order-history-summary-values" key={item.id}>
                        {companyName?.map(prev => {
                            if (item.uuid === prev.id) {
                                return <p key={prev.id}>{prev.companyName}</p>;
                            }
                            return null;
                        })}
                        {/* <p>{companyName}</p> */}
                        <p>{formatDate(item.date)}</p>
                        <p>${item.noteTotal}</p>
                        <p>${item.coinTotal}</p>
                        <p>${item.grandTotal}</p>
                        <p className={item.status === "packed" ? "packed" : "pending"}>
                            {item.status === "packed" ? "Packed" : "Pending"}
                        </p>
                    </div>
                ))
            )}
        </div>
    );
};

export default OrderHistorySummary;
