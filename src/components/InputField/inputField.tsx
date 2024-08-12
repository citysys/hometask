import React from 'react';
import { Form } from 'antd';
import InputAddress from '../InputAddress/inputAddress';
import InputId from '../InputId/inputId';
import InputPassword from '../InputPassword/inputPassword';
import './inputField.scss';
import Input from 'antd/es/input/Input';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox';

interface InputFieldProps {
    type: string;
    value: string;
    setValue: (key: string, value: string) => void;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
    name: string;
    required: boolean;
    confirmName?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label = "תיאור", setValue, confirmName, ...props }) => {
    switch (props.type) {
        case 'checkbox':
            return (
                <Form.Item
                    name={props.name}
                    valuePropName="checked"
                    rules={[{ required: props.required, message: `נא אשר` }]}
                >
                    <label>
                        <Checkbox
                            className='inputCheckBox'
                            onChange={(e: CheckboxChangeEvent) => setValue(props.name, e.target.checked.toString())}
                        >
                            {label}
                        </Checkbox>
                    </label>
                </Form.Item>
            );
        case 'address':
            return (
                <InputAddress setValue={setValue} />
            );
        case 'id':
            return (
                <InputId
                    label={label}
                    name={props.name}
                    required={true}
                    setValue={setValue} 
                />
            );
        case 'password':
            return (
                <InputPassword
                    label={label}
                    name={props.name}
                    confirmName={confirmName}
                    required={true}
                    setValue={setValue} 
                />
            );
        default:
            return (
                <Form.Item
                    name={props.name}
                    rules={[{ required: props.required, message: `נא הכנס ${label}` }]}
                >
                    <label>
                        <span className='spanLabel'>{label}</span>
                        <Input
                            type={props.type}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(props.name, e.target.value)}
                            className="inputField input"
                        />
                    </label>
                </Form.Item>
            );
    }
};

export default InputField;
