import { useState, useEffect } from "react";
import type { LanguageClass } from "../types";
import { useLocation } from "react-router";
import ClassCard from "../components/ClassCard";

export default function Classes() {
    const [classes, setClasses] = useState<LanguageClass[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const {search} = useLocation();
    
    useEffect(() => {
        async function fetchClasses() {
            try {
                const res = await fetch("http://localhost:3000/classes");
                const data = await res.json();
                
                if (!res.ok) {
                    setError(data.error || "Failed to fetch classes");
                } else {
                    setClasses(data.classes);
                }
            } catch (e) {
                setError("Network error. Failed to fetch classes");
            } finally {
                setIsLoading(false);
            }
        }
        
        fetchClasses();
    }, []);

    const maxPage = Math.max(1, Math.ceil(classes.length / pageSize));
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentClasses = classes.slice(startIndex, endIndex);

    function handleNext() {
        if (page < maxPage) setPage(p => p + 1);
    }

    function handlePrev() {
        if (page > 1) setPage(p => p - 1);
    }

    function handleFirst() {
        setPage(1);
    }

    function handleLast() {
        setPage(maxPage);
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="classes-page">
            <aside className="classes-sidebar">
                <h3>Filters</h3>
                //TODO
            </aside>
            
            <div className="classes-content">
                <div className="classes-grid">
                    {currentClasses.length > 0 ? (
                        currentClasses.map(c => <ClassCard key={c.id} languageClass={c}/>)
                    ) : (
                        <p>No classes yet.</p>
                    )}
                </div>
                {classes.length > pageSize && (
                    <div className="pagination-controls">
                        <button onClick={handleFirst} disabled={page === 1}>
                            &laquo; First
                        </button>
                        <button onClick={handlePrev} disabled={page === 1}>
                            &lsaquo; Previous
                        </button>
                        <span>Page {page} / {maxPage}</span>
                        
                        <button onClick={handleNext} disabled={page === maxPage}>
                            Next &rsaquo;
                        </button>
                        <button onClick={handleLast} disabled={page === maxPage}>
                            Last &raquo;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}