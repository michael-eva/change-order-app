import { useContext } from "react"
import { ToggleContext } from "./Toggle"

const ToggleButton = ({ children, className }) => {
    const { toggle } = useContext(ToggleContext)
    return (
        <button className={className} onClick={toggle}>
            {children}
        </button>
    )
}

export default ToggleButton