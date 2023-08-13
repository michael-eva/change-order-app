
import { Routes, Route } from "react-router-dom"
import './index.css';
import NavBar from './components/NavBar';
import ChangeOrderForm from "./components/ChangeOrderForm";
import SignUp from "./components/SignUp";
import OrderHistory from "./components/OrderHistory";


export default function App() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<ChangeOrderForm />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/order-history" element={<OrderHistory />} />
            </Routes>
        </>


    )
}

