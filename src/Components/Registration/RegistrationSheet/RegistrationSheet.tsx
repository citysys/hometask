import React from "react";
import './RegistrationSheet.scss';
import RegistrationHeader from "../RegistrationHeader/RegistrationHeader";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import RegistrationFooter from "../RegistrationFooter/RegistrationFooter";

const RegistrationSheet:React.FC=() =>{
    return(
        <div className="registration-sheet-container">
            <RegistrationHeader />
            <RegistrationForm />
            <RegistrationFooter />


        </div>
    )
}

export default RegistrationSheet;