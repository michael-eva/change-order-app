import { useNavigate } from "react-router-dom"
export default function NotFound() {
    const navigate = useNavigate('')
    return (
        <div>
            <h1>Sorry, the page you're looking for doesn't exist</h1>
            <button className="submit-btn" onClick={() => { navigate("/") }}>Go Home</button>
        </div>
    )
}