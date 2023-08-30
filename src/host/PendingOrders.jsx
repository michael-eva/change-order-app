import WeekSlider from "../components/HostComponents/WeekSlider"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import OrderHistory from "../components/HostComponents/OrderHistory"
import { formattedDate } from "../utils/dateUtils";


export default function PendingOrders() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(formattedDate(new Date()));
    const [data, setData] = useState([])
    const [clientData, setClientData] = useState([])


    useEffect(() => {
        fetchData();
        fetchClientData()
    }, []);
    const fetchData = async () => {
        const { data } = await supabase
            .from("change_order")
            .select("*");

        setData(data);
    };
    const fetchClientData = async () => {
        const { data } = await supabase
            .from("clients")
            .select("*");

        setClientData(data);
    };

    const dateFilter = searchParams.get("date");
    const filteredData = dateFilter ? data.filter(order => {
        return order.date === dateFilter && order.status === "pending"
    }) : data;;

    const pendingOrders = data.filter(order => {
        return order.status === "pending"
    })
    console.log("pending orders", pendingOrders);
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await supabase
                .from('change_order')
                .update({ status: newStatus })
                .eq('id', orderId);

            console.log(`Order ${orderId} status updated to ${newStatus}`);

            // Re-fetch the data to reflect the updated status
            await fetchData();
        } catch (error) {
            console.error(`Error updating order ${orderId} status:`, error);
        }
    };
    function clickHandle(day) {
        setSelectedDay(formattedDate(day));
        setSearchParams(`?date=${formattedDate(day)}`)
    }
    return (
        <>
            <WeekSlider clickHandle={clickHandle} selectedDay={selectedDay} filteredData={filteredData} pendingOrders={pendingOrders} />
            <OrderHistory filteredData={filteredData} updateOrderStatus={updateOrderStatus} selectedDay={selectedDay} clientData={clientData} />
        </>
    )
}