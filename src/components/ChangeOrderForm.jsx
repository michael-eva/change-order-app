import { useState } from "react"

export default function ChangeOrderForm() {
    const [grandTotal, setGrandTotal] = useState(0);
    const [coinTotal, setCoinTotal] = useState(0)
    const [noteTotal, setNoteTotal] = useState(0)
    const [formData, setFormData] = useState({
        fifty: "",
        twenty: "",
        ten: "",
        five: "",
        two: "",
        one: "",
        fiftyCents: "",
        twentyCents: "",
        tenCents: "",
        fiveCents: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

        // Calculate both grand total and note total with the updated form data
        setGrandTotal(calculateGrandTotal({
            ...formData,
            [name]: value
        }));
        setNoteTotal(calculateNoteTotal({
            ...formData,
            [name]: value
        }));

        setCoinTotal(calculateCoinTotal({
            ...formData,
            [name]: value
        }))
    }

    function calculateGrandTotal(data) {
        // Function to calculate the grand total
        let sum = 0;
        const dataArray = Object.values(data);
        for (let i = 0; i < dataArray.length; i++) {
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
        for (let i = 4; i < 9; i++) {
            const parsedValue = parseInt(dataArray[i]);
            if (!isNaN(parsedValue)) {
                sum += parsedValue;
            }
        }
        return sum;
    }
    function submitHandler(event) {
        event.preventDefault();
        console.log(coinTotal, noteTotal, grandTotal);
    }
    return (
        <form className="change-order-page" onSubmit={submitHandler}>
            <div className="first-column">
                <div className="dates">
                    <h3>Date:</h3>
                    <h3>Order date:</h3>
                </div>
                <div className="change-order-form">
                    <div className="input ">
                        <label className="label fifty" htmlFor="fifty">$50</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fifty"
                            value={formData.fifty}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="input twenty">
                        <label className="label" htmlFor="twenty">$20</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="twenty"
                            value={formData.twenty}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input ten">
                        <label className="label" htmlFor="ten">$10</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="ten"
                            value={formData.ten}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="input five">
                        <label className="label" htmlFor="five">$5</label>
                        <input
                            type="number"
                            name="five"
                            placeholder="$-"
                            value={formData.five}
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
                            value={formData.two}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input one">
                        <label className="label" htmlFor="one">$1</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="one"
                            value={formData.one}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input fiftyCents">
                        <label className="label" htmlFor="fiftyCents">50c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fiftyCents"
                            value={formData.fiftyCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input twentyCents">
                        <label className="label" htmlFor="twentyCents">20c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="twentyCents"
                            value={formData.twentyCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input tenCents">
                        <label className="label" htmlFor="tenCents">10c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="tenCents"
                            value={formData.tenCents}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input fiveCents">
                        <label className="label" htmlFor="fiveCents">5c</label>
                        <input
                            type="number"
                            placeholder="$-"
                            name="fiveCents"
                            value={formData.fiveCents}
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