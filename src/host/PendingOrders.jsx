import WeekSlider from "../components/HostComponents/WeekSlider"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import supabase from "../config/supabaseClient";
import OrderHistory from "../components/HostComponents/OrderHistory"
import { formattedDate } from "../utils/dateUtils";
import Toggle from "../Toggle";
import FloatOrder from "./FloatOrder";
import FloatOrderHistory from "./FloatOrderHistory";
import { fetchPendingOrderData, fetchClientData, fetchPendingFloatOrderData } from "../pages/FetchData";
import RunningTotal from "../components/HostComponents/RunningTotal";


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
    const [orderStatus, setOrderStatus] = useState('')
    const [initOrderStatus, setInitOrderStatus] = useState('pending')
    const [initFloatStatus, setInitFloatStatus] = useState(floatOrderStatus)

    const dateFilter = searchParams.get("date");

    useEffect(() => {
        loadPendingOrders();
        loadClientData()
        loadPendingFloatOrders()
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
    async function loadPendingFloatOrders() {
        try {
            const data = await fetchPendingFloatOrderData()
            setFloatOrder(data)
        } catch (error) {
            setFloatError(error)
        }
    }

    // ORDER HISTORY
    function handleOrderStatusChange(newStatus) {
        setOrderStatus(newStatus)
    }
    function handleFloatStatusChange(newStatus) {
        setFloatOrderStatus(newStatus)
    }

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
    async function updateFloatOrderStatus(orderId, newFloatStatus) {
        try {
            await supabase
                .from('float_order')
                .update({ status: newFloatStatus })
                .eq('id', orderId)

            await loadPendingFloatOrders()
        } catch (error) {
            console.log(error);
        }
    }

    // WEEK SLIDER
    function clickHandle(day) {
        setSelectedDay(formattedDate(day));
        setSearchParams(`?date=${formattedDate(day)}`)
    }


    const handleSubmit = async () => {
        try {
            for (const orderId in orderStatus) {
                const newStatus = orderStatus[orderId];
                await updateOrderStatus(orderId, newStatus);
            }
            for (const orderId in floatOrderStatus) {
                const newFloatStatus = floatOrderStatus[orderId];
                await updateFloatOrderStatus(orderId, newFloatStatus)
            }

            console.log('Order statuses updated in the database.');
        } catch (error) {
            console.error('Error updating order statuses:', error);
        }
    }

    if (orderStatus !== 'pending') {
        console.log("changed");
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
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
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
                    <OrderHistory pendingOrders={pendingOrders} selectedDay={selectedDay} clientData={clientData} session={session} handleOrderStatusChange={handleOrderStatusChange} />
                    <br />
                    <FloatOrderHistory dateFilter={dateFilter} selectedDay={selectedDay} floatOrder={floatOrder} handleFloatStatusChange={handleFloatStatusChange} />
                    <br />
                    <RunningTotal />
                </tbody>
            </table>
            <button className='submit-btn' onClick={handleSubmit}>Change Status</button>
        </>
    )
}