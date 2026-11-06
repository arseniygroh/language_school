import { useState, useEffect } from "react"
import type { LanguageClass } from "../types";
import { useLocation } from "react-router";

export default function Classes() {
    const [classes, setClasses] = useState<LanguageClass[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const {search} = useLocation();
    
    useEffect(() => {
        async function fetchClasses() {
            try {
                const res = await fetch("http://localhost:3000/classes");
                const data = await res.json();
                
                if (!res.ok) {
                    setError(data.error);
                } else {
                    setClasses(data.classes);
                }
            } catch (e) {
                setError("Failed to fetch classes");
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchClasses();
    }, []);

    return <h1>This is classes page</h1>
}