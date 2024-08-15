import React from "react";
import { Typography } from 'antd';

const { Text } = Typography;

interface TextBoxProps {
    text: string;
  }

const TextBox:React.FC<TextBoxProps>=({text})=>{
    return (
        <div>
            <Text>{text}</Text>
            <br />
        </div>
    )
}

export default TextBox;