import { createContext, useState } from "react"

const MenuContext = createContext()

const ClientPortal = ({ children }) => {

    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <MenuContext.Provider value={{ open, toggle }}>
            <div className="nav-items">{children}</div>
        </MenuContext.Provider>
    )
}

export default ClientPortal
export { MenuContext }