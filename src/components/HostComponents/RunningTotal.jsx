import { useEffect, useState } from "react";
import supabase from "../../config/supabaseClient";


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

    // console.log(isLoading);

    // fetch float order data
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
    }, [floatOrder]);

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

    return (

        <>


            <tr>
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

            </tr>
            <tr>
                <td>Running Total</td>
                <td></td>
                <td>{runningFifty || 0}</td>
                <td>{runningTwenty || 0}</td>
                <td>{runningTen || 0}</td>
                <td>{runningFive || 0}</td>
                <td>{(runningFifty + runningTwenty + runningTen + runningFive) || 0}</td>
                <td>{runningTwo || 0}</td>
                <td>{runningOne || 0}</td>
                <td>{runningFiftyCents || 0}</td>
                <td>{runningTwentyCents || 0}</td>
                <td>{runningTenCents || 0}</td>
                <td>{runningFiveCents || 0}</td>
                <td>{(runningTwo + runningOne + runningFiftyCents + runningTwentyCents + runningTenCents + runningFiveCents) || 0}</td>
                <td>{(runningFifty + runningTwenty + runningTen + runningFive + runningTwo + runningOne + runningFiftyCents + runningTwentyCents + runningTenCents + runningFiveCents) || 0}</td>
            </tr>

        </>

    )
}