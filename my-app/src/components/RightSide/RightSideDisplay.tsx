import React from "react";
import phoneImg from "../../assets/images/phoneImg.png";

import "./styles.scss";

const RightSideDisplay: React.FC = () => {
  return (
    <div className="right-content">
      <h4>
        רישוי עסקים מהמשרד ומכל מקום
        <br />
        אפליקציית שטח למפקד
      </h4>
      <div className="images-wrapper">
        <div className="circle"></div>
        <div className="images">
          <img className="right-image" src={phoneImg} alt="phone-image" />
          <img className="center-image" src={phoneImg} alt="phone-image" />
          <img className="left-image" src={phoneImg} alt="phone-image" />
        </div>
      </div>
    </div>
  );
};

export default RightSideDisplay;
