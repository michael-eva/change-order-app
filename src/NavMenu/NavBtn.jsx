import { useContext } from "react"
import { MenuContext } from "./Nav"

const ClientPortalBtn = ({ children }) => {

    const { toggle } = useContext(MenuContext)

    return (
        <li className="nav-link" onClick={toggle}>{children}</li>
    )
}

export default ClientPortalBtn