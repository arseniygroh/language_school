import { Link } from "react-router";
import HeroSlider from "../components/HeroSlider";

export default function Home() {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <HeroSlider />
                    <h1>Learn new languages with ease</h1>
                    <p>Join our shcool and a suitable class for you!</p>
                    <Link to="/classes" className="cta-button">Choose a class</Link>
                </div>
            </section>
            <section className="features-section">
                <h2>Why they choose us ?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Native speakers</h3>
                        <p>Practice your speaking skills with native speakers.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Flexsible schedule</h3>
                        <p>Book a class whenever it suits you schedule.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Modern methodologies</h3>
                        <p>More engaging activities, less raw theory.</p>
                    </div>
                </div>
            </section>
            <section className="cta-section">
                <h2>Start your journey today!</h2>
                <p>Create an account to get access to booking classes.</p>
                <Link to="/register" className="cta-button">Register</Link>
            </section>
        </div>
    )
}