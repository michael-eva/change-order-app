import { createContext, useState } from "react"

const ToggleContext = createContext()

const Toggle = ({ children }) => {
    const [on, setOn] = useState(false)

    const toggle = () => {
        setOn(prev => !prev)
    }

    return (
        <ToggleContext.Provider value={{ on, toggle }}>
            <div className="toggle">
                {children}
            </div>
        </ToggleContext.Provider>
    )
}

export default Toggle
export { ToggleContext }