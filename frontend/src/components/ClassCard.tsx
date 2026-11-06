import type { LanguageClass } from "../types";

export default function ClassCard({languageClass}: {languageClass: LanguageClass}) {
    const formattedDate = new Date(languageClass.date).toLocaleString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    const isFullyBooked = languageClass.availableSeats === 0;

    return (
        <article className="class-card">
            <div className="class-card-header">
                <span className="class-language-badge">{languageClass.language} {languageClass.level}</span>
                <span className="class-type-badge">{languageClass.type}</span>
            </div>
            <h3 className="class-title">{languageClass.title}</h3>
            <div className="class-details">
                <p><strong>Teacher:</strong> {languageClass.teacher}</p>
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Price:</strong> {languageClass.price} UAH</p>
                <p className="class-seats">
                    <strong>Available seats:</strong> 
                    <span>
                        {languageClass.availableSeats} / {languageClass.totalSeats}
                    </span>
                </p>
            </div>

            <div className="class-card-footer">
                <button 
                    className="book-btn" 
                    disabled={isFullyBooked}
                    onClick={() => console.log(`Booking class: ${languageClass.id}`)}
                >
                    {isFullyBooked ? "Fully booked" : "Book lesson"}
                </button>
            </div>
        </article>
    );
}