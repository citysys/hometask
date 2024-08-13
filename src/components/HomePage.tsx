import { FC } from 'react';
import RegistrationForm from './RegistrationForm';
import WelcomeScreen from './WelcomeScreen';

const HomePage: FC = () => {
    
    return (
        <div className="container">
            <WelcomeScreen />
            <RegistrationForm />
        </div>
    );
}

export default HomePage;
