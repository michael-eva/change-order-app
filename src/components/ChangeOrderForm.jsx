import { useState } from "react"
import supabase from "../config/supabaseClient";
import { useOutletContext } from "react-router-dom";

export default function ChangeOrderForm() {
    const [grandTotal, setGrandTotal] = useState(0);
    const [coinTotal, setCoinTotal] = useState(0)
    const [noteTotal, setNoteTotal] = useState(0)
    const currentDate = (new Date());
    const [error, setError] = useState("")
    const { clientData } = useOutletContext()
    const [formData, setFormData] = useState({

        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        two: 0,
        one: 0,
        fiftyCents: 0,
        twentyCents: 0,
        tenCents: 0,
        fiveCents: 0,
        coinTotal: 0,
        noteTotal: 0,
        grandTotal: 0,
        date: ''
    });
    console.log(clientData);
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.date) {
            const formattedDate = formatDateForDatabase(formData.date);
            const formDataWithTotals = {
                ...formData,
                coinTotal: coinTotal,
                noteTotal: noteTotal,
                grandTotal: grandTotal,
                date: formattedDate,
                status: "pending"
            }
            const { data } = await supabase
                .from('change_order')
                .insert([formDataWithTotals])
            console.log(data)
            setFormData({
                fifty: 0,
                twenty: 0,
                ten: 0,
                five: 0,
                two: 0,
                one: 0,
                fiftyCents: 0,
                twentyCents: 0,
                tenCents: 0,
                fiveCents: 0,
                coinTotal: 0,
                noteTotal: 0,
                grandTotal: 0,
                date: ''
            })
            setError(null)

        } else {
            setError("Please enter date before we can proceed")
        }
    }
    function formatDateForDatabase(date) {
        const [year, month, day] = date.split('-');
        const formattedDay = parseInt(day, 10).toString(); // Remove leading zero if present
        const formattedMonth = parseInt(month, 10).toString(); // Remove leading zero if present
        const formattedYear = year.slice(-2); // Get the last two digits of the year

        return `${formattedDay}-${formattedMonth}-${formattedYear}`;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        // Update the form data state
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        // Calculate and update the totals based on the current form data
        setGrandTotal(calculateGrandTotal({
            ...formData,
            [name]: value
        }));
        setCoinTotal(calculateCoinTotal({
            ...formData,
            [name]: value
        }));
        setNoteTotal(calculateNoteTotal({
            ...formData,
            [name]: value
        }));
    }

    function calculateGrandTotal(data) {
        // Function to calculate the grand total
        let sum = 0;
        const dataArray = Object.values(data);
        for (let i = 0; i < dataArray.length - 1; i++) {
            const parsedValue = parseInt(dataArray[i]);
            if (!isNaN(parsedValue)) {
                sum += parsedValue;
            }
        }
        return sum;
    }

    function calculateNoteTotal(data) {
        // Function to sum the first 4 items in the array
        let sum = 0;
        const dataArray = Object.values(data);
        for (let i = 0; i < Math.min(4, dataArray.length); i++) {
            const parsedValue = parseInt(dataArray[i]);
            if (!isNaN(parsedValue)) {
                sum += parsedValue;
            }
        }
        return sum;
    }

    function calculateCoinTotal(data) {
        // Function to sum the first 4 items in the array
        let sum = 0;
        const dataArray = Object.values(data);
        for (let i = 4; i < 10; i++) {
            const parsedValue = parseInt(dataArray[i]);
            if (!isNaN(parsedValue)) {
                sum += parsedValue;
            }
        }
        return sum;
    }

    return (
        <form className="change-order-page" onSubmit={handleSubmit}>
            <div className="first-column">
                <div className="dates">
                    <h3>Date: {currentDate.toDateString()}</h3>
                    <label htmlFor="date">Delivery Date:</label>
                    <input
                        type="date"
                        placeholder="Enter date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    {error && <div className="date-error">{error}</div>}

                </div>
                <div className="change-order-form">
                    <div className="input ">
                        <label className="label fifty" htmlFor="fifty">$50</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fifty"
                            value={formData.fifty === 0 ? "" : formData.fifty}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="input twenty">
                        <label className="label" htmlFor="twenty">$20</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="twenty"
                            value={formData.twenty === 0 ? "" : formData.twenty}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input ten">
                        <label className="label" htmlFor="ten">$10</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="ten"
                            value={formData.ten === 0 ? "" : formData.ten}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input five">
                        <label className="label" htmlFor="five">$5</label>
                        <input
                            type="number"
                            name="five"
                            placeholder="$-"
                            value={formData.five === 0 ? "" : formData.five}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="totals">Notes Total: <span>${noteTotal}</span></div>

                    <div className="input">
                        <label className="label" htmlFor="two">$2</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="two"
                            value={formData.two === 0 ? "" : formData.two}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input one">
                        <label className="label" htmlFor="one">$1</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="one"
                            value={formData.one === 0 ? "" : formData.one}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input fiftyCents">
                        <label className="label" htmlFor="fiftyCents">50c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fiftyCents"
                            value={formData.fiftyCents === 0 ? "" : formData.fiftyCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input twentyCents">
                        <label className="label" htmlFor="twentyCents">20c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="twentyCents"
                            value={formData.twentyCents === 0 ? "" : formData.twentyCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input tenCents">
                        <label className="label" htmlFor="tenCents">10c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="tenCents"
                            value={formData.tenCents === 0 ? "" : formData.tenCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input fiveCents">
                        <label className="label" htmlFor="fiveCents">5c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fiveCents"
                            value={formData.fiveCents === 0 ? "" : formData.fiveCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="totals">Coins Total: <span>${coinTotal}</span></div>
                    <div className="totals">Grand Total: <span>${grandTotal}</span></div>
                </div>
            </div>
            <div className="second-column">

                <div className="payment-method">
                    <h3>Payment Method</h3>
                    <p>EFT</p>
                </div>
                <div className="grand-totals-section">

                    <div className="grand-total-label">
                        <h4 className="totals-label">Notes</h4>
                        <h4 className="totals-label">Coins</h4>
                        <h4 className="totals-label">Total</h4>
                    </div>
                    <div className="grand-totals">
                        <div className="totals">${noteTotal}</div>
                        <div className="totals">${coinTotal}</div>
                        <div className="totals">${grandTotal}</div>
                    </div>
                </div>
                <button className="submit-btn" >Submit</button>
                <p>Contact <span>thiswebapp@email.com</span> if you experience any issues.</p>
            </div>
        </form>
    )
}