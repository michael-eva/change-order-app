import WeekSlider from "../components/HostComponents/WeekSlider"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import supabase from "../config/supabaseClient";
import OrderHistory from "../components/HostComponents/OrderHistory"
import { formattedDate } from "../utils/dateUtils";
import Toggle from "../Toggle";
import FloatOrder from "./FloatOrder";
import FloatOrderHistory from "./FloatOrderHistory";
import { fetchPendingOrderData, fetchClientData, fetchFloatOrderData } from "../pages/FetchData";


export default function PendingOrders({ session }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(formattedDate(new Date()));
    const [pendingOrders, setPendingOrders] = useState([])
    const [pendingErrors, setPendingErrors] = useState('')
    const [floatOrder, setFloatOrder] = useState([])
    const [clientData, setClientData] = useState([])
    const [floatError, setFloatError] = useState('')
    const [clientError, setClientError] = useState("")
    const [floatOrderStatus, setFloatOrderStatus] = useState('')

    const dateFilter = searchParams.get("date");

    useEffect(() => {
        loadPendingOrders();
        loadClientData()
        loadFloatOrders()
    }, []);
    async function loadPendingOrders() {
        try {
            const data = await fetchPendingOrderData()
            setPendingOrders(data)
        } catch (error) {
            setPendingErrors(error)
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
    async function loadFloatOrders() {
        try {
            const data = await fetchFloatOrderData()
            setFloatOrder(data)
        } catch (error) {
            setFloatError(error)
        }
    }

    // ORDER HISTORY
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await supabase
                .from('change_order')
                .update({ status: newStatus })
                .eq('id', orderId);

            console.log(`Order ${orderId} status updated to ${newStatus}`);

            // Re-fetch the data to reflect the updated status
            await loadPendingOrders();
        } catch (error) {
            console.error(`Error updating order ${orderId} status:`, error);
        }
    };

    // WEEK SLIDER
    function clickHandle(day) {
        setSelectedDay(formattedDate(day));
        setSearchParams(`?date=${formattedDate(day)}`)
    }


    // FLOAT ORDER HISTORY
    function handleFloatStatusChange(newStatus) {
        setFloatOrderStatus(newStatus)
    }

    async function updateFloatOrderStatus(orderId, newFloatStatus) {
        try {
            await supabase
                .from('float_order')
                .update({ status: newFloatStatus })
                .eq('id', orderId)
        } catch (error) {
            console.log(error);
        }
    }

    // HANDLE SUBMIT

    async function handleSubmit() {
        try {
            for (const orderId in floatOrderStatus) {
                const newFloatStatus = floatOrderStatus[orderId];
                await updateFloatOrderStatus(orderId, newFloatStatus)
            }
            // console.log(newFloatStatus);
            console.log("updating status");
        } catch (error) {
            console.log("error:", error);
        }
    }
    return (
        <>
            <button>Manually Add Change Order</button>
            <Toggle>
                <Toggle.Button><button>Add Float Order</button></Toggle.Button>
                <Toggle.On>
                    <FloatOrder session={session} />
                </Toggle.On>
            </Toggle>
            <WeekSlider clickHandle={clickHandle} selectedDay={selectedDay} pendingOrders={pendingOrders} floatOrder={floatOrder} />
            <OrderHistory pendingOrders={pendingOrders} updateOrderStatus={updateOrderStatus} selectedDay={selectedDay} clientData={clientData} session={session} />
            <FloatOrderHistory dateFilter={dateFilter} selectedDay={selectedDay} floatOrder={floatOrder} handleFloatStatusChange={handleFloatStatusChange} />
            <button onClick={handleSubmit}>Button</button>
        </>
    )
}