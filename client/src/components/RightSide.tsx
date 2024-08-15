import React from 'react';
import '../styles/RightSide.scss';
import phonePicture from "../assets/phonePicture.png";

interface RightSideProps { }

const RightSide: React.FC<RightSideProps> = () => {
    return (
        <div className="right-side">
            <div className="right-side-heading">
                <span>רישוי עסקים מהמשרד ומכל מקום</span>
                <span>אפליקציית שטח למפקח</span>
            </div>
            <div className="elipse"></div>
            <div className="phone-pictures">
                <img src={phonePicture} alt="Phone" className="left" />
                <img src={phonePicture} alt="Phone" className="main" />
                <img src={phonePicture} alt="Phone" className="right" />
            </div>
        </div>
    );
};

export default RightSide;
