import React from "react";
import './RegistrationFooter.scss';
import GoogleBadge from '/images/google_play_icon.svg';
import AppStoreBadge from '/images/app_store_icon.svg';

const RegistrationFooter: React.FC = () => {
    return (
        <div className="registration-footer">
            <div className="log-in-hyperlink">
                יש לך חשבון קיים? <a href="#" className="login-link">להתחברות</a>
            </div>
            <div className='download-from-store'>
                <img src={GoogleBadge} alt='google-badge'></img>
                <img src={AppStoreBadge} alt='app-store-badge'></img>
            </div>
        </div>
    );
}

export default RegistrationFooter;
