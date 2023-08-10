import { useContext } from "react"
import { MenuContext } from "./Nav"

const ClientPortalDropdown = ({ children }) => {
    const { open } = useContext(MenuContext)
    return open ? (
        <div className="nav-dropdown">{children}</div>
    ) : null
}

export default ClientPortalDropdown