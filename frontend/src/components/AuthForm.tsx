import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";

export default function AuthForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const {pathname} = useLocation();
    const navigate = useNavigate();

    if (pathname !== "/login" && pathname !== "/register") return;

    const isLogin = pathname === "/login";

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setErrors([]); 
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        
        const res = await fetch(`http://localhost:3000${pathname}`, {
            method: "POST",
            body: formData,
        });

        if (!res.ok) {
            const data = await res.json();
            setErrors(data.errors);
        } else {
            alert("Successfully logged in");
        }
        setIsLoading(false);
        navigate("/");
    }

    return (
        <div>
            <form action="" method="post" onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" required id="username" name="username" />
                    </div>
                )}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email" name="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" name="password" />
                </div>
                {!isLogin && (
                    <div>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input type="password" required id="confirmPassword" name="confirmPassword" />
                    </div>
                )}
                <button type="submit" disabled={isLoading}>{isLoading ? "Submitting" : "Submit"}</button>
            </form>
            {errors && errors.length > 0 && (
                <ul>
                    {errors.map(e => {
                        return <li key={e}>{e}</li>
                    })}
                </ul>
            )}
        </div>
    )
}