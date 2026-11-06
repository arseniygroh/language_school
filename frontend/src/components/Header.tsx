import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useMediaQuery } from "../hooks";



export default function Header() {
    const {user, logout} = useAuth();
    const location = useLocation();
    const isMobile = useMediaQuery("(max-width: 550px)");


    function handleClick() {
        document.documentElement.classList.toggle("open-menu");
    }

    useEffect(() => {
        document.documentElement.classList.remove("open-menu");
    }, [location.pathname, location.search]);

    const userProfile = user && (
        <div className="user-profile">
            <span>Hello, <strong>{user.username}</strong></span>
            <button type="button" onClick={logout} className="logout-btn">
                Log out
            </button>
        </div>
    );


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
                        <Link to={"/classes"}>Classes <span className="dropdown-arrow">▼</span></Link>
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
                    {user && isMobile && (
                        <li>{userProfile}</li>
                    )}
                </ul>
            </nav>
            {user ? (
                <div className="main-header-wrapper">
                    {!isMobile && userProfile}
                    <button type="button" onClick={handleClick} className="icon-menu"><span></span></button>
                </div>
            ) : (
                <button type="button" onClick={handleClick} className="icon-menu"><span></span></button>
            )}
        </header>
    );
}