import WeekSlider from "../components/HostComponents/WeekSlider"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import supabase from "../config/supabaseClient";
import OrderHistory from "../components/HostComponents/OrderHistory"
import { formattedDate } from "../utils/dateUtils";
import Toggle from "../Toggle";
import FloatOrder from "./FloatOrder";
import FloatOrderHistory from "./FloatOrderHistory";


export default function PendingOrders({ session }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(formattedDate(new Date()));
    const [data, setData] = useState([])
    const [floatOrder, setFloatOrder] = useState([])
    const [clientData, setClientData] = useState([])


    useEffect(() => {
        fetchData();
        fetchClientData()
        fetchFloatOrderData()
    }, []);
    const fetchData = async () => {
        const { data } = await supabase
            .from("change_order")
            .select("*")
            .eq('status', 'pending')

        setData(data);
    };
    const fetchClientData = async () => {
        const { data } = await supabase
            .from("clients")
            .select("*");

        setClientData(data);
    };
    const fetchFloatOrderData = async () => {
        try {
            const { data, error } = await supabase
                .from('float_order')
                .select('*')
                .eq('status', 'pending')
            console.log(error);
            setFloatOrder(data)
        } catch (error) {
            console.log(error);
        }
    }

    const dateFilter = searchParams.get("date");

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
    function buttonClick() {

    }

    return (
        <>
            {/* <button>Manually Add Change Order</button> */}
            <Toggle>
                <Toggle.Button><button>Add Float Order</button></Toggle.Button>
                <Toggle.On>
                    <FloatOrder session={session} />
                </Toggle.On>
            </Toggle>
            <WeekSlider clickHandle={clickHandle} selectedDay={selectedDay} data={data} floatOrder={floatOrder} />
            <OrderHistory data={data} updateOrderStatus={updateOrderStatus} selectedDay={selectedDay} clientData={clientData} session={session} />
            <FloatOrderHistory dateFilter={dateFilter} selectedDay={selectedDay} floatOrder={floatOrder} />
            <button onClick={buttonClick}>Button</button>
        </>
    )
}