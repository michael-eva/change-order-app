
import { numberToDollar } from "../../utils/hostUtils";

export default function RunningTotal({ changeOrder, floatOrder }) {
    const RFloatOrder = floatOrder.filter(order => order.status === 'received')
    const POrder = changeOrder.filter(order => order.status === 'packed')

    const sumChangeOrders = (columnName) => {
        return POrder?.reduce((total, item) => {
            const columnValue = parseFloat(item[columnName]) || 0;
            return total + columnValue;

        }, 0);
    };
    const sumFloatOrders = (columnName) => {
        return RFloatOrder?.reduce((total, item) => {
            const columnValue = parseFloat(item[columnName]) || 0
            return total + columnValue
        }, 0)
    }

    const runningFifty = sumFloatOrders('fifty') - sumChangeOrders('fifty') || ""
    const runningTwenty = sumFloatOrders('twenty') - sumChangeOrders('twenty') || ""
    const runningTen = sumFloatOrders('ten') - sumChangeOrders('ten') || ""
    const runningFive = sumFloatOrders('five') - sumChangeOrders('five') || ""
    const runningTwo = sumFloatOrders('two') - sumChangeOrders('two') || ""
    const runningOne = sumFloatOrders('one') - sumChangeOrders('one') || ""
    const runningFiftyCents = sumFloatOrders('fiftyCents') - sumChangeOrders('fiftyCents') || ""
    const runningTwentyCents = sumFloatOrders('twentyCents') - sumChangeOrders('twentyCents') || ""
    const runningTenCents = sumFloatOrders('tenCents') - sumChangeOrders('tenCents') || ""
    const runningFiveCents = sumFloatOrders('fiveCents') - sumChangeOrders('fiveCents') || ""
    return (
        <>
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
        </>

    )
}