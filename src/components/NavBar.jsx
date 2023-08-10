import { Link } from "react-router-dom"
import Nav from "../NavMenu/index"



export default function NavBar() {

    return (
        <div className="nav">
            <img src="#" alt="Logo" />
            <Nav>
                <Link to="/"><Nav.Item>Home</Nav.Item></Link>
                <Link to="/order-history"><Nav.Item>Order History</Nav.Item></Link>
                <Nav.Item>
                    <Nav.Button>Client Portal</Nav.Button>
                    <Nav.Dropdown>
                        <Nav.DropdownItem>Login</Nav.DropdownItem>
                        <Link to="/signup"><Nav.DropdownItem>Signup</Nav.DropdownItem></Link>
                    </Nav.Dropdown>
                </Nav.Item>
            </Nav>
        </div >
    )
}
