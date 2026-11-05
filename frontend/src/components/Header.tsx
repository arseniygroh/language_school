import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function Header() {
    const {user, logout} = useAuth();

    return (
        <header>
            <Link to={"/"}>Languages House</Link>
            <nav>
                <ul>
                    <li>
                        <Link to={"/about"}>About us</Link>
                    </li>
                    <li>
                        <Link to={"/classes"}>Classes</Link>
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
                <div>
                    <span>Hello, {user.username}</span>
                    <button type="button" onClick={logout}>Log out</button>
                </div>
            )}
        </header>
    )
}