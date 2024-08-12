import React, { useState, useEffect } from 'react';
import { Input, Form } from 'antd';
import validateId from './validateId'; // Ensure this function is correctly implemented

interface InputIdProps {
    label?: string;
    name: string;
    required?: boolean;
    setValue: (key: string, value: string) => void;
}

const InputId: React.FC<InputIdProps> = ({ name, required, setValue, label }) => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(true);

    // Validate ID only when form is submitted
    const validateInputValue = (value: string) => {
        setIsValid(validateId(value));
    };

    useEffect(() => {
        validateInputValue(inputValue);
    }, [inputValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.value;
        setInputValue(id);
        setValue(name, id);
    };

    return (
        <Form.Item
            name={name}
            validateStatus={!isValid && inputValue ? 'error' : undefined}
            help={!isValid && inputValue ? 'תעודת זהות לא חוקית' : undefined}
            rules={[{ required: required, message: `נא הכנס ${label}` }]}
            validateTrigger="onChange"
        >
            <span className='spanLabel'>{label}</span>
            <Input
                value={inputValue}
                onChange={handleChange}
                className='inputField'
                maxLength={9}
            />
        </Form.Item>
    );
};

export default InputId;
