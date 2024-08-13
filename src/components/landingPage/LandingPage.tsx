// import React from 'react';
// import './LandingPage.scss';
// import Imgs from "../../assets/Imgs.png"

// const LandingPage: React.FC = () => {
//   return (
//     <div className="landing-container">
//       <h1 className="landing-header">
        // רישוי עסקים מהמשרד ומכל מקום אפליקציית שטח למפקח
//       </h1>
//       <div className="bg-blue">
//       <img
//           src={Imgs}
//           alt="phone-image"
//         />
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import './LandingPage.scss';
import Imgs from "../../assets/Imgs.png";


const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-header">רישוי עסקים מהמשרד ומכל מקום אפליקציית שטח למפקח</h1>
      <div className="bg-blue">
        <img
          src={Imgs}
          alt="Phone application preview"
          className="phone-image"
        />
      </div>
    </div>
  );
};

export default LandingPage;