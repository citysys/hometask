import { FC } from 'react';

import WelcomeScreen from './WelcomeScreen';
import RegistrationForm from './RegistrationForm';
import TopForm from './TopForm';

const HomePage: FC = () => {

    return (
        <div className="container">
            <WelcomeScreen />
            <div className="full-form-container">
                <TopForm />
                <RegistrationForm />
            </div>
        </div>
    );
}

export default HomePage;
