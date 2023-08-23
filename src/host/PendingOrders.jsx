import WeekSlider from "../components/WeekSlider"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import OrderHistory from "../components/OrderHistory"
import { formattedDate } from "../utils/dateUtils";
import { formatDateToDdMmYy } from "../utils/dateUtils";


export default function PendingOrders() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(formattedDate(new Date()));
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const { data } = await supabase.from("change_order").select("*");

        setData(data);
    };

    const dateFilter = searchParams.get("date");
    const filteredData = dateFilter ? data.filter(order => {
        return order.date === dateFilter && order.status === "pending"
    }) : data;


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
        // const date = day.toDateString()
        // console.log(date);
        setSelectedDay(formattedDate(day));
        setSearchParams(`?date=${formattedDate(day)}`)
    }
    return (
        <>
            <WeekSlider clickHandle={clickHandle} selectedDay={selectedDay} />
            <OrderHistory filteredData={filteredData} updateOrderStatus={updateOrderStatus} selectedDay={selectedDay} />
        </>
    )
}