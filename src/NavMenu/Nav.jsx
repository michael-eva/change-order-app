import Toggle from "../Toggle/index"
const Nav = ({ children }) => {
    return (
        <Toggle>
            <ul className="nav-items">{children}</ul>
        </Toggle>
    )
}

export default Nav