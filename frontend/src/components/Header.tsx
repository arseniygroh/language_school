import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function Header() {
    const {user, logout} = useAuth();

    return (
        <header className="main-header">
            <div className="logo">
                <Link to={"/"}>Languages House</Link>
            </div>
            <nav className="main-nav">
                <ul>
                    <li>
                        <Link to={"/about"}>About us</Link>
                    </li>
                    <li className="has-dropdown">
                        <Link to={"/classes"}>Classes ▼</Link>
                        <ul className="dropdown-menu">
                            <li>
                                <Link to={"/classes?type=group"}>Group Classes</Link>
                            </li>
                            <li>
                                <Link to={"/classes?type=individual"}>Individual</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={"/contacts"}>Contact us</Link>
                    </li>
                    {!user && (
                        <>
                        <li>
                            <Link to={"/login"}>Log in</Link>
                        </li>
                        <li>
                            <Link to={"/register"}>Sign up</Link>
                        </li>
                        </>
                    )}
                </ul>
            </nav>
            {user && (
                <div className="user-profile">
                    <span>Hello, <strong>{user.username}</strong></span>
                    <button type="button" onClick={logout} className="logout-btn">Log out</button>
                </div>
            )}
        </header>
    );
}