import './accessPage.scss';
import 'antd/dist/reset.css';
import { useParams } from 'react-router-dom';
import AdsSection from '../../components/AdsSection/adsSection';
import SignInSection from '../../components/SignInSection/signInSection';
import LoginSection from '../../components/LoginSection/loginSection';

function AccessPage() {
    const { type = "" } = useParams();
    
    const sectionClass = type === "login" ? "mainLoginDisplay" : "mainSignInDisplay";
    return (
        <div className="access-page">
            <AdsSection type={type} />
            <main className={`${sectionClass}`}>
                <LoginSection />
                <SignInSection />
            </main>
        </div>
    );
}

export default AccessPage;
