import React from 'react';
import './App.scss';
import LandingPage from './components/landingPage/LandingPage';
import FormComponent from './components/FormComponent/FormComponent';

const App: React.FC = () => {
  return (
      <div className="main-content">
        <LandingPage />
        <FormComponent />
    </div>
  );
};

export default App;