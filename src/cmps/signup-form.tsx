
import { Button, Checkbox, Form, Input, DatePicker, Select } from 'antd'
import type { FormProps } from 'antd'
import { RuleObject } from 'rc-field-form/lib/interface'
import { StoreValue } from 'rc-field-form/lib/interface'
import googleImg from '../assets/img/google-img.png'

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

export function SignupForm({ showSignupModal }: { showSignupModal: () => void }) {

    const [form] = Form.useForm()

    const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
        showSignupModal()
    }

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: Parameters<FormProps<FieldType>['onFinishFailed']>[0]) => {
        console.log('Failed:', errorInfo)
    }

    const validateIdNumber = async (_: RuleObject, value: StoreValue): Promise<void> => {
        const id = value.toString()
        const isValid = Array.from(id, Number)
            .reduce((counter, digit, i) => {
                const step = digit * ((i % 2) + 1)
                return counter + (step > 9 ? step - 9 : step)
            }, 0) % 10 === 0
        if (!isValid) {
            return Promise.reject(new Error('ID number is not valid.'))
        }
        return Promise.resolve()
    }

    const validateConfirmPassword = async (_: RuleObject, value: StoreValue): Promise<void> => {
        const password = form.getFieldsValue(true)['password']
        // console.log('password: ', password) //undefined
        if (value !== password) {
            return Promise.reject(new Error('The passwords do not match.'))
        }
        return Promise.resolve()
    }

    const dateFormat: string = 'MM/DD/YY'


    return (
        <div className="signup-form">
            <Form
                name="signup-form"
                form={form}
                layout="vertical"
                labelCol={{ span: 16 }}
                labelWrap="false"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark="optional"
                validateTrigger="onSubmit"

            >

                <section className="text-fields">

                    <Form.Item<FieldType>
                        label="שם מלא"
                        name="fullName"
                        validateTrigger="onInput"
                        rules={[
                            { required: true, message: 'נא להזין שם מלא' },
                            { max: 15, message: 'עברת את מגבלת התוים' },
                            { whitespace: true, message: 'נא להזין שם מלא' }
                        ]}

                    >
                        <Input
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="תעודת זהות"
                        name="idNumber"
                        validateTrigger="onBlur"
                        rules={[
                            { required: true, message: 'נא להזין תעודת זהות כולל ספרת ביקורת' },
                            { len: 9, message: 'נא להזין תעודת זהות באורך 9 ספרות' },
                            { whitespace: true, message: 'נא להזין תעודת זהות כולל ספרת ביקורת' },
                            { validator: validateIdNumber, message: 'מספר תעודת זהות לא תקין' }
                        ]}

                    >
                        <Input
                            style={{ width: '100%' }}
                        />
                    </Form.Item>


                    <Form.Item<FieldType>
                        label="תאריך לידה (MM/DD/YY)"
                        name="birthDate"
                        rules={[{ required: true, message: 'נא להזין תאריך לידה' }]}
                    >
                        <DatePicker
                            format={dateFormat}
                            placement="topRight"
                            placeholder=""
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="אימייל"
                        name="email"
                        validateTrigger="onInput"
                        rules={[
                            { required: true, message: 'נא להזין כתובת אימייל' },
                            { whitespace: true, message: 'נא להזין כתובת אימייל' },
                            { type: 'email', message: '  נא להזין כתובת אימייל' },

                        ]}

                    >
                        <Input
                            style={{ width: '100%' }}
                        />
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
                        <div className="street">


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
                        </div>

                        <div className="house-number">


                            <Form.Item<FieldType>
                                label="מספר בית"
                                name="houseNumber"
                                rules={[{ required: true, message: 'נא להזין מספר בית' }]}
                            >
                                <Input />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item<FieldType>
                        label="סיסמא"
                        name="password"
                        rules={[
                            { required: true, message: 'נא להזין סיסמא' },
                            { min: 5, message: 'הסיסמא חייבת להכיל 5 תוים ומעלה' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="אימות סיסמא"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'נא לאמת סיסמא' },
                            { validator: validateConfirmPassword, message: 'הסיסמאות אינן זהות' }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </section>

                <section className="checkbox-fields">

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>זכור אותי</Checkbox>
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="approveConditions"
                        valuePropName="checked"
                        rules={[
                            { required: true, message: 'נא לאשר את תנאי השימוש' },
                           
                        ]}
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
                    <div className="create-account-btn">

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                צור חשבון
                            </Button>
                        </Form.Item>
                    </div>

                    <div className="google-signup-btn">
                        <Button type="secondary" block>
                            <img src={googleImg} alt="" />
                            להתחברות עם חשבון גוגל
                        </Button>
                    </div>
                </section>

            </Form>
        </div>
    )
}