import { FC } from 'react';

import "../styles/WelcomeScreen.scss";

const WelcomeScreen: FC = () => {
    return (
        <div className="welcome-screen-container">
            <h2>
                רישוי עסקים מהמשרד ומכל מקום אפליקציית שטח למפקח
            </h2>
            <div className="circle"></div>
            <div className="phones-container">
                <img src="/phone.svg" className="left" />
                <img src="/phone.svg" className="center" />
                <img src="/phone.svg" className="right" />
            </div>
        </div>
    );
}

export default WelcomeScreen;
