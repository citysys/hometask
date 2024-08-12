import InputField from '../InputField/inputField';
import './signInSection.scss';
import { Form, Button, notification } from 'antd';
import formFields from './formFields.json';
import { NavLink } from 'react-router-dom';


function SignInSection() {
    const [form] = Form.useForm();

    const inputChangeHandler = (key: string, value: string) => {
        form.setFieldsValue({ [key]: value });
    };

    const onFinish = (values: any) => {
        console.log('Form values:', values);

        notification.success({
            message: 'נהדר XXX',
            description: 'הרשמה הושלמה בהצלחה',
            placement: 'bottomLeft',
        });
    };


    return (
        <div className='signInSection'>
            <div className='logoCity'></div>
            <h2>צור חשבון</h2>
            <h4>לחברות או אדם פרטי</h4>
            <div className="formContainer">
                <Form form={form} onFinish={onFinish}>
                    {formFields.map((field, index) => (
                        <InputField
                            value={form.getFieldValue(field.name) || ''}
                            key={"input-signIn-" + index}
                            {...field}
                            setValue={inputChangeHandler}
                        />
                    ))}
                    <Button className='connectWithGoogle' type="default">
                        התחברות עם חשבון גוגל
                    </Button>
                    <Form.Item>
                        <Button className='btnSubmit' type="primary" htmlType="submit">
                            צור חשבון
                        </Button>
                    </Form.Item>
                    <p className='loginText'>יש לך חשבון? <NavLink to="/login">להתחברות</NavLink></p>
                </Form>
            </div>
        </div>
    );
}

export default SignInSection;
