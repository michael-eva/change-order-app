
import { numberToDollar } from "../../utils/hostUtils";
import supabase from "../../config/supabaseClient";
import { useEffect, useState } from "react";

export default function RunningTotal({ changeOrder, floatOrder }) {
    const RFloatOrder = floatOrder.filter(order => order.status === 'completed')
    const POrder = changeOrder.filter(order => order.status === 'completed')
    const authToken = localStorage.getItem('sb-wsolkhiobftucjmfkwkk-auth-token')
    const parsedToken = JSON.parse(authToken)
    const userId = parsedToken.user.id
    const [lowerLimit, setLowerLimit] = useState('')

    useEffect(() => {
        const fetchLimitWarning = async () => {
            const { data } = await supabase
                .from('low_limit_warning')
                .select('*')
                .single()
                .eq('companyId', userId)
            setLowerLimit(data)
        }
        fetchLimitWarning()
    }, [userId])
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

    function isWarning(lowerLimit, denomination) {
        if (denomination <= lowerLimit) {
            return "warning-limit"
        } else return "within limit"
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
                <td className={isWarning(lowerLimit.fifty, runningFifty)}>{numberToDollar(runningFifty) || 0}</td>
                <td className={isWarning(lowerLimit.twenty, runningTwenty)}>{numberToDollar(runningTwenty) || 0}</td>
                <td className={isWarning(lowerLimit.ten, runningTen)}>{numberToDollar(runningTen) || 0}</td>
                <td className={isWarning(lowerLimit.five, runningFive)}>{numberToDollar(runningFive) || 0}</td>
                <td>{numberToDollar(runningFifty + runningTwenty + runningTen + runningFive) || 0}</td>
                <td className={isWarning(lowerLimit.two, runningTwo)}>{numberToDollar(runningTwo) || 0}</td>
                <td className={isWarning(lowerLimit.one, runningOne)}>{numberToDollar(runningOne) || 0}</td>
                <td className={isWarning(lowerLimit.fiftyCents, runningFiftyCents)}>{numberToDollar(runningFiftyCents) || 0}</td>
                <td className={isWarning(lowerLimit.twentyCents, runningTwentyCents)}>{numberToDollar(runningTwentyCents) || 0}</td>
                <td className={isWarning(lowerLimit.tenCents, runningTenCents)}>{numberToDollar(runningTenCents) || 0}</td>
                <td className={isWarning(lowerLimit.fiveCents, runningFiveCents)}>{numberToDollar(runningFiveCents) || 0}</td>
                <td>{numberToDollar(runningTwo + runningOne + runningFiftyCents + runningTwentyCents + runningTenCents + runningFiveCents) || 0}</td>
                <td>{numberToDollar(runningFifty + runningTwenty + runningTen + runningFive + runningTwo + runningOne + runningFiftyCents + runningTwentyCents + runningTenCents + runningFiveCents) || 0}</td>
                <td></td>
            </tr>
        </>

    )
}