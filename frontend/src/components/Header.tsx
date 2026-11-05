import { Link } from "react-router"

export default function Header() {

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
                </ul>
            </nav>
        </header>
    )
}