import { NavLink } from 'react-router-dom';
import InputField from '../InputField/inputField';
import { Button, Form, notification } from 'antd';
import formFields from "./formFields.json";
import { useState } from 'react';

interface FormState {
    [key: string]: string;
}

function LoginSection() {
    const [form, setForm] = useState<FormState>({});

    const inputChangeHandler = (key: string, value: string) => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [key]: value };
            return updatedForm;
        });
    };

    const onFinish = (values: any) => {
        console.log('Form values:', values);

        notification.success({
            message: 'Success',
            description: 'נרשמת בהצלחה',
            placement: 'topRight',
        });
    };

    return (
        <div className='loginSection'>
            <div className='logoCity'></div>
            <h2>כניסה לחשבון</h2>
            <h4>לחברות או אדם פרטי</h4>
            <div className='formContainer'>
                <Form onFinish={onFinish}>
                    {formFields.map((field, index) => (
                        <InputField
                            value={form[field.name] || ''}
                            key={"input-signIn-" + index}
                            {...field}
                            setValue={inputChangeHandler}
                        />
                    ))}
                    <Button className='connectWithGoogle' type="default">
                        להתחברות עם חשבון גוגל
                    </Button>
                    <Form.Item>
                        <Button className='btnSubmit' type="primary" htmlType="submit">
                            התחבר לחשבון
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <p className='loginText'>אין לך חשבון? <NavLink to="/">להרשמה</NavLink></p>
        </div>
    );
}

export default LoginSection;
