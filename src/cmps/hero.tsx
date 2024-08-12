import ellipse from '../assets/img/svg/Ellipse.svg'
import heroMockup from '../assets/img/hero-mockup.png'

export function Hero() {
    return (
        <div className="hero">
            <section className="hero-text">
                <p>רישוי עסקים מהמשרד ומכל מקום</p>
                <p>אפליקציית שטח למפקח</p>
            </section>
            <section className="hero-image">
                <img className="bg-shape" src={ellipse} />
                <img className="hero-mockup" src={heroMockup} alt="" />
            </section>

        </div>
    )
}