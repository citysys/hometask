import React from "react";
import './RegistrationHeader.scss';
import TextBox from "../../TextBox/TextBox";

const RegistrationHeader:React.FC=() =>{
    return(
        <div className="registration-header-container">
            <div className="logo-image"><img src="/images/city-sys-logo.svg" alt="logo-image" /></div>
            <div className="header-text">
                <TextBox text='צור חשבון'/>
            </div>
            
        </div>
    )
}

export default RegistrationHeader;