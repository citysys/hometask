import React from "react";
import "./App.scss";

import Carousel from "./Carousel";
import FormComponent from "./FormComponent";

const App: React.FC = () => {
  return (
    <div className="App">
      <FormComponent />
      <Carousel />
    </div>
  );
};

export default App;
