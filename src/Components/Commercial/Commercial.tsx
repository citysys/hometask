import React from "react";
import './Commercial.scss';
import TextBox from "../TextBox/TextBox";

const Commercial:React.FC = () => {
    return(
        <div className="commercial">
            <TextBox text='רישוי עסקים מהמשרד ומכל מקום אפליקציית שטח למפקח'/>
            <div>
                <div className="ellipse"></div>
                <img src="/images/Imgs.svg" alt="mobiles-image" className="mobiles-image" />
            </div>
            <br />

        </div>
    )
}

export default Commercial;
    