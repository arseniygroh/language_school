import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function AuthForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {login} = useAuth();

    if (pathname !== "/login" && pathname !== "/register") return null;

    const isLogin = pathname === "/login";

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors([]); 
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        
        try {
            const res = await fetch(`http://localhost:3000${pathname}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors(data.errors || ["An error occurred"]); 
            } else {
                if (isLogin) {
                    login(data);
                    alert("Successfully logged in");
                    navigate("/");
                } else {
                    alert("Registration successful. Please log in.");
                    navigate("/login");
                }
            }
        } catch (err) {
            setErrors(["Network error. Please try again later."]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">
                    {isLogin ? "Log in to your account" : "Create an account"}
                </h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" required id="username" name="username" className="form-input" />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" required id="email" name="email" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" required id="password" name="password" className="form-input" />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" required id="confirmPassword" name="confirmPassword" className="form-input" />
                        </div>
                    )}
                    <button type="submit" disabled={isLoading} className="submit-btn">
                        {isLoading ? "Submitting" : (isLogin ? "Log in" : "Sign up")}
                    </button>
                </form>
                {errors && errors.length > 0 && (
                    <div className="error-container">
                        <ul className="error-list">
                            {errors.map((e, index) => (
                                <li key={index} className="error-item">{e}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}