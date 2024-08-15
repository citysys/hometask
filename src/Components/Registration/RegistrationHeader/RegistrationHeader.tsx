import React from 'react';
import './RegistrationHeader.scss';
import { Typography } from 'antd';

const { Text } = Typography;

const RegistrationHeader: React.FC = () => {
    return (
        <div className="registration-header-container">
            <div className="logo-image">
                <img src="/images/city-sys-logo.svg" alt="logo-image" />
            </div>
            <div className="header-content-container">
                <div className="header-text-container">
                    <Text className="header-title">צור חשבון</Text>
                    <Text className="header-subtitle">לחברות או אדם פרטי</Text>
                </div>
                <div id="all-fields-alert">
                    <Text>* שים לב כל השדות הם שדות חובה</Text>
                </div>
            </div>
        </div>
    );
}

export default RegistrationHeader;
