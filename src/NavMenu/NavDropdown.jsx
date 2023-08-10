import Toggle from "../Toggle/index"

const NavDropdown = ({ children }) => {

    return (
        <Toggle.On>
            <div className="nav-dropdown">{children}</div>
        </Toggle.On>
    )
}

export default NavDropdown