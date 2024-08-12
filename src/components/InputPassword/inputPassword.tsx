import React from 'react';
import { Form, Input } from 'antd';

interface InputPasswordProps {
    name: string;
    confirmName?: string;
    required?: boolean;
    label?: string;
    setValue: (key: string, value: string) => void;
}

const InputPassword: React.FC<InputPasswordProps> = ({ name, confirmName, required = true, label = "סיסמא", setValue }) => {
    return (
        <>
            <Form.Item
                name={name}
                rules={[
                    {
                        required: required,
                        message: `נא הכנס ${label}`
                    },
                    {
                        min: 6,
                        message: '6 תווים ומעלה'
                    }
                ]}
                hasFeedback
            >
                <label>
                    <span className='spanLabel'>{label}</span>
                    <Input.Password
                        className='inputField'
                        onChange={(e) => setValue(name, e.target.value)}
                    />
                </label>
            </Form.Item>

            {confirmName && (
                <Form.Item
                    name={confirmName}
                    dependencies={[name]}
                    rules={[
                        {
                            required: required,
                            message: `נא אמת ${label}`
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue(name) === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('סיסמאות אינן תואמות'));
                            },
                        }),
                    ]}
                    hasFeedback
                >
                    <label>
                        <span className='spanLabel'>{`אמת ${label}`}</span>
                        <Input.Password
                            className='inputField'
                            onChange={(e) => setValue(confirmName, e.target.value)}
                        />
                    </label>
                </Form.Item>
            )}
        </>
    );
};

export default InputPassword;
