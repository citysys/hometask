import React from "react";
import { Flex } from "antd";
import LoginForm from "../components/LoginForm/LoginForm";
import RightSideDisplay from "../components/RightSide/RightSideDisplay";

const MainPage: React.FC = () => {
  return (
    <Flex 
      gap="small" 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '10px' 
      }}
    >
      <div style={{ flexBasis: '50%', padding: '30px' }}>
        <LoginForm />
      </div>
      <div style={{ flexBasis: '50%', padding: '30px' }}>
        <RightSideDisplay />
      </div>
    </Flex>
  );
};

export default MainPage;
