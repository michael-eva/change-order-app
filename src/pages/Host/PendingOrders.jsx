import WeekSlider from "../../components/HostComponents/WeekSlider"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import OrderList from "../../components/HostComponents/OrderList"
import { formattedDate } from "../../utils/dateUtils";
import Toggle from "../../Toggle";
import FloatOrderInput from "../../components/HostComponents/FloatOrderInput";
import FloatOrderHistory from "../../components/HostComponents/FloatOrderHistory";

import RunningTotal from "../../components/HostComponents/RunningTotal";
// import useStore from "../store/lowerLimitStore";



export default function PendingOrders({ session }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedDay, setSelectedDay] = useState(formattedDate(new Date()));
    const [changeOrder, setChangeOrder] = useState([])
    const [floatOrder, setFloatOrder] = useState([])
    const [clientData, setClientData] = useState([])
    const [floatOrderStatus, setFloatOrderStatus] = useState('')
    const [orderStatus, setOrderStatus] = useState('')

    const dateFilter = searchParams.get("date");
    const pendingFloatOrder = floatOrder.filter(order => order.status === 'pending')
    const pendingOrders = changeOrder.filter(order => order.status === 'pending')


    useEffect(() => {
        loadClientData();
        loadFloatOrders()
        loadChangeOrders()
    }, [])

    const loadClientData = async () => {
        try {
            const { data } = await supabase
                .from('clients')
                .select('*')
            setClientData(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    const loadChangeOrders = async () => {
        try {
            const { data } = await supabase
                .from('change_order')
                .select('*')
            setChangeOrder(data)
        } catch (error) {
            console.error("Error fetching data", error);
        }
    }
    const loadFloatOrders = async () => {
        try {
            const { data } = await supabase
                .from('float_order')
                .select('*')
            setFloatOrder(data)
        } catch (error) {

        }
    }


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

            await loadChangeOrders()
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

            await loadFloatOrders()
        } catch (error) {
            console.log(error);
        }
    }

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

    const displayButtonLogic = () => {
        const filteredOrders = pendingOrders.filter((order) => {
            return order.date === selectedDay
        })

        const filteredFloatOrders = pendingFloatOrder.filter((order) => (
            order.date === selectedDay
        ))
        if (filteredFloatOrders.length > 0
            || filteredOrders.length > 0) {
            return <button className='submit-btn' onClick={handleSubmit}>Change Status</button>
        }
    }

    return (
        <>
            <Toggle>
                <Toggle.Button><button>Add Float Order</button></Toggle.Button>
                <Toggle.On>
                    <FloatOrderInput session={session} />
                </Toggle.On>
            </Toggle>
            <WeekSlider clickHandle={clickHandle} selectedDay={selectedDay} pendingOrders={pendingOrders} pendingFloatOrder={pendingFloatOrder} />
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
                        <th >$2</th>
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
                <tbody className="pending-orders-body">
                    <OrderList pendingOrders={pendingOrders} selectedDay={selectedDay} clientData={clientData} handleOrderStatusChange={handleOrderStatusChange} />
                    <tr>
                        <td style={{ paddingBottom: '30px' }}></td>
                    </tr>

                    <FloatOrderHistory dateFilter={dateFilter} selectedDay={selectedDay} pendingFloatOrder={pendingFloatOrder} handleFloatStatusChange={handleFloatStatusChange} />

                    <tr>
                        <td style={{ paddingBottom: '30px' }}></td>
                    </tr>
                    <RunningTotal changeOrder={changeOrder} floatOrder={floatOrder} />
                </tbody>
            </table>
            {displayButtonLogic()}

        </>
    )
}