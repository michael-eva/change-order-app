import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import supabase from "../config/supabaseClient";


import OrderHistory from "../pages/ClientPortal/OrderHistory";
const WeekSlider = ({ formattedDate }) => {
    // State to keep track of the currently displayed week's start date
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState(new Date().toDateString())
    const [searchParams, setSearchParams] = useSearchParams()
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchCompanyName = async () => {
            const { data } = await supabase
                .from("change_order")
                .select("*")
            setData(data)
        }
        fetchCompanyName()
        const currentDate = new Date();
        const selectedDate = currentDate.getDate();
        const selectedMonth = currentDate.getMonth() + 1;
        const selectedYear = currentDate.getFullYear().toString().slice(-2);
        const formattedDateString = `${selectedDate}-${selectedMonth}-${selectedYear}`;
        setSearchParams(`?date=${formattedDateString}`);
    }, [])

    const dateFilter = searchParams.get("date")
    let filteredData = null
    if (data) {
        filteredData = dateFilter
            ? data.filter(order => order.date === dateFilter)
            : data
    }

    // Logic to calculate the previous and next week's start dates
    const prevWeekStartDate = new Date(currentWeekStartDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);

    const nextWeekStartDate = new Date(currentWeekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);

    function handleClick(day) {
        const selectedDate = day.getDate();
        const selectedMonth = day.getMonth() + 1; // Adding 1 since months are 0-indexed
        const selectedYear = day.getFullYear().toString().slice(-2); // Get the last two digits of the year

        const formattedDateString = `${selectedDate}-${selectedMonth}-${selectedYear}`;
        setSelectedDay(day.toDateString());
        setSearchParams(`?date=${formattedDateString}`)
    }
    console.log(selectedDay);
    function calendarEls() {
        return (
            <>
                <header> {currentWeekStartDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</header>
                <div className="week-slider">
                    <button onClick={() => setCurrentWeekStartDate(prevWeekStartDate)}>&lt;</button>
                    <div className="week">
                        {Array.from({ length: 7 }, (_, index) => {
                            const day = new Date(currentWeekStartDate);
                            day.setDate(day.getDate() + index);
                            const isCurrentDate = day.toDateString() === new Date().toDateString();

                            return (
                                <div key={index}
                                    className={`day ${isCurrentDate ? 'current' : ''} ${selectedDay === day.toDateString() ? 'selected' : ''}`}
                                    onClick={() => handleClick(day)}
                                >
                                    <p>
                                        {day.getDate()}
                                    </p>
                                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                                </div>
                            );
                        })}
                    </div>
                    <button onClick={() => setCurrentWeekStartDate(nextWeekStartDate)}>&gt;</button>
                </div>
            </>

        )
    }

    // Render the week slider UI
    return (
        <>
            <div className="calendar-container">
                {calendarEls()}
                {data && <OrderHistory filter={filteredData} />}
            </div>
        </>
    );
};

export default WeekSlider;