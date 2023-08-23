import { useState } from "react";
import { formatDate, formattedDate } from "../utils/dateUtils";

const WeekSlider = ({ clickHandle, selectedDay }) => {
    // State to keep track of the currently displayed week's start date
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    // Logic to calculate the previous and next week's start dates
    const prevWeekStartDate = new Date(currentWeekStartDate);
    prevWeekStartDate.setDate(prevWeekStartDate.getDate() - 7);
    console.log(selectedDay);
    const nextWeekStartDate = new Date(currentWeekStartDate);
    nextWeekStartDate.setDate(nextWeekStartDate.getDate() + 7);
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
                                    className={`day ${isCurrentDate ? 'current' : ''} ${selectedDay === formattedDate(day) ? 'selected' : ''}`}
                                    onClick={() => clickHandle(day)}
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
            </div>
        </>
    );
};

export default WeekSlider;