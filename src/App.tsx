import React from "react";
import "./App.scss";

import Carousel from "./components/Carousel";
import FormComponent from "./components/FormComponent";


const App: React.FC = () => {
  return (
    <div className="App">
     
     
      <FormComponent/>
      <Carousel />
    </div>
  );
};

export default App;
