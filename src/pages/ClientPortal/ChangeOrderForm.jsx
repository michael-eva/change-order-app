import { useState, useEffect } from "react"
import supabase from "../../config/supabaseClient";
import toast, { Toaster } from 'react-hot-toast'
import Toggle from "../../Toggle";
import { formatDateForDatabase } from "../../utils/dateUtils";

export default function ChangeOrderForm({ session }) {
    const [grandTotal, setGrandTotal] = useState(0);
    const [coinTotal, setCoinTotal] = useState(0)
    const [noteTotal, setNoteTotal] = useState(0)
    const currentDate = (new Date());
    const [error, setError] = useState("")
    const [clientData, setClientData] = useState({})
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
    });

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const { data: userData } = await supabase?.auth.getUser()
                if (userData) {
                    const { data: clientData } = await supabase
                        .from("clients")
                        .select("*")
                        .eq('id', userData.user.id)
                    if (clientData && clientData.length > 0) {
                        setClientData(clientData)
                    }
                }
            } catch (error) {
                // alert(error.message)
            }
        }
        fetchClientData()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user } = session;

        if (formData.date) {
            const formattedDate = formatDateForDatabase(formData.date);
            const formDataWithTotals = {
                ...formData,
                coinTotal: coinTotal,
                noteTotal: noteTotal,
                grandTotal: grandTotal,
                date: formattedDate,
                status: "pending",
                uuid: user.id
            };

            try {
                const { data } = await supabase
                    .from('change_order')
                    .insert([formDataWithTotals])
                    .eq('uuid', user.id);

                console.log(data);
                toast.success('Order submitted successfully')
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
                });
                setGrandTotal(0)
                setCoinTotal(0)
                setNoteTotal(0)
                setError(null);
            } catch (error) {
                console.error(error);
                setError("An error occurred while submitting the form.");
            }
        } else {
            setError("Please enter a date before we can proceed.");
        }
    };

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
                        <label className="label" htmlFor="fifty">$50</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fifty"
                            value={formData.fifty === 0 ? "" : formData.fifty}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="input">
                        <label className="label" htmlFor="twenty">$20</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="twenty"
                            value={formData.twenty === 0 ? "" : formData.twenty}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input ">
                        <label className="label" htmlFor="ten">$10</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="ten"
                            value={formData.ten === 0 ? "" : formData.ten}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input ">
                        <label className="label" htmlFor="five">$5</label>
                        <input
                            type="number"
                            name="five"
                            placeholder="$-"
                            value={formData.five === 0 ? "" : formData.five}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="totals">Notes Total: <span>${formData.noteTotal}</span></div>

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
                    <div className="input ">
                        <label className="label" htmlFor="one">$1</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="one"
                            value={formData.one === 0 ? "" : formData.one}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input ">
                        <label className="label" htmlFor="fiftyCents">50c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fiftyCents"
                            value={formData.fiftyCents === 0 ? "" : formData.fiftyCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input ">
                        <label className="label" htmlFor="twentyCents">20c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="twentyCents"
                            value={formData.twentyCents === 0 ? "" : formData.twentyCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input ">
                        <label className="label" htmlFor="tenCents">10c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="tenCents"
                            value={formData.tenCents === 0 ? "" : formData.tenCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input">
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
                    <h3>Payment Method:</h3>
                    <span>
                        <Toggle>
                            <Toggle.Button>
                                {clientData[0]?.paymentMethod}*
                            </Toggle.Button>
                            <Toggle.On><small>Payment method can be updated in settings</small></Toggle.On>
                        </Toggle>
                    </span>
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
                <Toaster />
                <p>Contact <span>thiswebapp@email.com</span> if you have any queries.</p>
            </div>
        </form>
    )
}