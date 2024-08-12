
import { Button, Checkbox, Form, Input } from "antd"
import type { FormProps } from 'antd'

type FieldType = {
    fullName?: string;
    birthDate?: Date;
    city?: string;
    password?: string;
    idNumber?: string;
    email?: string;
    street?: string;
    houseNumber?: string;
    confirmPassword?: string;
    remember?: boolean;
    approveConditions?: boolean;
}

export function SignupForm() {
    
    
    const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
        console.log('Success:', values)
    }
    
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: Parameters<FormProps<FieldType>['onFinishFailed']>[0]) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <div className="signup-form">
            <Form
                name="basic"
                layout="vertical"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="שם מלא"
                    name="fullName"
                    rules={[{ required: true, message: 'נא להזין שם מלא' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="סיסמא"
                    name="password"
                    rules={[{ required: true, message:  'נא להזין סיסמא'}]}
                >
                    <Input.Password />
                </Form.Item>
            
                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 0, span: 16 }}
                >
                    <Checkbox>זכור אותי</Checkbox>
                </Form.Item>
         
                <Form.Item<FieldType>
                    name="approveConditions"
                    valuePropName="checked"
                    wrapperCol={{ offset: 0, span: 16 }}
                >
                    <Checkbox>
                        <p>
                            <span>קראתי ואני מאשר את </span>
                            <span><a href="#">תנאי השימוש</a></span>
                        </p>
                    </Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}