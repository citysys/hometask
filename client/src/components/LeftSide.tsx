import React, { useState } from 'react';
import '../styles/LeftSide.scss';
import ctSystemsLogo from "../assets/ctSystemsLogo.png";
import googlePlay from "../assets/googlePlay.png";
import appleStore from "../assets/appleStore.png";
import googleIcon from "../assets/googleIcon.png";
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Row, Col, DatePicker, AutoComplete, Modal } from 'antd';
import { useCityStreetContext } from '../context/apiContext';


interface LeftSideProps { }


type FieldType = {
    fullName?: string;
    nationalId?: string;
    dateOfBirth?: Date;
    email?: string;
    city?: string;
    streetName?: string;
    houseNumber?: number;
    password?: string;
    confirmPassword?: string;
    remember?: boolean;
    tosAgree?: boolean;

};

function is_israeli_id_number(id: string): boolean {
    id = String(id).trim();
    if (id.length > 9 || isNaN(Number(id))) return false;
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
    return (
        Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }, 0) % 10 === 0
    );
}



const LeftSide: React.FC<LeftSideProps> = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { cityStreetData } = useCityStreetContext();
    const [form] = Form.useForm<FieldType>();
    const [streetOptions, setStreetOptions] = useState<string[]>([]);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        setIsModalOpen(true);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    }

    const handleCityChange = (value: string) => {
        if (cityStreetData[value as keyof typeof cityStreetData]) {
            setStreetOptions(cityStreetData[value as keyof typeof cityStreetData]);
            form.setFieldsValue({ streetName: undefined }); 
        } else {
            setStreetOptions([]);
            form.setFieldsValue({ streetName: undefined }); 
            return;
        }
        setStreetOptions(cityStreetData[value as keyof typeof cityStreetData]);
        form.setFieldsValue({ streetName: undefined }); 
    };

    return (
        <div className="left-side">
            <div className='inner-container'>
                <div className='logo-container'>
                    <img src={ctSystemsLogo} alt="logo" className='logo' />
                </div>
                <div className='title-container'>
                    <div className='title-main'>
                        <span>צור חשבון</span>
                    </div>
                    <div className='title-secondary'>
                        <span id='span-right'>לחברות או אדם פרטי</span>
                        <span id='span-left'>*שים לב כל השדות הם שדות חובה</span>
                    </div>
                </div>
                <div className='form-container'>
                    <Form
                        form={form}
                        name="basic"
                        layout='vertical'
                        colon={false}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Row gutter={16}>
                            <Col span={12} >
                                <Form.Item<FieldType>
                                    label="שם מלא"
                                    name="fullName"
                                    rules={[{ required: true, message: 'חובה להזין שם מלא!' }]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Form.Item<FieldType>
                                    label="תעודת זהות"
                                    name="nationalId"
                                    rules={[
                                        { required: true, message: 'חובה להזין תעודת זהות!' },
                                        {
                                            validator: (_, value) => {
                                                if (!value || is_israeli_id_number(value)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error('תעודת זהות אינה חוקית!')
                                                );
                                            },
                                        },
                                    ]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="תאריך לידה (MM/DD/YY)"
                                    name="dateOfBirth"
                                    rules={[{ required: true, message: 'חובה להזין תאריך לידה!' }]}
                                >
                                    <DatePicker size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="אימייל"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'חובה להזין אימייל!' },
                                        {
                                            type: 'email',
                                            message: 'אימייל אינו חוקי!',
                                        },
                                    ]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="עיר"
                                    name="city"
                                    rules={[{ required: true, message: 'חובה להזין עיר!' }]}
                                >
                                    <AutoComplete
                                        options={Object.keys(cityStreetData).map(city => ({ value: city }))}
                                        onChange={handleCityChange}
                                        filterOption={(inputValue, option) =>
                                            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    >
                                        <Input size='large' />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item<FieldType>
                                    label="רחוב"
                                    name="streetName"
                                    rules={[{ required: true, message: 'חובה להזין רחוב!' }]}
                                >
                                    <AutoComplete
                                        options={streetOptions.map(street => ({ value: street }))}
                                        disabled={streetOptions.length === 0}
                                        filterOption={(inputValue, option) =>
                                            option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                        }
                                    >
                                        <Input size='large' />
                                    </AutoComplete>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item<FieldType>
                                    label="מספר בית"
                                    name="houseNumber"
                                    rules={[{ required: true, message: 'חובה להזין מספר!' }]}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="סיסמא"
                                    name="password"
                                    rules={[{ required: true, message: 'חובה להזין סיסמא!' }]}
                                >
                                    <Input.Password size='large' />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="אימות סיסמא"
                                    name="confirmPassword"
                                    rules={[
                                        { required: true, message: 'חובה לאשר את הסיסמא!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error('הסיסמאות אינן תואמות!')
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>זכור אותי</Checkbox>
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="tosAgree"
                            valuePropName="checked"
                        >
                            <Checkbox>קראתי ואני מאשר את תנאי השימוש</Checkbox>
                        </Form.Item>
                        <Row gutter={16} className='submit-row'>
                            <Col span={12}>
                                <Form.Item>
                                    <Button type='default' style={{ width: '100%' }} size='large' className='connect-with-google'>
                                        <img src={googleIcon} alt="google-icon" style={{width: "20px"}} />
                                        להתחברות עם חשבון גוגל
                                    </Button>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} size='large'>
                                        צור חשבון
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className='already-have-account-container'>
                    <span>יש לך חשבון קיים? <Button type='link'>להתחברות</Button></span>
                </div>
                <div className='app-stores-container'>
                    <div className='google-store-container'>
                        <img src={appleStore} alt="apple-store" className='apple-store-image' />
                    </div>
                    <div className='apple-store-container'>
                        <img src={googlePlay} alt="google-store" className='google-store-image' />
                    </div>
                </div>
            </div>
            <Modal
                title="הצלחה"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleOk}
            >
                <p>החשבון נוצר בהצלחה!</p>
            </Modal>
        </div>
    );
};


export default LeftSide;
