import logo from '../assets/img/logo.png'
import { Hero } from "../cmps/hero"
import { SignupForm } from '../cmps/signup-form'

export function LoginPage() {
    return (
        <div className="login-page">
            <Hero />
            <div className="page-content base-layout main-layout">
                <header>
                    <img className="logo" src={logo} alt="סיטי מערכות - רישוי עם שירות" />
                </header>
                <main>
                    <div className="signup-title">
                        <h1>צור חשבון</h1>
                        <p>לחברות או אדם פרטי</p>
                    </div>
                    <SignupForm />

                    <p className="signup">
                        <span>יש לך חשבון קיים? </span>
                        <span><a href="#">להתחברות</a></span>
                    </p>
                </main>
                <footer>footer</footer>
            </div>
        </div>
    )
}