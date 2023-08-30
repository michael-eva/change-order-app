import { useState } from "react";
import { formattedDate } from "../../utils/dateUtils";


const WeekSlider = ({ clickHandle, selectedDay, setSelectedDay, pendingOrders }) => {
    // State to keep track of the currently displayed week's start date
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    // Logic to calculate the previous and next week's start dates
    const prevWeekStartDate = new Date(currentWeekStartDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    const nextWeekStartDate = new Date(currentWeekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
    function toToday() {
        setCurrentWeekStartDate(new Date())
        clickHandle(new Date())
    }

    function calendarEls() {
        return (
            <>
                <header> {currentWeekStartDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</header>
                <button onClick={() => toToday()}>Go to today</button>
                <div className="week-slider">
                    <button onClick={() => setCurrentWeekStartDate(prevWeekStartDate)}>&lt;</button>
                    <div className="week">
                        {Array.from({ length: 7 }, (_, index) => {
                            const day = new Date(currentWeekStartDate);
                            day.setDate(day.getDate() + index);
                            const isCurrentDate = day.toDateString() === new Date().toDateString()

                            const pendingOrdersForDay = pendingOrders.filter(order => order.date === formattedDate(day));
                            const pendingOrdersCount = pendingOrdersForDay.length;
                            console.log();
                            return (
                                <div key={index}
                                    className={`day ${isCurrentDate ? 'current' : ''} ${selectedDay === formattedDate(day) ? 'selected' : ''}`}
                                    onClick={() => clickHandle(day)}>
                                    <p>
                                        {day.getDate()}
                                    </p>
                                    <p>{pendingOrdersCount}</p>

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
            </div>
        </>
    )
}
export default WeekSlider;