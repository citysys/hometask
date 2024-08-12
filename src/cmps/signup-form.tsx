
import { Button, Checkbox, Form, Input, DatePicker, Select } from "antd"
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

    const dateFormat: string = 'MM/DD/YY'

    return (
        <div className="signup-form">
            <Form
                name="basic"
                layout="vertical"
                labelCol={{ span: 16 }}
                wrapperCol={{ span:20 }}
                style={{ maxWidth: 800 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <section className="text-fields">

                    <Form.Item<FieldType>
                        label="שם מלא"
                        name="fullName"
                        rules={[{ required: true, message: 'נא להזין שם מלא' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="תאריך לידה (MM/DD/YY)"
                        name="birthDate"
                        rules={[{ required: true, message: 'נא להזין תאריך לידה' }]}
                    >
                        <DatePicker format={dateFormat} placement="topRight" placeholder="" />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="עיר"
                        name="city"
                        rules={[{ required: true, message: 'נא להזין עיר' }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            options={[
                                //temp
                                {
                                    value: 'חיפה',
                                    label: 'חיפה',
                                },

                                {
                                    value: 'תל אביב',
                                    label: 'תל אביב',
                                },
                                {
                                    value: 'נתניה',
                                    label: 'נתניה',
                                },

                            ]}
                        />
                    </Form.Item>

                    <div className="street-fields">
                        <Form.Item<FieldType>
                            label="רחוב"
                            name="street"
                            rules={[{ required: true, message: 'נא להזין רחוב' }]}
                        >
                            <Select
                                showSearch
                                optionFilterProp="label"
                                options={[
                                    //temp
                                    {
                                        value: 'העצמאות',
                                        label: 'העצמאות'
                                    },


                                ]}
                            />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="מספר בית"
                            name="houseNumber"
                            rules={[{ required: true, message: 'נא להזין מספר בית' }]}
                        >
                            <Input />
                        </Form.Item>

                    </div>


                    <Form.Item<FieldType>
                        label="סיסמא"
                        name="password"
                        rules={[{ required: true, message: 'נא להזין סיסמא' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                   
                    <Form.Item<FieldType>
                        label="אימות סיסמא"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'נא לאמת סיסמא' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </section>

                <section className="checkbox-fields">

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

                </section>

                <section className="submit-btns">
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </section>

            </Form>
        </div>
    )
}