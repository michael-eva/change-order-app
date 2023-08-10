import Toggle from "../Toggle/index"

const NavBtn = ({ children }) => {


    return (
        <Toggle.Button>
            <div className="nav-link">{children}</div>
        </Toggle.Button>
    )
}

export default NavBtn