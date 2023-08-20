import Calendar from "../components/Calendar"
// import { useSearchParams } from "react-router-dom";
// import { useEffect } from "react";
// import supabase from "../config/supabaseClient";

export default function PendingOrders() {
    // const [searchParams, setSearchParams] = useSearchParams()
    // const [data, setData] = useState()
    // useEffect(() => {
    //     const fetchCompanyName = async () => {
    //         const { data } = await supabase
    //             .from("change_order")
    //             .select("*")
    //         setData(data)
    //     }
    //     fetchCompanyName()
    // }, [])

    return (
        <>
            <Calendar />
        </>
    )
}
