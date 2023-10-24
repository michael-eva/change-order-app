import { useContext } from "react"
import { ToggleContext } from "./Toggle"

const ToggleButton = ({ children, className }) => {
    const { toggle } = useContext(ToggleContext)
    return (
        <div className={className} onClick={toggle}>
            {children}
        </div>
    )
}

export default ToggleButton