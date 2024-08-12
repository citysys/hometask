import { useState } from 'react'
import logo from '../assets/img/logo.png'
import { Hero } from "../cmps/hero"
import { SignupForm } from '../cmps/signup-form'
import { SignupModal } from '../cmps/signup-modal'

export function LoginPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)


    const showSignupModal = () => {
        setIsModalOpen(true)
    }


    return (
        <div className="login-page">
            <Hero />
            <div className="page-content base-layout main-layout">
                <header>
                    <img className="logo" src={logo} alt="סיטי מערכות - רישוי עם שירות" />
                </header>
                <main>

                    <SignupModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                    <section className='signup-text'>
                        <div className="signup-title">
                            <h1>צור חשבון</h1>
                            <p>לחברות או אדם פרטי</p>
                        </div>

                        <p className='warning'>*שים לב כל השדות הם חובה</p>
                    </section>
                    <SignupForm
                        showSignupModal={showSignupModal}
                    />

                    <p className="login">
                        <span>יש לך חשבון קיים? </span>
                        <span><a href="#">להתחברות</a></span>
                    </p>

                </main>
                <footer>footer</footer>

            </div>
        </div>
    )
}