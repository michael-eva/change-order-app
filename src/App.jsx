
import React from "react"
import './index.css';
import NavBar from './components/NavBar';
import ChangeOrderForm from "./components/ChangeOrderForm";
import SignUp from "./components/SignUp";

export default function App() {
    return (
        <div>
            <NavBar />
            <ChangeOrderForm />
            {/* <SignUp /> */}
        </div>
    )
}

