import WeekSlider from "../components/WeekSlider"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import OrderHistory from "../components/OrderHistory"

export default function PendingOrders() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedDay, setSelectedDay] = useState(new Date().toDateString())
    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase
                .from("change_order")
                .select("*")
            setData(data)
        }
        fetchData()
    }, [])

    const dateFilter = searchParams.get("date")
    let filteredData = []
    if (data) {
        filteredData = dateFilter
            ? data.filter(order => order.date === dateFilter)
            : data
    }


    function clickHandle(day) {
        const selectedDate = day.getDate();
        const selectedMonth = day.getMonth() + 1; // Adding 1 since months are 0-indexed
        const selectedYear = day.getFullYear().toString().slice(-2); // Get the last two digits of the year

        const formattedDateString = `${selectedDate}-${selectedMonth}-${selectedYear}`;
        setSelectedDay(day.toDateString());
        setSearchParams(`?date=${formattedDateString}`)
    }

    return (
        <>
            <WeekSlider clickHandle={clickHandle} selectedDay={selectedDay} />
            <OrderHistory filteredData={filteredData} />
        </>
    )
}