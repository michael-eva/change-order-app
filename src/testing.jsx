import { useState } from "react";
export default function Testing({ testingData, children }) {

    const [count, setCount] = useState(0);
    console.log(count);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    )


}
