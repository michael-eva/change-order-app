import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";
import { numberToDollar } from "../../utils/hostUtils";


export default function RunningTotal() {
    const [order, setData] = useState([])
    const [floatOrder, setFloatOrder] = useState()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: order, error } = await supabase
                    .from('change_order')
                    .select('*');

                if (error) {
                    setError("Error fetching data");
                    setData([]);
                    console.log(error);
                } else {
                    setData(order);
                    setError(null);
                    setIsLoading(false);
                }
            } catch (error) {
                setError("Error fetching data");
                setData([]);
                console.log(error);
            }
        };
        fetchData();
    }, [order]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: floatOrder, cerror } = await supabase
                    .from('float_order')
                    .select('*');

                if (cerror) {
                    setError("Error fetching data");
                    setFloatOrder([]);
                    console.log(error);
                } else {
                    setFloatOrder(floatOrder);
                    setError(null);
                    setIsLoading(false);
                }
            } catch (cerror) {
                setError("Error fetching data");
                setFloatOrder([]);
                console.log(cerror);
            }
        };
        // console.log(error);
        fetchData();
    }, [floatOrder, error]);

    const sumChangeOrders = (columnName) => {
        return order?.reduce((total, item) => {
            if (item.status === "packed") {
                const columnValue = parseFloat(item[columnName]) || 0;
                return total + columnValue;
            }
            return total;
        }, 0);
    };
    const sumFloatOrders = (columnName) => {
        return floatOrder?.reduce((total, item) => {
            if (item.status === "received") {
                const columnValue = parseFloat(item[columnName]) || 0
                return total + columnValue
            }
            return total
        }, 0)
    }

    const runningFifty = sumFloatOrders('fifty') - sumChangeOrders('fifty')
    const runningTwenty = sumFloatOrders('twenty') - sumChangeOrders('twenty')
    const runningTen = sumFloatOrders('ten') - sumChangeOrders('ten')
    const runningFive = sumFloatOrders('five') - sumChangeOrders('five')
    const runningTwo = sumFloatOrders('two') - sumChangeOrders('two')
    const runningOne = sumFloatOrders('one') - sumChangeOrders('one')
    const runningFiftyCents = sumFloatOrders('fiftyCents') - sumChangeOrders('fiftyCents')
    const runningTwentyCents = sumFloatOrders('twentyCents') - sumChangeOrders('twentyCents')
    const runningTenCents = sumFloatOrders('tenCents') - sumChangeOrders('tenCents')
    const runningFiveCents = sumFloatOrders('fiveCents') - sumChangeOrders('fiveCents')
    // console.log(numberToDollar(runningFifty));
    return (
        <>
            {isLoading ? <h3>Loading...</h3> : <>
                <tr className="running-total">
                    <td></td>
                    <td></td>
                    <td>$50</td>
                    <td>$20</td>
                    <td>$10</td>
                    <td>$5</td>
                    <td>Note Total</td>
                    <td>$2</td>
                    <td>$1</td>
                    <td>50c</td>
                    <td>20c</td>
                    <td>10c</td>
                    <td>5c</td>
                    <td>Coin Total</td>
                    <td>Grand Total</td>
                    <td></td>

                </tr>
                <tr className="running-total-body">
                    <td>Running Total</td>
                    <td></td>
                    <td >{numberToDollar(runningFifty) || 0}</td>
                    <td>{numberToDollar(runningTwenty) || 0}</td>
                    <td>{numberToDollar(runningTen) || 0}</td>
                    <td>{numberToDollar(runningFive) || 0}</td>
                    <td>{numberToDollar(runningFifty + runningTwenty + runningTen + runningFive) || 0}</td>
                    <td>{numberToDollar(runningTwo) || 0}</td>
                    <td>{numberToDollar(runningOne) || 0}</td>
                    <td>{numberToDollar(runningFiftyCents) || 0}</td>
                    <td>{numberToDollar(runningTwentyCents) || 0}</td>
                    <td>{numberToDollar(runningTenCents) || 0}</td>
                    <td>{numberToDollar(runningFiveCents) || 0}</td>
                    <td>{numberToDollar(runningTwo + runningOne + runningFiftyCents + runningTwentyCents + runningTenCents + runningFiveCents) || 0}</td>
                    <td>{numberToDollar(runningFifty + runningTwenty + runningTen + runningFive + runningTwo + runningOne + runningFiftyCents + runningTwentyCents + runningTenCents + runningFiveCents) || 0}</td>
                    <td></td>
                </tr>
            </>}
        </>

    )
}